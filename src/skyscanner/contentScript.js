Sentry.init({
  dsn:
    "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451",
});

import AirlineMap from "../shared/nameMaps/airlineMap.js";
import {standardizeTimeString} from "../shared/helpers.js";

let formData;
let rafID = 0;
let isHighlightingItin = false; // to prevent opening modals when trying to highlight a selected itin
const ITIN_NODE_SELECTOR = "[class*='FlightsTicket_container'] [role='button']";
let totalNonStop = 0;

chrome.runtime.onMessage.addListener(async function (message) {
  // parse page to get flights, then send background to process and display on new web page.
  console.info("Received message ", message.event);
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
          } catch (e) {
            if (tries < 1) {
              Sentry.captureException(e, {
                tags: {component: 'highlightSkyscannerItin'},
                extra: formData
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

function loadResults() {
  let timeoutId;
  const observer = new MutationObserver(function (mutationlist, observer) {
    // should observe results container after added to DOM
    // and disconnect this observer
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      parseResults();
      observer.disconnect();
    }, 5000);
    return;
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function closePopups() {
  let closeButton = document.getElementById("close");
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
  button.innerText = "Return to FlightPenguin";
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
  const prevSelection = document.querySelector(
    `${ITIN_NODE_SELECTOR}[data-selected='true']`
  );
  if (prevSelection) {
    prevSelection.dataset.selected = "false";
    prevSelection.style.border = "";
  }
  let idToSearchFor = selectedDepartureId;
  if (selectedReturnId) {
    idToSearchFor += `-${selectedReturnId}`;
  }
  const itinNode = document.querySelector(`[data-id="${idToSearchFor}"]`);
  itinNode.style.border = "10px solid tomato";
  itinNode.dataset.selected = "true";
  const yPosition =
    window.pageYOffset +
    itinNode.getBoundingClientRect().top -
    window.innerHeight / 2;
  window.scroll(0, yPosition);
}

async function showMoreResults() {
  if (isHighlightingItin) {
    return;
  }
  const resultsContainer = document.querySelector(
    "[class^='FlightsDayView_results__']"
  );

  if (!resultsContainer) {
    closeModal();
    await pause();
    return;
  }
  if (isHighlightingItin) {
    return;
  }
  const seeMoreFlightsButton = Array.from(
    resultsContainer.querySelectorAll("button")
  ).find((el) => el.textContent === "Show more results");
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

  window.addEventListener('scroll', function handleScroll() {
    if (isHighlightingItin) {
      window.cancelAnimationFrame(rafID);
      window.removeEventListener('scroll', handleScroll);
      return;
    }
    let moreItins = Array.from(
      document.querySelectorAll(ITIN_NODE_SELECTOR + ':not([data-visited="true"])')
    );
    if (moreItins.length) {
      totalNonStop += moreItins.length;
      const flights = parser(moreItins);
      // nonstop flights
      if (flights.length) {
        chrome.runtime.sendMessage({
          event: "FLIGHT_RESULTS_RECEIVED",
          flights,
          provider: "skyscanner",
        });
      }
    }

    if (isAtBottomOfPage()) {
      window.cancelAnimationFrame(rafID);
      window.removeEventListener('scroll', handleScroll);

      if (!totalNonStop && !itinIdQueue.length) {
        chrome.runtime.sendMessage({event: "NO_FLIGHTS_FOUND", provider: "skyscanner"});
        return;
      }

      if (isHighlightingItin) {
        return;
      }
      // finally parse flights with stops
      if (itinIdQueue.length) {
        window.addEventListener('scroll', function parseItinWithStops() {
          if (window.pageYOffset === 0) {
            openItinWithLayoversModal();
            window.removeEventListener('scroll', parseItinWithStops);
          }
        });
        window.scroll(0,0);
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
  return (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2;
}

function setItinIds(notSeenSelector = "") {
  let moreItins = Array.from(
    document.querySelectorAll(ITIN_NODE_SELECTOR + notSeenSelector)
  );

  for (let i = 0; i < moreItins.length; i++) {
    const itin = moreItins[i];
    const legNodes = Array.from(
      itin.querySelectorAll("[class^='LegDetails_container']")
    );
    setIdDataset(itin, legNodes);
    itin.dataset.visited = 'true';
  }
  if (!moreItins.length) {
    console.log('did not set itin ids')
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
    } catch (e) {
      // one of those itins that say for example "See Southwest for prices"
      return null;
    }
    const hasLayovers = /\d stop/.test(itinNode.textContent);
    const legNodes = Array.from(
      itinNode.querySelectorAll("[class^='LegDetails_container']")
    );
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
  const layoversNode = legNode.querySelector(
    "[class^='LegSegmentSummary_container']"
  );
  const airlines = Array.from(
    layoversNode.querySelectorAll("[class^='AirlineLogoTitle_container']")
  );
  const segments = Array.from(
    layoversNode.querySelectorAll("[class^='LegSegmentDetails_container']")
  );
  const layovers = [];
  for (let i = 0; i < segments.length; i++) {
    let [fromTime, duration, toTime] = segments[i].querySelector(
      "[class^='Times_segmentTimes']"
    ).children;
    fromTime = standardizeTimeString(fromTime.textContent);
    toTime = standardizeTimeString(toTime.textContent);

    const locations = {};
    for (let [key, selector] of Object.entries(layoverFromToSelectors)) {
      const locationNode = segments[i].querySelector(selector);
      locations[key] = locationNode.textContent.split(/\s/)[0];
    }
    const marketingAirline = airlines[i].querySelector(
      "[class^='LogoImage_container']"
    );
    const operatingAirline = airlines[i].querySelector("[class*='OperatedBy']");

    layovers.push({
      fromTime,
      duration: duration.textContent,
      toTime,
      operatingAirline: operatingAirline.textContent
        .toLowerCase()
        .includes("operated")
        ? operatingAirline.textContent
        : marketingAirline.textContent,
      ...locations,
    });
  }
  return layovers;
}

function closeModal() {
  const button = document.querySelector(
    "[class*='DetailsPanelHeader_navigationBar'] button[label='back']"
  );
  if (button) {
    button.click();
  }
}

function parseItin(containerNode) {
  const legNodes = Array.from(
    containerNode.querySelectorAll("[class^='Itinerary_leg']")
  );
  const [departureFlight, returnFlight] = parseLegs(legNodes);

  let fareNode = containerNode.querySelector(fareSelector.detailView);
  if (!fareNode) {
    fareNode = containerNode.querySelector(fareSelector.fareBackup);
  }
  let fare;
  try {
    fare = fareNode.textContent.trim().split("$")[1];
  } catch (e) {
    // still loading
    return;
  }

  const itin = {
    departureFlight,
    returnFlight,
    fare,
    currency: "$",
  };
  return itin;
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
  if (!itinIdQueue.length || isHighlightingItin) {
    closeModal();
    return;
  }
  window.scroll(0,0);
  const itinId = itinIdQueue.shift();
  window.addEventListener('scroll', async function handleScroll() {
    if (isHighlightingItin) {
      window.removeEventListener('scroll', handleScroll);
      return;
    }
    // if at bottom or found itin
    // remove scroll listener
    const foundItinNode = await findItinById(itinId);
    if (foundItinNode) {
      scrapeItinDetailPane(foundItinNode);
      window.removeEventListener('scroll', handleScroll);
    } else if (isAtBottomOfPage()) {
      openItinWithLayoversModal();
      window.removeEventListener('scroll', handleScroll);
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
    const [fromTime, toTime] = legNode.querySelectorAll(
      "[class*='LegInfo_routePartialTime']"
    );
    const marketingAirlinesNode = legNode.querySelector(
      SELECTORS.marketingAirline
    );
    const logo = legNode.getElementsByTagName("img")[0];
    let marketingAirline = "";
    if (logo) {
      marketingAirline = logo.alt;
    } else {
      marketingAirline = marketingAirlinesNode.textContent;
    }
    marketingAirline = AirlineMap.getAirlineName(marketingAirline);
    dataForId.push(
      standardizeTimeString(fromTime.textContent),
      standardizeTimeString(toTime.textContent),
      marketingAirline.trim()
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

  Object.entries(SELECTORS).forEach(([key, selector]) => {
    // try {
    const node = containerNode.querySelector(selector);
    if (key === "operatingAirline") {
      if (node) {
        data.operatingAirline = node.textContent.replace("Operated by", "");
      } else {
        data.operatingAirline = null;
      }
    } else if (key === "marketingAirline") {
      const logo = node.querySelector("img");
      if (logo) {
        data.marketingAirline = logo.alt;
      } else {
        data.marketingAirline = node.textContent.trim();
      }
    } else if (key === "layovers") {
      let layovers = [];
      if (!node.textContent.toLowerCase().includes("non")) {
        node.click();
        layovers = getLayovers(containerNode);
      }
      data.layovers = layovers;
    } else if (["fromTime", "toTime"].includes(key)) {
      data[key] = standardizeTimeString(node.textContent);
    } else {
      data[key] = node.textContent.trim();
    }
  });
  return data;
}
