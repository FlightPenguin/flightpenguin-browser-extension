// console.log and debugger work here, open dev tools on web page (how you normally would) to see them
console.clear();
console.log("hello...");

let rafID = 0;
let intervalID = 0;
let allItins = [];
let firstParse = true;
let resultSummaryResultsTextContainer;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // parse page to get flights, then send background to process and display on new web page.
  console.info("Received message ", message.event);
  switch (message.event) {
    case "STOP_PARSING":
      stopParsing();
      break;
    case "BEGIN_PARSING":
      // Wait until flights results stop loading, then parse.
      // We can do this by observing the spinner's visibility.
      resultSummaryResultsTextContainer = document.querySelector(
        "[class^='ResultsSummary_summaryContainer']"
      );
      let options = {
        root: document.querySelector("[class^='ResultsSummary_container']"),
        threshold: [0, 0.5, 1],
      };
      let prevRatio = 0;
      let callback = function (entries) {
        entries.forEach((entry) => {
          if (
            entry.intersectionRatio === 0 &&
            entry.intersectionRatio < prevRatio
          ) {
            loadResults();
          }
          prevRatio = entry.intersectionRatio;
        });
      };
      let obs = new IntersectionObserver(callback, options);
      const spinnerNode = document.querySelector(
        "[class^='BpkSpinner_bpk-spinner']"
      );
      if (spinnerNode) {
        obs.observe(spinnerNode);
      } else {
        loadResults();
      }
      break;
    case "HIGHLIGHT_FLIGHT":
      const { selectedDepartureId, selectedReturnId } = message;
      // use IntersectionObserver again, observe #details-modal
      highlightItin(selectedDepartureId, selectedReturnId);
      addBackToSearchButton();
      break;
    default:
      break;
  }
});

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
  window.cancelAnimationFrame(rafID);
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

/**
 * Cancel requestAnimationFrame and close all the modals we opened to get the layovers.
 */
function stopParsing() {
  window.cancelAnimationFrame(rafID);
  // need to wait a second for DOM to update or else UI will crash
  intervalID = window.setInterval(() => {
    let button = document.querySelector("button[class^='BpkCloseButton']");
    if (!button) {
      window.clearInterval(intervalID);
      chrome.runtime.sendMessage({
        event: "SKYSCANNER_READY",
      });
      return;
    }
    button.click();
    button = document.querySelector("button[class^='BpkCloseButton']");
  }, 500);
}

/**
 * Skyscanner has a button that you need to click to see more results, then
 * the rest of the results are loaded has you scroll. So to get more results we need to scroll down the page.
 * Every time Skyscanner needs to fetch more results, our background picks up the API request and
 * calls this function again.
 */
function loadResults() {
  if (!firstParse) {
    return;
  }
  firstParse = false;

  let newY = window.innerHeight;
  let lastTime = 0;

  const seeMoreFlightsButton = document.querySelector(
    "[class^='FlightsDayView_results__'] > div > button"
  );
  if (seeMoreFlightsButton) {
    seeMoreFlightsButton.click();
  }

  rafID = window.requestAnimationFrame(parseMoreFlights);

  function parseMoreFlights(currentTime) {
    if (resultSummaryResultsTextContainer.textContent.match(/^0 results/)) {
      window.cancelAnimationFrame(rafID);
      chrome.runtime.sendMessage({
        event: "FLIGHT_RESULTS_RECEIVED",
        flights: [],
      });
    }
    // every 5 seconds scroll to next viewPort
    const timeToScroll = Math.max(0, 5000 - (currentTime - lastTime));
    if (timeToScroll === 0) {
      window.scroll(0, newY);

      let moreItins = Array.from(
        document.querySelectorAll(
          ".BpkTicket_bpk-ticket__Brlno:not([data-visited='true']"
        )
      );
      if (moreItins.length) {
        const flights = parser(moreItins);
        chrome.runtime.sendMessage({
          event: "FLIGHT_RESULTS_RECEIVED",
          flights,
        });
      }
      moreItins.forEach((itin) => {
        itin.dataset.visited = true;
      });
      allItins = allItins.concat(moreItins);
      newY = window.scrollY + window.innerHeight;
      lastTime = currentTime;
    }

    rafID = window.requestAnimationFrame(parseMoreFlights);
  }
}

