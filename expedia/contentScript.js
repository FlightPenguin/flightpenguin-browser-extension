Sentry.init({
  dsn:
    "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451",
});
const errors = {};
let selectedDeparture;
let selectedItin;

chrome.runtime.onMessage.addListener(function (message) {
  // parse page to get flights, then send background to process and display on new web page.
  console.info("Received message ", message.event);
  switch (message.event) {
    case "BEGIN_PARSING":
      try {
        loadResults("FLIGHT_RESULTS_RECEIVED");
      } catch (e) {
        console.log(e);
        chrome.runtime.sendMessage({
          event: "FAILED_SCRAPER",
          source: "expedia",
          description: `${e.name} ${e.message}`,
        });
      }
      break;
    case "GET_RETURN_FLIGHTS":
      selectedDeparture = message.departure;
      selectedItin = message.itin;
      // click departure
      const departureNode = document.querySelector(
        `[data-id='${selectedDeparture.id}']`
      );
      departureNode.querySelector("button").click();

      // new UI opens a panel with upgrade options
      // requires another click
      document.querySelector('[data-test-id="select-button"]').click();

      setTimeout(() => {
        const restrictionContainer = departureNode.querySelector(
          ".upsell-tray-contents"
        );
        const basicEconomyContainer = departureNode.querySelector(
          ".basic-economy-footer"
        );
        let selected = false;
        if (restrictionContainer) {
          let selectButton = restrictionContainer.querySelector("button");
          if (selectButton) {
            selectButton.click();
            selected = true;
          }
        }
        if (basicEconomyContainer && !selected) {
          let selectButton = basicEconomyContainer.querySelector("button");
          if (selectButton) {
            selectButton.click();
          }
        }
        // parse returns
        try {
          loadResults("RETURN_FLIGHTS_RECEIVED");
        } catch (e) {
          console.log(e);
          chrome.runtime.sendMessage({
            event: "FAILED_SCRAPER",
            source: "expedia",
            description: `${e.name} ${e.message}`,
          });
        }
      }, 500);

      break;
    case "HIGHLIGHT_FLIGHT":
      const { selectedDepartureId, selectedReturnId } = message;
      try {
        highlightItin(
          selectedDepartureId,
          selectedReturnId,
          UI_ORIGINAL_SELECTORS.flightContainer
        );
      } catch (e) {
        highlightItin(
          selectedDepartureId,
          selectedReturnId,
          UI_REDESIGN_SELECTORS.flightContainer
        );
      }
      addBackToSearchButton(selectedReturnId);
      break;
    case "CLEAR_SELECTION":
      clearSelection();
      break;
    default:
      break;
  }
});

function clearSelection() {
  selectedDeparture = null;
  selectedItin = null;
  history.back();
  loadResults("FLIGHT_RESULTS_RECEIVED");
}

