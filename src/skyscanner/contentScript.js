Sentry.init({
  dsn: "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451",
});

import { standardizeTimeString } from "../shared/helpers.js";
import AirlineMap from "../shared/nameMaps/airlineMap.js";

let formData;
let rafID = 0;
let isHighlightingItin = false; // to prevent opening modals when trying to highlight a selected itin
const ITIN_NODE_SELECTOR = "[class*='FlightsTicket_container'] [role='button']";
let totalNonStop = 0;

chrome.runtime.onMessage.addListener(async function (message) {
  // parse page to get flights, then send background to process and display on new web page.
  console.info("Received message", message.event);
  switch (message.event) {
    case "BEGIN_PARSING":
      formData = message.formData;
      if (document.body.textContent.includes("Page not found")) {
        chrome.runtime.sendMessage({
          event: "NO_FLIGHTS_FOUND",
          provider: "skyscanner",
        });
        return;
      }
      loadResults();
      break;
    case "HIGHLIGHT_FLIGHT":
      const { selectedDepartureId, selectedReturnId } = message;
      // isHighlightingItin is used to prevent MutationObserver and RAF callbacks from continuing their tasks (parsing results)
      isHighlightingItin = true;
      closeModal();
      closePopups();
      window.cancelAnimationFrame(rafID);
      window.scroll(0, 0);
      // setTimeout to allow time for observers to disconnect
      let tries = 10;
      setTimeout(() => {
        const intId = setInterval(async () => {
          try {
            closeModal();
            setItinIds();
            highlightItin(selectedDepartureId, selectedReturnId);
            clearInterval(intId);
            addBackToSearchButton();
          } catch (error) {
            if (tries < 1) {
              Sentry.captureException(error, {
                tags: { component: "highlightSkyscannerItin" },
                extra: formData,
              });
              clearInterval(intId);
              return;
            }
            // keep going
            await showMoreResults();
            tries--;
          }
        }, 500);
      }, 500);
      break;
    default:
      break;
  }
});

/**
 * This is if Skyscanner shows the non-stop calendar view to help
 * you pick dates which will return non-stop flights.
 */
function clickThroughCalendarNonStopView() {
  const buttons = [...document.querySelectorAll("button")];
  const dateButtons = [...document.querySelectorAll('[role="button"]')];

  for (const da of [formData.fromDate, formData.toDate]) {
    let d = new Date(`${da}T00:00:00`).toDateString().split(" ");
    let ds = d[0] + d[2] + d[1];
    console.log(ds);
    dateButtons.find((b) => b.textContent.includes(ds)).click();
  }
  buttons.find((b) => b.textContent === "Continue").click();
  chrome.runtime.sendMessage({ event: "SEND_BEGIN_EVENT", provider: "skyscanner" });
}

