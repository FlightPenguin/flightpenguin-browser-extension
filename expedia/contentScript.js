// console.log and debugger work here, open dev tools on web page (how you normally would) to see them
console.clear();
console.log("hello...");
const errors = {};
let allItins = [];

window.addEventListener("load", loadResults);
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // parse page to get flights, then send background to process and display on new web page.
  console.info("Received message ", message.event);
  switch (message.event) {
    case "BEGIN_PARSING":
      try {
        loadResults();
      } catch (e) {
        console.log(e);
        chrome.runtime.sendMessage({
          event: "FAILED_SCRAPER",
          source: "expedia",
          description: `${e.name} ${e.message}`,
        });
      }
      break;
    case "GET_RETURNS":
      //   const { selectedDepartureId } = message;
      // click departure
      // wait for returns
      // parse returns
      // send returns
      break;
    case "HIGHLIGHT_FLIGHT":
      const { selectedDepartureId, selectedReturnId } = message;
      highlightItin(selectedDepartureId, selectedReturnId);
      addBackToSearchButton();
      break;
    default:
      break;
  }
});

function loadResults() {
  const intervalId = setInterval(function () {
    let observerTarget = document.querySelector(loadingSelector);
    if (!observerTarget) {
      parseResults();
      clearInterval(intervalId);
    }
  }, 500);
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
  //   window.cancelAnimationFrame(rafID);
  // reset prior selection
  const prevSelection = document.querySelector(
    `${flightContainer}[data-selected='true']`
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
    Array.from(document.querySelectorAll(flightContainer)),
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
 *
 */
function parseResults() {
  // if (resultSummaryResultsTextContainer.textContent.match(/^0 results/)) {
  //   chrome.runtime.sendMessage({
  //     event: "FLIGHT_RESULTS_RECEIVED",
  //     flights: [],
  //   });
  // }

  let moreItins = Array.from(
    document.querySelectorAll(`${flightContainer}:not([data-visited='true']`)
  );
  if (!moreItins.length) {
    chrome.runtime.sendMessage({
      event: "EXPEDIA_READY",
    });
    return;
  }
  const flights = parser(moreItins);
  chrome.runtime.sendMessage({
    event: "FLIGHT_RESULTS_RECEIVED",
    flights,
  });
  allItins = allItins.concat(moreItins);
}

function findMatchingDOMNode(list, target) {
  return list.find((item) => item.dataset.id === target);
}

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

    const departureFlight = queryLeg(node, SELECTORS);

    if (!departureFlight) {
      return null;
    }

    node.dataset.id = [
      departureFlight.fromTime,
      departureFlight.toTime,
      departureFlight.marketingAirline,
    ].join("-"); // will use this id attribute to find the itin the user selected

    return {
      departureFlight,
      fare: fare.replace("$", ""),
      currency: "$", // no currency node
    };
  });
  itins = itins.filter((itin) => itin);

  return itins;
}

function getLayovers(legNode) {
  const layovers = [];
  const segmentsContainer = Array.from(
    legNode.querySelectorAll(flightDetails.segmentContainer)
  );
  for (let segmentContainer of segmentsContainer) {
    layovers.push(queryLeg(segmentContainer, layoverSelectors));
  }
  return layovers;
}

function queryLeg(containerNode, selectors) {
  const data = {};

  Object.entries(selectors).forEach(([key, selector]) => {
    try {
      const node = containerNode.querySelector(selector);
      if (key === "operatingAirline") {
        if (node) {
          if (node.dataset.testAirlineName) {
            data.operatingAirline = node.dataset.testAirlineName;
          } else {
            const airlines = node.textContent.trim().split(/\d+/);
            if (airlines.length > 1 && airlines[1].includes("operated by")) {
              data.operatingAirline = airlines[1].replace("operated by", "");
            } else {
              data.operatingAirline = node.textContent;
            }
          }
        } else {
          data.operatingAirline = null;
        }
      } else if (key === "marketingAirlines") {
        data.marketingAirline = node.textContent.trim();
      } else if (key === "layovers") {
        let layovers = [];
        if (!node) {
          const layoverButton = containerNode.querySelector(
            flightDetails.clickToOpenDetails
          );
          layoverButton.click();
          layovers = getLayovers(containerNode);
        }
        data.layovers = layovers;
      } else if (["from", "to"].includes(key)) {
        data[key] = node.textContent.match(/\(([A-Z]*)\)/)[1];
      } else {
        data[key] = node.textContent.trim();
      }
    } catch (e) {
      if (errors[e.name]) {
        return;
      }
      console.info("Error parsing ", key, e);
      chrome.runtime.sendMessage({
        event: "FAILED_SCRAPER",
        source: "expedia",
        description: `${e.name} ${e.message}`,
      });
      errors[e.name] = true;
    }
  });
  return data;
}
const flightContainer = ".flight-module.segment.offer-listing";
const selectButton = "button";
const finalSelectButton = "[data-test-id='select-button-1']";
const loadingSelector = "#skeleton-listing";
const SELECTORS = {
  fromTime: "[data-test-id='departure-time'",
  toTime: "[data-test-id='arrival-time'",
  duration: "[data-test-id='duration'",
  layovers: "[data-test-num-stops='0']", //nonstop
  marketingAirlines: "[data-test-id='airline-name'",
  operatingAirline: "[data-test-id='operated-by']",
};
const fareSelector = {
  fare: "[data-test-id='listing-price-dollars'",
};
const flightDetails = {
  clickToOpenDetails: "[data-test-id='flight-details-link'",
  detailsContainer: ".details-wrapper",
  segmentContainer: ".segment-info",
};
const layoverSelectors = {
  fromTime: "[data-test-id='details-departure-time'",
  toTime: "[data-test-id='details-arrival-time'",
  duration: "[data-test-id='details-duration-time']",
  from: "[data-test-id='details-departure-localName']",
  to: "[data-test-id='details-arrival-localName']",
  operatingAirline: "[data-test-id='details-airline-data']",
};