function loadResults(event) {
  let isOriginalUI = false;
  let isRedesignUI = false;
  const intervalId = setInterval(async function () {
    let originalUIloading = document.querySelector(loadingSelector);
    let redesignUIloading = document.querySelector(".uitk-loading-bar");

    if (originalUIloading) {
      isOriginalUI = true;
    } else if (redesignUIloading) {
      isRedesignUI = true;
    } else if (document.body.textContent.includes("Sorry")) {
      chrome.runtime.sendMessage({
        event: "NO_FLIGHTS_FOUND",
        provider: "expedia",
      });
    }

    if (!(originalUIloading || redesignUIloading)) {
      clearInterval(intervalId);
      if (isRedesignUI) {
        const flights = await scrapeRedesignUI();
        chrome.runtime.sendMessage({
          event,
          flights,
          provider: "expedia",
        });
      } else {
        parseResults(event);
      }
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
  button.addEventListener("click", () => {
    chrome.runtime.sendMessage({
      event: "FOCUS_WEBPAGE",
    });
  });
  document.body.append(button);
}

function highlightItin(selectedDepartureId, selectedReturnId, flightContainer) {
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
function parseResults(event) {
  if (document.querySelector(".no-flights-found-error")) {
    chrome.runtime.sendMessage({
      event: "NO_FLIGHTS_FOUND",
      provider: "expedia",
    });
    return;
  }

  let moreItins = Array.from(
    document.querySelectorAll(`${flightContainer}:not([data-visited='true'])`)
  );

  const flights = parser(moreItins);

  chrome.runtime.sendMessage({
    event,
    flights,
    provider: "expedia",
  });
}

function findMatchingDOMNode(list, target) {
  return list.find((item) => item.dataset.id === target);
}

function parser(itinNodes) {
  return itinNodes
    .map((node) => {
      node.dataset.visited = "true";

      if (node.dataset.isClickToPrice === "clickToPrice") {
        // some mystery flight, sponsored ad
        return null;
      }
      let fare;
      try {
        fare = node.querySelector(fareSelector.fare).textContent.trim();
        fare = Number(fare.match(/\d+/g).join(""));
      } catch (e) {
        // one of those itins that say for example "See Southwest for prices"
        return null;
      }

      const flight = queryLeg(node, SELECTORS);

      if (!flight) {
        return null;
      }

      if (selectedDeparture) {
        // roundtrip
        node.dataset.id = [
          selectedDeparture.id,
          flight.fromTime,
          flight.toTime,
          flight.marketingAirline,
        ].join("-"); // will use this id attribute to find the itin the user selected

        return {
          departureFlight: selectedDeparture,
          returnFlight: flight,
          fare: selectedItin.fareNumber + fare,
        };
      } else {
        // either departures of roundtrip or oneway
        node.dataset.id = [
          flight.fromTime,
          flight.toTime,
          flight.marketingAirline,
        ].join("-"); // will use this id attribute to find the itin the user selected

        return {
          departureFlight: flight,
          returnFlight: null,
          fare,
        };
      }
    })
    .filter((itin) => itin);
}

function getLayovers(legNode) {
  const layovers = [];
  const segmentsContainer = Array.from(
    legNode.querySelectorAll(flightDetails.segmentContainer)
  );
  for (let i = 0; i < segmentsContainer.length; i++) {
    const segmentContainer = segmentsContainer[i];
    // Handle case when Expedia layover runs overnight (not marked overnight in UI)
    const layover = queryLeg(segmentContainer, layoverSelectors);
    if (
      i > 0 &&
      layover.fromTime.includes("am") &&
      layovers[layovers.length - 1].toTime.includes("pm")
    ) {
      layover.fromTime += "+1";
    }
    layovers.push(layover);
  }
  return layovers;
}

function queryLeg(containerNode, selectors) {
  const data = {};
  let additionalDays;

  Object.entries(selectors).forEach(([key, selector]) => {
    try {
      const node = containerNode.querySelector(selector);
      if (key === "operatingAirline") {
        if (node) {
          if (node.dataset.testAirlineName) {
            data.operatingAirline = node.dataset.testAirlineName;
          } else {
            const airlines = node.textContent.trim().split(/\d+/);
            if (
              airlines.length > 1 &&
              airlines[airlines.length - 1].includes("operated by")
            ) {
              data.operatingAirline = airlines[airlines.length - 1].replace(
                "operated by",
                ""
              );
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
      } else if (key === "toTimeAddDays") {
        if (node) {
          additionalDays = node.textContent.trim();
        }
      } else if (key === "layoverToTimeAddDays") {
        if (node) {
          additionalDays = "+1";
        }
      } else if (["fromTime", "toTime"].includes(key)) {
        data[key] = Helpers.standardizeTimeString(node.textContent);
      } else {
        data[key] = node.textContent.trim();
      }
    } catch (e) {
      if (errors[e.name]) {
        return;
      }
      chrome.runtime.sendMessage({
        event: "FAILED_SCRAPER",
        source: "expedia",
        description: `${e.name} ${e.message}`,
      });
      errors[e.name] = true;
    }
  });
  if (additionalDays) {
    data.toTime += additionalDays;
  }
  return data;
}
// so far redesign variant only for oneway flights
const UI_REDESIGN_SELECTORS = {
  flightContainer: "[data-test-id='offer-listing']",
  marketingAirline: "[data-test-id='flight-operated']",
  operatingAirline: "[data-test-id='operated-by']",
  fare: "footer section span",
  clickToOpenModal: "[data-test-id='select-link']",
  modalViewContainerDesktop:
    "[data-test-id='listing-details-and-fares']:not(:empty)",
  modalViewContainerMobile: ".uitk-dialog-content",
  openModalViewLegsContainer: "[data-test-id='show-details-link'] button",
  modalViewLegsContainer: "[data-test-id='flight-details']", // then grab children
  modalViewSummaryContainer: "[data-test-id='flight-summary']",
  closeModalViewButton: "button[data-icon='tool-close']",
};
function pause() {
  return new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
}
async function scrapeRedesignUI() {
  const flightElements = Array.from(
    document.querySelectorAll(UI_REDESIGN_SELECTORS.flightContainer)
  );
  const flights = [];
  for (let i = 0; i < flightElements.length; i++) {
    const flightEl = flightElements[i];
    try {
      const flight = {};

      flight.marketingAirline = flightEl.querySelector(
        UI_REDESIGN_SELECTORS.marketingAirline
      ).textContent;
      const operatingAirline = flightEl.querySelector(
        UI_REDESIGN_SELECTORS.operatingAirline
      );
      if (operatingAirline) {
        [_, flight.operatingAirline] = operatingAirline.textContent.split(
          "operated by "
        );
      }
      // open modal
      flightEl.querySelector(UI_REDESIGN_SELECTORS.clickToOpenModal).click();
      await pause();
      // find open modal
      let modal = document.querySelector(
        UI_REDESIGN_SELECTORS.modalViewContainerDesktop
      );
      if (!modal) {
        modal = document.querySelector(
          UI_REDESIGN_SELECTORS.modalViewContainerMobile
        );
      }
      const summary = modal.querySelector(
        UI_REDESIGN_SELECTORS.modalViewSummaryContainer
      );
      const [times, duration] = Array.from(
        summary.querySelectorAll("span:not(.is-visually-hidden)")
      ).map((el) => el.textContent);
      [flight.fromTime, flight.toTime] = times.split(" - ");
      flight.fromTime = Helpers.standardizeTimeString(flight.fromTime);
      flight.toTime = Helpers.standardizeTimeString(flight.toTime);

      let toTimeAddDays = summary.textContent.match(/(\+\d)/);
      if (toTimeAddDays) {
        flight.toTime += toTimeAddDays[0];
      }

      [flight.duration] = duration.split("(");
      const hasStops = !duration.includes("Nonstop");

      // click to show leg details
      modal
        .querySelector(UI_REDESIGN_SELECTORS.openModalViewLegsContainer)
        .click();
      // find now rendered leg container
      const legs = modal.querySelector(
        UI_REDESIGN_SELECTORS.modalViewLegsContainer
      ).children;

      const stops = [];

      if (hasStops) {
        for (let i = 0; i < legs.length; i++) {
          const [departure, details, arrival] = legs[i].children;
          let departureText = departure.textContent;
          let fromTime = departureText.split(" - ")[0].toLowerCase().replace('departure', '');
          let from = departureText.slice(
            departureText.indexOf("(") + 1,
            departureText.indexOf(")")
          );
          let duration = details.children[0].textContent.replace("flight", "");
          // for operating might have to find index of first digit, then consider string before it if extra string after flight num
          let operatingAirline = details.children[1].textContent
            .match(/[A-z]*/g)
            .join(" ")
            .trim();
          let arrivalText = arrival.textContent;
          let toTime = arrivalText.split(" - ")[0].toLowerCase().replace('arrival', '');
          if (
            i > 0 &&
            stops[stops.length - 1].toTime.includes("pm") &&
            toTime.includes("am")
          ) {
            // layover went to the next day
            toTime += "+1";
          } else if (
            fromTime.toLowerCase().includes("pm") &&
            toTime.toLowerCase().includes("am")
          ) {
            // overnight flight
            toTime += "+1";
          }
          let to = arrivalText.slice(
            arrivalText.indexOf("(") + 1,
            arrivalText.indexOf(")")
          );
          stops.push({
            fromTime: Helpers.standardizeTimeString(fromTime),
            toTime: Helpers.standardizeTimeString(toTime),
            from,
            to,
            operatingAirline,
            duration,
          });
        }
      }
      flight.layovers = stops;

      let departureFlight = null;
      let returnFlight = null;
      let fare = null;

      if (selectedDeparture) {
        // roundtrip
        flightEl.dataset.id = [
          selectedDeparture.id,
          flight.fromTime,
          flight.toTime,
          flight.marketingAirline,
        ].join("-"); // will use this id attribute to find the itin the user selected

        departureFlight = selectedDeparture;
        returnFlight = flight;
        fare = selectedItin.fareNumber + fare;
      } else {
        // departure selection on roundtrip or oneway
        flightEl.dataset.id = [
          flight.fromTime,
          flight.toTime,
          flight.marketingAirline,
        ].join("-"); // will use this id attribute to find the itin the user selected

        departureFlight = flight;
        fare = modal.querySelector(UI_REDESIGN_SELECTORS.fare).textContent;
      }

      flights.push({
        departureFlight,
        returnFlight,
        fare,
      });
      // close modal
      modal.querySelector("[data-icon='tool-close']").click();
    } catch (e) {
      console.log(e);
      // must be an ad row
    }
  }
  return flights;
}
const UI_ORIGINAL_SELECTORS = {
  flightContainer: ".flight-module.segment.offer-listing",
  loadingSelector: "#skeleton-listing",
};
const flightContainer = ".flight-module.segment.offer-listing";
const loadingSelector = "#skeleton-listing";
const SELECTORS = {
  fromTime: "[data-test-id='departure-time']",
  toTime: "[data-test-id='arrival-time']",
  toTimeAddDays: "[data-test-id='arrives-next-day']",
  duration: "[data-test-id='duration']",
  layovers: "[data-test-num-stops='0']", //nonstop
  marketingAirlines: "[data-test-id='airline-name'",
  operatingAirline: "[data-test-id='operated-by']",
};
const fareSelector = {
  fare: "[data-test-id='listing-price-dollars']",
};
const flightDetails = {
  clickToOpenDetails: "[data-test-id='flight-details-link'",
  detailsContainer: ".details-wrapper",
  segmentContainer: ".segment-info",
};
const layoverSelectors = {
  fromTime: "[data-test-id='details-departure-time'",
  toTime: "[data-test-id='details-arrival-time'",
  layoverToTimeAddDays: "[data-test-id='details-overnight']",
  duration: "[data-test-id='details-duration-time']",
  from: "[data-test-id='details-departure-localName']",
  to: "[data-test-id='details-arrival-localName']",
  operatingAirline: "[data-test-id='details-airline-data']",
};