function loadResults() {
  let mutationTimeoutId;

  const observer = new MutationObserver(function (mutationlist, observer) {
    // should observe results container after added to DOM
    // and disconnect this observer
    mutationTimeoutId = setTimeout(() => {
      clearTimeout(mutationTimeoutId);
      parseResults();
    }, 3000);
    observer.disconnect();
    return;
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function closePopups() {
  let closeButton = document.querySelector("#close");
  // sometimes a campaign modal shows, close it so we can highlight
  if (closeButton) {
    closeButton.click();
  }
  closeButton = document.querySelector("[title='Close']");
  if (closeButton) {
    closeButton.click();
  }
}

function addBackToSearchButton() {
  if (document.querySelector("#back-to-search")) {
    return;
  }
  const button = document.createElement("button");
  button.id = "back-to-search";
  button.textContent = "Return to FlightPenguin";
  button.title = "Click to return to FlightPenguin and keep browsing.";
  button.addEventListener("click", handleBackToSearchButtonClick);
  document.body.append(button);
}

function handleBackToSearchButtonClick() {
  isHighlightingItin = false;

  chrome.runtime.sendMessage({
    event: "FOCUS_WEBPAGE",
  });
}

function highlightItin(selectedDepartureId, selectedReturnId) {
  // reset prior selection
  const previousSelection = document.querySelector(`${ITIN_NODE_SELECTOR}[data-selected='true']`);
  if (previousSelection) {
    previousSelection.dataset.selected = "false";
    previousSelection.style.border = "";
  }
  let idToSearchFor = selectedDepartureId;
  if (selectedReturnId) {
    idToSearchFor += `-${selectedReturnId}`;
  }
  const itinNode = document.querySelector(`[data-id="${idToSearchFor}"]`);
  itinNode.style.border = "10px solid #f2554b";
  itinNode.style.borderRadius = "6px";
  itinNode.style.paddingTop = "25px";
  itinNode.style.paddingBottom = "25px";
  itinNode.dataset.selected = "true";
  const yPosition = window.pageYOffset + itinNode.getBoundingClientRect().top - window.innerHeight / 2;
  window.scroll(0, yPosition);
}

async function showMoreResults() {
  if (isHighlightingItin) {
    return;
  }
  const resultsContainer = document.querySelector("[class^='FlightsDayView_results__']");

  if (!resultsContainer) {
    closeModal();
    await pause();
    return;
  }
  if (isHighlightingItin) {
    return;
  }
  const seeMoreFlightsButton = [...resultsContainer.querySelectorAll("button")].find(
    (element) => element.textContent === "Show more results",
  );
  if (seeMoreFlightsButton) {
    seeMoreFlightsButton.click();
    await pause();
  }
  if (isHighlightingItin) {
    return;
  }
  // we do not want to scroll directly to the bottom of the page
  // the results load when scroll position is within the viewport
  window.scroll(0, window.pageYOffset + 500);
}

function pause() {
  return new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
}
/**
 * Skyscanner has a button that you need to click to see more results, then
 * the rest of the results are loaded as you scroll.
 * So to get more results we need to scroll down the page.
 */
async function parseResults() {
  if (!document.querySelector(ITIN_NODE_SELECTOR)) {
    clickThroughCalendarNonStopView();
    return;
  }
  if (isHighlightingItin) {
    return;
  }

  let lastTime = 0;
  let rafID;

  window.addEventListener("scroll", function handleScroll() {
    if (isHighlightingItin) {
      window.cancelAnimationFrame(rafID);
      window.removeEventListener("scroll", handleScroll);
      return;
    }
    let moreItins = [...document.querySelectorAll(ITIN_NODE_SELECTOR + ':not([data-visited="true"])')];
    if (moreItins.length > 0) {
      totalNonStop += moreItins.length;
      const flights = parser(moreItins);
      // nonstop flights
      if (flights.length > 0) {
        chrome.runtime.sendMessage({
          event: "FLIGHT_RESULTS_RECEIVED",
          flights,
          provider: "skyscanner",
        });
      }
    }

    if (isAtBottomOfPage()) {
      window.cancelAnimationFrame(rafID);
      window.removeEventListener("scroll", handleScroll);

      if (!totalNonStop && itinIdQueue.length === 0) {
        chrome.runtime.sendMessage({ event: "NO_FLIGHTS_FOUND", provider: "skyscanner" });
        return;
      }

      if (isHighlightingItin) {
        return;
      }
      // finally parse flights with stops
      if (itinIdQueue.length > 0) {
        window.addEventListener("scroll", function parseItinWithStops() {
          if (window.pageYOffset === 0) {
            openItinWithLayoversModal();
            window.removeEventListener("scroll", parseItinWithStops);
          }
        });
        window.scroll(0, 0);
      }
    }
  });

  rafID = window.requestAnimationFrame(showMoreFlights);

  async function showMoreFlights(now) {
    const shouldScroll = now - lastTime >= 1000;

    if (!lastTime || shouldScroll) {
      await showMoreResults();
      lastTime = now;
    }

    rafID = window.requestAnimationFrame(showMoreFlights);
  }
}

function isAtBottomOfPage() {
  return window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
}

function setItinIds(notSeenSelector = "") {
  let moreItins = [...document.querySelectorAll(ITIN_NODE_SELECTOR + notSeenSelector)];

  for (const itin of moreItins) {
    const legNodes = [...itin.querySelectorAll("[class^='LegDetails_container']")];
    setIdDataset(itin, legNodes);
    itin.dataset.visited = "true";
  }
  if (moreItins.length === 0) {
    console.log("did not set itin ids");
  }
}

const SELECTORS = {
  fromTime: "[class^='LegInfo_routePartialDepart'] *:first-child",
  toTime: "[class^='LegInfo_routePartialArrive'] *:first-child",
  duration: "[class^='LegInfo_stopsContainer'] *:first-child",
  layovers: "[class^='LegInfo_stopsLabelContainer'] *:first-child",
  marketingAirline: "[class^='LogoImage_container']",
  operatingAirline: "[class*='Operators_operator']",
  from: "[class*='LegInfo_routePartialDepart'] *:nth-child(2)",
  to: "[class*='LegInfo_routePartialArrive'] *:nth-child(2)",
};
const layoverFromToSelectors = {
  from: "[class*='Routes_routes'] *:first-child",
  to: "[class*='Routes_routes'] *:nth-child(2)",
};
const fareSelector = {
  detailView: "[class^='TotalPrice_totalPriceContainer']",
  resultsView: "[class^='Price_mainPriceContainer']",
  fareBackup: "[class*='CardPrice_totalPrice']", // when there are upgrades
};
function parser(itinNodes = []) {
  let itins = itinNodes.map((itinNode) => {
    itinNode.dataset.visited = true;
    if (itinNode.textContent.includes("Sponsored")) {
      return null;
    }
    let fare;
    try {
      fare = itinNode.querySelector(fareSelector.resultsView).textContent.trim();
    } catch {
      // one of those itins that say for example "See Southwest for prices"
      return null;
    }
    const hasLayovers = /\d stop/.test(itinNode.textContent);
    const legNodes = [...itinNode.querySelectorAll("[class^='LegDetails_container']")];
    const id = setIdDataset(itinNode, legNodes);
    // check if price is lower than what was previously seen
    if (seenItinIds[id] && seenItinIds[id] === fare) {
      return null;
    }
    seenItinIds[id] = fare;

    if (hasLayovers) {
      itinIdQueue.push(id);
      return null;
    }

    const [departureFlight, returnFlight] = parseLegs(legNodes);
    if (!departureFlight) {
      return null;
    }

    return {
      departureFlight,
      returnFlight,
      fare: fare.replace("$", ""),
      currency: "$", // no currency node
    };
  });

  itins = itins.filter((itin) => itin);

  return itins;
}

function getLayovers(legNode) {
  const layoversNode = legNode.querySelector("[class^='LegSegmentSummary_container']");
  const airlines = [...layoversNode.querySelectorAll("[class^='AirlineLogoTitle_container']")];
  const segments = [...layoversNode.querySelectorAll("[class^='LegSegmentDetails_container']")];
  const layovers = [];
  for (const [index, segment] of segments.entries()) {
    let [fromTime, duration, toTime] = segment.querySelector("[class^='Times_segmentTimes']").children;
    fromTime = standardizeTimeString(fromTime.textContent);
    toTime = standardizeTimeString(toTime.textContent);

    const locations = {};
    for (let [key, selector] of Object.entries(layoverFromToSelectors)) {
      const locationNode = segment.querySelector(selector);
      locations[key] = locationNode.textContent.split(/\s/)[0];
    }
    const marketingAirline = airlines[index].querySelector("[class^='LogoImage_container']");
    const operatingAirline = airlines[index].querySelector("[class*='OperatedBy']");

    layovers.push({
      fromTime,
      duration: duration.textContent,
      toTime,
      operatingAirline: operatingAirline.textContent.toLowerCase().includes("operated")
        ? operatingAirline.textContent
        : marketingAirline.textContent,
      ...locations,
    });
  }
  return layovers;
}

function closeModal() {
  const button = document.querySelector("[class*='DetailsPanelHeader_navigationBar'] button[label='back']");
  if (button) {
    button.click();
  }
}

function parseItin(containerNode) {
  const legNodes = [...containerNode.querySelectorAll("[class^='Itinerary_leg']")];
  const [departureFlight, returnFlight] = parseLegs(legNodes);

  let fareNode = containerNode.querySelector(fareSelector.detailView);
  if (!fareNode) {
    fareNode = containerNode.querySelector(fareSelector.fareBackup);
  }
  let fare;
  try {
    fare = fareNode.textContent.trim().split("$")[1];
  } catch {
    // still loading
    return;
  }

  return {
    departureFlight,
    returnFlight,
    fare,
    currency: "$",
  };
}

const MODAL_VIEW_SELECTOR = "[class*='FlightsBookingPanel_content']";
async function openItinWithLayoversModal() {
  // Flow:
  // make sure to scroll top before first itin id in queue
  // then scroll every second (passive?), query for id
  // if reached bottom, scroll top
  // else if found itin, break out of scroll, try to scrape detail pane
  // after modal closes, set itin ids
  // pop off next itin id
  if (itinIdQueue.length === 0 || isHighlightingItin) {
    closeModal();
    return;
  }
  window.scroll(0, 0);
  const itinId = itinIdQueue.shift();
  window.addEventListener("scroll", async function handleScroll() {
    if (isHighlightingItin) {
      window.removeEventListener("scroll", handleScroll);
      return;
    }
    // if at bottom or found itin
    // remove scroll listener
    const foundItinNode = await findItinById(itinId);
    if (foundItinNode) {
      scrapeItinDetailPane(foundItinNode);
      window.removeEventListener("scroll", handleScroll);
    } else if (isAtBottomOfPage()) {
      openItinWithLayoversModal();
      window.removeEventListener("scroll", handleScroll);
    }
  });

  findItinById(itinId);
}

function scrapeItinDetailPane(foundItinNode) {
  foundItinNode.click();
  let intId = setInterval(async () => {
    const modalContainerNode = document.querySelector(MODAL_VIEW_SELECTOR);
    if (!modalContainerNode) {
      return;
    }
    const itin = parseItin(modalContainerNode);
    if (!itin) {
      // modal may still be loading
      // create new observer on MODAL_VIEW_SELECTOR target for loading modal?
      // if parser errors this is an infinite loop so need retry limit
      return;
    }
    chrome.runtime.sendMessage({
      event: "FLIGHT_RESULTS_RECEIVED",
      flights: [itin],
      provider: "skyscanner",
    });

    clearInterval(intId);
    closeModal();
    await pause();
    setItinIds();
    openItinWithLayoversModal();
  }, 2000);
}

async function findItinById(itinNodeId) {
  await showMoreResults();
  // pass param to only query for not visited
  setItinIds(':not([data-visited="true"])');
  return document.querySelector(`[data-id='${itinNodeId}']`);
}

function setIdDataset(itinNode, legNodes) {
  let dataForId = [];
  for (let legNode of legNodes) {
    const [fromTime, toTime] = legNode.querySelectorAll("[class*='LegInfo_routePartialTime']");
    const marketingAirlinesNode = legNode.querySelector(SELECTORS.marketingAirline);
    const logo = legNode.querySelectorAll("img")[0];
    let marketingAirline = "";
    marketingAirline = logo ? logo.alt : marketingAirlinesNode.textContent;
    marketingAirline = AirlineMap.getAirlineName(marketingAirline);
    dataForId.push(
      standardizeTimeString(fromTime.textContent),
      standardizeTimeString(toTime.textContent),
      marketingAirline.trim(),
    );
  }
  const id = dataForId.join("-");
  itinNode.dataset.id = id; // will use this id attribute to find the itin the user selected
  return id;
}
const itinIdQueue = [];
const seenItinIds = {};

function parseLegs(legNodes) {
  const flights = [];
  for (const containerNode of legNodes) {
    const leg = queryLeg(containerNode);
    flights.push(leg);
  }
  return flights;
}
function queryLeg(containerNode) {
  const data = {};

  for (const [key, selector] of Object.entries(SELECTORS)) {
    // try {
    const node = containerNode.querySelector(selector);
    switch (key) {
      case "operatingAirline": {
        data.operatingAirline = node ? node.textContent.replace("Operated by", "") : null;

        break;
      }
      case "marketingAirline": {
        const logo = node.querySelector("img");
        data.marketingAirline = logo ? logo.alt : node.textContent.trim();

        break;
      }
      case "layovers": {
        let layovers = [];
        if (!node.textContent.toLowerCase().includes("non")) {
          node.click();
          layovers = getLayovers(containerNode);
        }
        data.layovers = layovers;

        break;
      }
      default:
        if (["fromTime", "toTime"].includes(key)) {
          data[key] = standardizeTimeString(node.textContent);
        } else {
          data[key] = node.textContent.trim();
        }
    }
  }
  return data;
}
