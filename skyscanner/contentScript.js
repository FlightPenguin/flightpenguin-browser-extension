Sentry.init({
  dsn:
    "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451",
});

const errors = {};
let searchParams;
let rafID = 0;
let allItins = [];
let isHighlightingItin = false; // to prevent opening modals when trying to highlight a selected itin
const ITIN_NODE_SELECTOR = "[class*='FlightsTicket_container'] [role='button']";

chrome.runtime.onMessage.addListener(async function (message) {
  // parse page to get flights, then send background to process and display on new web page.
  console.info("Received message ", message.event);
  switch (message.event) {
    case "BEGIN_PARSING":
      searchParams = message.formData;
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
      if (loadItinModalObserver) {
        loadItinModalObserver.disconnect();
      }
      if (loadModalObserver) {
        loadModalObserver.disconnect();
      }
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
            if (loadModalObserver) {
              loadModalObserver.disconnect();
            }
            highlightItin(selectedDepartureId, selectedReturnId);
            clearInterval(intId);
            addBackToSearchButton();
          } catch (e) {
            if (tries < 1) {
              Sentry.captureException(e, {
                tags: {component: 'highlightSkyscannerItin'},
                extra: searchParams
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
  const callback = async function (mutationlist, observer) {
    const resultSummaryContainer = document.querySelector(
      "[class^='ResultsSummary_summaryContainer']"
    );
    const val = resultSummaryContainer
      ? resultSummaryContainer.textContent.match(/\d/)
      : null;
    if (val) {
      // results rendered without loading state
      if (+val[0] > 0) {
        closePopups();
        await parseResults();
      } else {
        chrome.runtime.sendMessage({
          event: "NO_FLIGHTS_FOUND",
          provider: "skyscanner",
        });
      }
      observer.disconnect();
      return;
    }
    for (let m of mutationlist) {
      const continueButton = document.querySelector(
        "[type=button][class*='DirectDays']"
      );
      if (!continueButton) {
        const getPricesButton = document.querySelector(
          "[class*='month-view__trip-summary-cta']"
        );
        if (getPricesButton) {
          chrome.runtime.sendMessage({
            event: "NO_FLIGHTS_FOUND",
            provider: "skyscanner",
          });
          observer.disconnect();
          return;
        }
      }
      if (continueButton) {
        continueButton.click();
        chrome.runtime.sendMessage({
          event: "CALL_BEGIN_PARSE",
          provider: "skyscanner",
        });
        observer.disconnect();
        return;
      }
      const isPriceContainer = /ProgressBar_container/.test(
        m.target.classList[0]
      );

      if (isPriceContainer) {
        await parseResults();
        observer.disconnect();
      }
    }
  };
  const observer = new MutationObserver(callback);
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
  const resultsContainer = document.querySelector(
    "[class^='FlightsDayView_results__']"
  );

  if (!resultsContainer) {
    closeModal();
    await pause();
    return;
  }
  const seeMoreFlightsButton = Array.from(
    resultsContainer.querySelectorAll("button")
  ).find((el) => el.textContent === "Show more results");
  if (seeMoreFlightsButton) {
    seeMoreFlightsButton.click();
    await pause();
  }
  const rect = resultsContainer.getBoundingClientRect();
  window.scroll(0, rect.height);
}

function pause() {
  return new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
}
/**
 * Skyscanner has a button that you need to click to see more results, then
 * the rest of the results are loaded has you scroll. So to get more results we need to scroll down the page.
 * Every time Skyscanner needs to fetch more results, our background picks up the API request and
 * calls this function again.
 */
async function parseResults() {
  let lastTime = 0;
  if (isHighlightingItin) {
    return;
  }
  await showMoreResults();

  rafID = window.requestAnimationFrame(parseMoreFlights);

  async function parseMoreFlights(currentTime) {
    const resultSummaryContainer = document.querySelector(
      "[class^='ResultsSummary_summaryContainer']"
    );
    if (
      resultSummaryContainer &&
      /^0 results/.test(resultSummaryContainer.textContent)
    ) {
      window.cancelAnimationFrame(rafID);
      chrome.runtime.sendMessage({
        event: "NO_FLIGHTS_FOUND",
        provider: "skyscanner",
      });
      return;
    }
    // every 4 seconds scroll to next viewPort
    // timeToScroll will initially resolve to 0 because currentTime
    // is the timestamp since the page's origin.
    // So subtracting a very big number from 4000 will be negative, and 0 is greater.
    const timeToScroll = Math.max(0, 4000 - (currentTime - lastTime));
    if (timeToScroll === 0) {
      await showMoreResults();

      let moreItins = Array.from(
        document.querySelectorAll(ITIN_NODE_SELECTOR)
      );
      if (moreItins.length) {
        const flights = parser(moreItins);
        // nonstop flights
        if (flights.length) {
          chrome.runtime.sendMessage({
            event: "FLIGHT_RESULTS_RECEIVED",
            flights,
            provider: "skyscanner",
          });
        }
        // if we have any flights with layovers, start parsing those
        if (itinIdQueue.length) {
          // set up Observer
          await loadLayoverModal();
          window.cancelAnimationFrame(rafID);
          return;
        }
      } else {
        chrome.runtime.sendMessage({
          event: "SKYSCANNER_READY",
        });
        window.cancelAnimationFrame(rafID);
        return;
      }

      allItins = allItins.concat(moreItins);
      lastTime = currentTime;
    }

    rafID = window.requestAnimationFrame(parseMoreFlights);
  }
}
let currIds = new Set();
function setItinIds() {
  let moreItins = Array.from(
    document.querySelectorAll(ITIN_NODE_SELECTOR)
  );
  const newIds = new Set();
  for (let itin of moreItins) {
    const legNodes = Array.from(
      itin.querySelectorAll("[class^='LegDetails_container']")
    );
    const id = setIdDataset(itin, legNodes);
    newIds.add(id);
  }
  // SFO to LHR, some options disappear and we still show them in our results.
  // Need to diff old list with new to make sure we're up to date.
  // Then send message to remove  these ids.
  const idsToRemove = new Set();

  for (let id of currIds) {
    if (!newIds.has(id)) {
      idsToRemove.add(id);
    }
  }
  currIds = newIds;

  // if (idsToRemove.size > 0) {
  //   chrome.runtime.sendMessage({
  //     event: "DELETE_IDS",
  //     ids: Array.from(idsToRemove),
  //     provider: "skyscanner",
  //   });
  // }
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
  detailView: "[class^='TotalPrice_totalPriceContainer']", // fare.match(/\d+/g).join("") * 1
  resultsView: "[class^='Price_mainPriceContainer']",
  // fareBackup: "[class*='Pricebox_prices']",
  fareBackup: "[class*='CardPrice_totalPrice']", // when there are upgrades
};
function parser(itinNodes) {
  let itins = itinNodes.map((itinNode) => {
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
    const [fromTime, duration, toTime] = segments[i].querySelector(
      "[class^='Times_segmentTimes']"
    ).children;
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
      fromTime: Helpers.standardizeTimeString(fromTime.textContent),
      duration: duration.textContent,
      toTime: Helpers.standardizeTimeString(toTime.textContent),
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
  if (loadItinModalObserver) {
    loadItinModalObserver.takeRecords();
  }
}

function findMoreItins() {
  let moreItins = Array.from(
    document.querySelectorAll(ITIN_NODE_SELECTOR)
  );
  if (moreItins.length) {
    const flights = parser(moreItins);
    // nonstop flights, parser will add flights with stops to itinIdQueue
    if (flights.length) {
      chrome.runtime.sendMessage({
        event: "FLIGHT_RESULTS_RECEIVED",
        flights,
        provider: "skyscanner",
      });
    }
  }
}

let loadModalObserver;
let isClosingModal;

async function loadModalCallback(mutationList, observer) {
  closePopups();
  loadModalObserver = observer;

  if (isHighlightingItin) {
    observer.disconnect();
    return;
  }

  if (!itinIdQueue.length) {
    // all finished
    closeModal();
    await pause();
    observer.disconnect();
    // look for more flights
    await parseResults();
    calledLayoverModalObserver = false;
    return;
  }
  let isModalOpen = false;
  let isResultListOpen = false;
  const RESULTS_VIEW_SELECTOR = "[class*='FlightsDayView_row']";
  const RESULTS_VIEW_SELECTOR_2 = "[class*='FlightsResults_dayViewItems']";
  const MODAL_VIEW_SELECTOR = "[class*='FlightsBookingPanel_content']";
  const MODAL_LOADING_SELECTOR = "[class^='DetailsPanel_loading']";
  const modalContainerNode = document.querySelector(MODAL_VIEW_SELECTOR);

  for (let mutation of mutationList) {
    isResultListOpen = Array.from(mutation.addedNodes).find(n => n.matches && n.matches(RESULTS_VIEW_SELECTOR));
    isResultListOpen = isResultListOpen || mutation.target.matches(RESULTS_VIEW_SELECTOR_2);
    isModalOpen = Array.from(mutation.addedNodes).find(n => n.matches(MODAL_VIEW_SELECTOR));
    isModalOpen = isModalOpen || Array.from(mutation.removedNodes).find(n => n.matches(MODAL_LOADING_SELECTOR));
    if (isResultListOpen || isModalOpen) {
      // something minor happened, 
      // only care about when a modal opens, its contents are loading, and it closes
      break;
    }
  }
  if (isResultListOpen === undefined && isModalOpen === undefined) {
    return;
  }
  if (isClosingModal) {
    if (isResultListOpen) {
      isClosingModal = false; 
    } else {
      // stop infinite loop from simultaneously trying to close modal and read modal
      return;
    }
  }

  if (isResultListOpen) {
    // results page, find itin and click it to open modal to scrape layovers
    setItinIds();
    await openItinWithLayoversModal();
    return;
  }

  if (modalContainerNode) {
    const isLoading = modalContainerNode.querySelector(
      MODAL_LOADING_SELECTOR
    );
    if (isLoading) {
      return;
    }

    const itin = parseItin(modalContainerNode);
    if (!itin) {
      // still loading
      return;
    }
    chrome.runtime.sendMessage({
      event: "FLIGHT_RESULTS_RECEIVED",
      flights: [itin],
      provider: "skyscanner",
    });
    closeModal();
    isClosingModal = true;
    await pause();
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
    // still loading, report to sentry
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

let loadItinModalObserver;
let calledLayoverModalObserver = false;

async function loadLayoverModal() {
  if (calledLayoverModalObserver) {
    return;
  }
  calledLayoverModalObserver = true;

  loadItinModalObserver = new MutationObserver(loadModalCallback);
  loadItinModalObserver.observe(document.getElementById("app-root"), {
    childList: true,
    subtree: true,
  });

  await openItinWithLayoversModal();
}

async function openItinWithLayoversModal() {

  const itinId = itinIdQueue.shift();
  const foundItinNode = await findItinById(itinId);
  try {
    foundItinNode.click();
  } catch (e) {
    itinIdQueue.push(itinId);
  }
}

async function findItinById(itinNodeId) {
  let itinNode = document.querySelector(`[data-id='${itinNodeId}']`);
  let tries = 5;

  while (!itinNode) {
    if (isHighlightingItin) {
      observer.disconnect();
      return;
    }
    if (tries === 0) {
      return;
    }
    await showMoreResults();

    setItinIds();
    itinNode = document.querySelector(`[data-id='${itinNodeId}']`);
    tries--;
  }
  return itinNode;
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
      Helpers.standardizeTimeString(fromTime.textContent),
      Helpers.standardizeTimeString(toTime.textContent),
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
        data.operatingAirline = node.textContent;
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
      data[key] = Helpers.standardizeTimeString(node.textContent);
    } else {
      data[key] = node.textContent.trim();
    }
  });
  return data;
}