function findMatchingDOMNode(list, target) {
  return list.find((item) => item.dataset.id === target);
}

function parser(itinNodes) {
  const selectors = {
    fromTime: "[class^='LegInfo_routePartialDepart'] *:first-child",
    toTime: "[class^='LegInfo_routePartialArrive'] *:first-child",
    duration: "[class^='LegInfo_stopsContainer'] *:first-child",
    layovers: "[class^='LegInfo_stopsLabelContainer'] *:first-child",
    marketingAirlines: "[class^='LogoImage_container']",
    operatingAirline: "[class*='Operators_operator']",
  };
  const fareSelector = {
    fare: "[class^='Price_mainPriceContainer']",
  };
  let itins = itinNodes.map((node) => {
    if (node.textContent.includes("Sponsored")) {
      return null;
    }
    node.dataset.visited = "true";

    const fare = node.querySelector(fareSelector.fare).textContent.trim();
    const legs = node.querySelector("[class^='TicketBody_legsContainer']")
      .children;

    const [departureFlight, returnFlight] = queryDOM(legs, selectors);
    let dataForId = [
      departureFlight.fromTime,
      departureFlight.toTime,
      departureFlight.marketingAirline,
    ];
    if (returnFlight) {
      dataForId = dataForId.concat([
        returnFlight.fromTime,
        returnFlight.toTime,
        returnFlight.marketingAirline,
      ]);
    }

    node.dataset.id = dataForId.join("-"); // will use this id attribute to find the itin the user selected

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

function getLayovers(itinIdx) {
  // get for all legs of itin since we go through so much work opening the modal that shows us the entire itin
  const modalNode = document.querySelector("#details-modal");
  const legNode = modalNode.querySelectorAll("[class^='Itinerary_leg']")[
    itinIdx
  ];

  const stopsNode = legNode.querySelector(
    "[class^='LegInfo_stopsLabelContainer']"
  );

  if (stopsNode.textContent.toLowerCase().includes("non")) {
    // non-stop, no layovers
    return [];
  }
  stopsNode.click();
  const layoversNode = legNode.querySelector(
    "[class^='LegSegmentSummary_container']"
  );
  const airlines = Array.from(
    layoversNode.querySelectorAll(
      "[class^='LogoImage_container'] span:first-of-type"
    )
  );
  const segments = Array.from(
    layoversNode.querySelectorAll("[class^='LegSegmentDetails_container']")
  );
  const layovers = [];
  for (let i = 0; i < airlines.length; i++) {
    const [fromTime, duration, toTime] = segments[i].querySelector(
      "[class^='Times_segmentTimes']"
    ).children;
    let [from, to] = segments[i].querySelectorAll(
      "[class^='Routes_routes'] > span"
    );
    from = Array.from(from.childNodes)[0];
    to = Array.from(to.childNodes)[0];
    layovers.push({
      airline: airlines[i].textContent,
      from,
      fromTime: fromTime.textContent,
      duration: duration.textContent,
      to,
      toTime: toTime.textContent,
    });
  }

  return layovers;
}

function queryDOM(htmlCollection, selectors) {
  const flightObjects = Array.from(htmlCollection).map(
    (containerNode, itinIdx) => {
      const data = {};
      Object.entries(selectors).forEach(([key, selector]) => {
        try {
          const node = containerNode.querySelector(selector);
          if (key === "operatingAirline") {
            if (node) {
              data.operatingAirline = node.textContent.replace(
                "Operated by ",
                ""
              );
            } else {
              data.operatingAirline = null;
            }
          } else if (key === "marketingAirlines") {
            const logo = node.querySelector("img");
            if (logo) {
              data.marketingAirline = logo.alt;
            } else {
              data.marketingAirline = node.textContent;
            }
          } else if (key === "layovers") {
            // going to get layovers for both departure/return flights
            let layovers = [];
            if (!node.textContent.toLowerCase().includes("non")) {
              containerNode.click();
              layovers = getLayovers(itinIdx);
            }
            data.layovers = layovers;
          } else {
            data[key] = node.textContent.trim();
          }
        } catch (e) {
          console.info("Error parsing ", key, e);
        }
      });
      return data;
    }
  );

  return flightObjects;
}
