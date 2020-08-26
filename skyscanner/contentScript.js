Sentry.init({
  dsn:
    "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451",
});

const errors = {};
let rafID = 0;
let allItins = [];

chrome.runtime.onMessage.addListener(function (message) {
  // parse page to get flights, then send background to process and display on new web page.
  console.info("Received message ", message.event);
  switch (message.event) {
    case "BEGIN_PARSING":
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
      closeModal();
      closePopups();
      showMoreResults();
      addBackToSearchButton();
      if (loadItinModalObserver) {
        loadItinModalObserver.disconnect();
      }
      if (loadModalObserver) {
        loadModalObserver.disconnect();
      }
      window.cancelAnimationFrame(rafID);
      // setTimeout to allow time for results to load
      const intId = setInterval(() => {
        try {
          closeModal();
          setItinIds();
          highlightItin(selectedDepartureId, selectedReturnId);
          clearInterval(intId);
        } catch (e) {
          // keep going
          window.scroll(0, window.pageYOffset + window.innerHeight);
        }
      }, 500);
      break;
    default:
      break;
  }
});

function loadResults() {
  const config = { childList: true, subtree: true };
  let continueButton = document.querySelector(
    "[type=button][class*='DirectDays']"
  );
  if (!continueButton) {
    getPricesButton = document.querySelector(
      "[class*='month-view__trip-summary-cta']"
    );
    if (getPricesButton) {
      chrome.runtime.sendMessage({
        event: 'NO_FLIGHTS_FOUND',
        provider: 'skyscanner',
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
    return;
  }

  const callback = function (mutationlist, observer) {
    for (let m of mutationlist) {
      continueButton = document.querySelector(
        "[type=button][class*='DirectDays']"
      );
      if (!continueButton) {
        getPricesButton = document.querySelector(
          "[class*='month-view__trip-summary-cta']"
        );
        if (getPricesButton) {
          chrome.runtime.sendMessage({
            event: 'NO_FLIGHTS_FOUND',
            provider: 'skyscanner',
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
        const isDoneLoading = Array.from(m.removedNodes).find((n) =>
          /BpkProgress_bpk-progress/.test(n.classList[0])
        );
        if (isDoneLoading) {
          closePopups();
          parseResults();
          observer.disconnect();
          return;
        }
      }
    }
  };
  const observer = new MutationObserver(callback);
  observer.observe(document.body, config);
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
  chrome.runtime.sendMessage({
    event: "FOCUS_WEBPAGE",
  });
}

function highlightItin(selectedDepartureId, selectedReturnId) {
  // reset prior selection
  const prevSelection = document.querySelector(
    ".BpkTicket_bpk-ticket__Brlno[data-selected='true']"
  );
  if (prevSelection) {
    prevSelection.dataset.selected = "false";
    prevSelection.style.border = "";
  }
  let idToSearchFor = selectedDepartureId;
  if (selectedReturnId) {
    idToSearchFor += `-${selectedReturnId}`;
  }
  const itinNode = findMatchingDOMNode(
    Array.from(document.querySelectorAll(".BpkTicket_bpk-ticket__Brlno")),
    idToSearchFor
  );
  itinNode.style.border = "10px solid tomato";
  itinNode.dataset.selected = "true";
  const yPosition =
    window.pageYOffset +
    itinNode.getBoundingClientRect().top -
    window.innerHeight / 2;
  window.scroll(0, yPosition);
}

function showMoreResults() {
  const resultsContainer = document.querySelector(
    "[class^='FlightsDayView_results__']"
  );
  if (!resultsContainer) {
    closeModal();
    console.log("tried to show more results but can't");
    return;
  }
  const seeMoreFlightsButton = Array.from(
    resultsContainer.querySelectorAll("button")
  ).find((el) => el.textContent === "Show more results");
  if (seeMoreFlightsButton) {
    seeMoreFlightsButton.click();
  }
  const { height } = resultsContainer.getBoundingClientRect();
  window.scroll(0, height);
}

function pause() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}
/**
 * Skyscanner has a button that you need to click to see more results, then
 * the rest of the results are loaded has you scroll. So to get more results we need to scroll down the page.
 * Every time Skyscanner needs to fetch more results, our background picks up the API request and
 * calls this function again.
 */
function parseResults() {
  let lastTime = 0;

  showMoreResults();

  rafID = window.requestAnimationFrame(parseMoreFlights);

  async function parseMoreFlights(currentTime) {
    const resultSummaryResultsTextContainer = document.querySelector(
      "[class^='ResultsSummary_summaryContainer']"
    );
    if (
      resultSummaryResultsTextContainer &&
      /^0 results/.test(resultSummaryResultsTextContainer.textContent)
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
      showMoreResults();

      await pause();

      let moreItins = Array.from(
        document.querySelectorAll(".BpkTicket_bpk-ticket__Brlno")
      );
      setItinIds();
      moreItins = moreItins.filter((itin) => !seenItinIds.has(itin.dataset.id));

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
          loadLayoverModal();
          window.cancelAnimationFrame(rafID);
        }
      } else {
        chrome.runtime.sendMessage({
          event: "SKYSCANNER_READY",
        });
        window.cancelAnimationFrame(rafID);
      }

      allItins = allItins.concat(moreItins);
      lastTime = currentTime;
    }

    rafID = window.requestAnimationFrame(parseMoreFlights);
  }
}

function setItinIds() {
  let moreItins = Array.from(
    document.querySelectorAll(".BpkTicket_bpk-ticket__Brlno")
  );
  const ids = [];
  for (let itin of moreItins) {
    const legNodes = Array.from(
      itin.querySelectorAll("[class^='LegDetails_container']")
    );
    const id = setIdDataset(itin, legNodes);
    ids.push(id);
  }
  return ids;
}

function findMatchingDOMNode(list, target) {
  return list.find((item) => item.dataset.id === target);
}

const SELECTORS = {
  fromTime: "[class^='LegInfo_routePartialDepart'] *:first-child",
  toTime: "[class^='LegInfo_routePartialArrive'] *:first-child",
  duration: "[class^='LegInfo_stopsContainer'] *:first-child",
  layovers: "[class^='LegInfo_stopsLabelContainer'] *:first-child",
  marketingAirlines: "[class^='LogoImage_container']",
  operatingAirline: "[class*='Operators_operator']",
  from: "[class*='LegInfo_routePartialDepart'] *:nth-child(2)",
  to: "[class*='LegInfo_routePartialArrive'] *:nth-child(2)",
};
const layoverFromToSelectors = {
  from: "[class*='Routes_routes'] *:first-child",
  to: "[class*='Routes_routes'] *:nth-child(2)",
};
const fareSelector = {
  fare: "[class^='Price_mainPriceContainer']",
  fareBackup: "[class*='Pricebox_prices']",
};
function parser(itinNodes) {
  let itins = itinNodes.map((node) => {
    node.dataset.visited = "true";

    if (node.textContent.includes("Sponsored")) {
      return null;
    }
    let fare;
    try {
      fare = node.querySelector(fareSelector.fare).textContent.trim();
    } catch (e) {
      // one of those itins that say for example "See Southwest for prices"
      return null;
    }

    const [departureFlight, returnFlight] = queryDOM(node);
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
      fromTime: fromTime.textContent,
      duration: duration.textContent,
      toTime: toTime.textContent,
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
let flightsWithLayoversToSend = [];

function closeModal() {
  const button = document.querySelector(
    "[class*='DetailsPanelHeader_navigationBar'] button[label='back']"
  );
  if (button) {
    button.click();
    console.log("closing modal");
  }
}
let loadModalObserver;
async function loadModalCallback(mutationList, observer) {
  loadModalObserver = observer;
  window.cancelAnimationFrame(rafID);
  closePopups();

  if (flightsWithLayoversToSend.length) {
    chrome.runtime.sendMessage({
      event: "FLIGHT_RESULTS_RECEIVED",
      flights: flightsWithLayoversToSend,
      provider: "skyscanner",
    });
    flightsWithLayoversToSend = [];
  }

  if (!itinIdQueue.length) {
    closeModal();
    await pause();
    calledLayoverModalObserver = false;
    observer.disconnect();
    console.log("finished current queue");
    parseResults();
    return;
  }
  let modalContainerNode;

  for (let m of mutationList) {
    // Results view
    let isResultListOpen =
      m.target.matches("[class*='ProgressBar_container']") &&
      m.removedNodes.length;
    if (isResultListOpen) {
      // results page, find itin and click it to open modal to scrape layovers
      // UI variant #2
      setItinIds();
      let itinNodeId = itinIdQueue.shift();
      let itinNode = document.querySelector(`[data-id='${itinNodeId}']`);
      while (!itinNode) {
        showMoreResults();
        await pause();
        setItinIds();
        itinNode = document.querySelector(`[data-id='${itinNodeId}']`);
      }
      itinNode.click();
      return;
    }

    // Modal view
    let isModalOpen = Array.from(m.addedNodes).find((n) =>
      n.matches("[class*='FlightsBookingPanel']")
    );
    if (!isModalOpen) {
      // this mutation follows if modal takes a while to load,
      // usually happens on first modal
      isModalOpen =
        m.target.matches("[class*='FlightsBookingPanel']") &&
        Array.from(m.addedNodes).find((n) =>
          n.matches("[class*='DetailsPanelHeader_navigationBar']")
        );
    }
    if (isModalOpen) {
      modalContainerNode = document.getElementById("app-root");
      break;
    }
  }

  if (modalContainerNode) {
    const isLoading = modalContainerNode.querySelector(
      "[class^='DetailsPanel_loading']"
    );
    if (isLoading) {
      return;
    }

    const legNodes = Array.from(
      modalContainerNode.querySelectorAll("[class^='Itinerary_leg']")
    );
    const [departureFlight, returnFlight] = parseLegs(legNodes);

    let fareNode = modalContainerNode.querySelector(fareSelector.fare);
    if (!fareNode) {
      fareNode = modalContainerNode.querySelector(fareSelector.fareBackup);
    }
    let fare;
    try {
      fare = fareNode.textContent.trim().split("$")[1];
    } catch (e) {
      // still loading
      return;
    }

    flightsWithLayoversToSend.push({
      departureFlight,
      returnFlight,
      fare,
      currency: "$",
    });
    chrome.runtime.sendMessage({
      event: "FLIGHT_RESULTS_RECEIVED",
      flights: flightsWithLayoversToSend,
      provider: "skyscanner",
    });

    closeModal();
    return;
  }
}

let loadItinModalObserver;
let calledLayoverModalObserver = false;

function loadLayoverModal() {
  if (calledLayoverModalObserver) {
    return;
  }
  calledLayoverModalObserver = true;

  loadItinModalObserver = new MutationObserver(loadModalCallback);
  loadItinModalObserver.observe(document.getElementById("app-root"), {
    childList: true,
    subtree: true,
  });

  const itinNodeId = itinIdQueue.shift();
  const itinNode = document.querySelector(`[data-id='${itinNodeId}']`);
  // this click will trigger MutationObserver callback
  itinNode.click();
}

function setIdDataset(itinNode, legNodes) {
  let dataForId = [];
  for (let legNode of legNodes) {
    const [fromTime, toTime] = legNode.querySelectorAll(
      "[class*='LegInfo_routePartialTime']"
    );
    const marketingAirlinesNode = legNode.querySelector(
      SELECTORS.marketingAirlines
    );
    const logo = legNode.getElementsByTagName("img")[0];
    let marketingAirline = "";
    if (logo) {
      marketingAirline = logo.alt;
    } else {
      marketingAirline = marketingAirlinesNode.textContent;
    }
    dataForId = dataForId.concat([
      fromTime.textContent.trim(),
      toTime.textContent.trim(),
      marketingAirline.trim(),
    ]);
  }
  const id = dataForId.join("-");
  itinNode.dataset.id = id; // will use this id attribute to find the itin the user selected
  return id;
}
const itinIdQueue = [];
const seenItinIds = new Set();

function queryDOM(itinNode) {
  const hasLayovers = /\d stop/.test(itinNode.textContent);
  const legNodes = Array.from(
    itinNode.querySelectorAll("[class^='LegDetails_container']")
  );
  const id = setIdDataset(itinNode, legNodes);
  if (seenItinIds.has(id)) {
    return [];
  }
  seenItinIds.add(id);

  if (hasLayovers) {
    itinIdQueue.push(id);
    return [];
  }

  return parseLegs(legNodes);
}

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
    } else if (key === "marketingAirlines") {
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
    } else {
      data[key] = node.textContent.trim();
    }
  });
  return data;
}
