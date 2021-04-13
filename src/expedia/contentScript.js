Sentry.init({
  dsn:
    "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451",
});
import AirlineMap from "../shared/nameMaps/airlineMap.js";
import {standardizeTimeString} from "../shared/helpers.js";
import { isOvernight } from "../utilityFunctions.js";

const errors = {};
let selectedDeparture;
let isHighlightingItin;

chrome.runtime.onMessage.addListener(async function (message) {
  // parse page to get flights, then send background to process and display on new web page.
  console.log("Received message ", message);
  switch (message.event) {
    case "BEGIN_PARSING":
      loadResults(scrapeRedesignUI, sendDepartures);
      break;
    case "GET_RETURN_FLIGHTS":
      selectedDeparture = message.departure;
      await getReturnFlights(message.departure.id);

      break;
    case "HIGHLIGHT_FLIGHT":
      isHighlightingItin = true;
      const { selectedDepartureId, selectedReturnId } = message;

      try {
        highlightItin(
          selectedDepartureId,
          selectedReturnId,
          UI_REDESIGN_SELECTORS.flightContainer
        );
      } catch (e) {
        highlightItin(
          selectedDepartureId,
          selectedReturnId,
          UI_ORIGINAL_SELECTORS.flightContainer
        );
      }
      addBackToSearchButton(selectedReturnId);
      break;
    case "CLEAR_SELECTION":
      isHighlightingItin = false;
      selectedDeparture = null;
      history.back();
      await pauseLonger();
      await loadResults(setIdDataset);
      chrome.runtime.sendMessage({event: "EXPEDIA_READY"})
      break;
    default:
      break;
  }
});

async function loadResults(callback, sendEvent = null, tries = 10) {
  try {
    if (tries < 1) {
      if (document.querySelector("[data-test-id='loading-animation']")) {
        await loadResults(callback, sendEvent);
      }
      Sentry.captureException(errors.lastError, {extra: {callback, sendEvent}});

      chrome.runtime.sendMessage({
        event: "NO_FLIGHTS_FOUND",
        provider: "expedia",
      });
      return;
    }
    let flights = await callback();

    if (sendEvent) {
      sendEvent(flights);
    }
    const showMoreButton = document.querySelector("[name='showMoreButton']");
    if (showMoreButton) {
      showMoreButton.click();
      await pauseLonger();
      flights = await callback();
      if (flights && !flights.length) {
        // try one more time
        await pauseLonger();
        flights = await callback();
      }
      if (sendEvent) {
        sendEvent(flights);
      }
    }
  } catch (e) {
    errors.lastError = e;
    await pauseLonger();
    await loadResults(callback, sendEvent, --tries);
  }
}

function sendDepartures(flights) {
  chrome.runtime.sendMessage({
    event: "FLIGHT_RESULTS_RECEIVED",
    flights,
    provider: "expedia",
  });
}

function sendReturns(flights) {
  chrome.runtime.sendMessage({
    event: "RETURN_FLIGHTS_RECEIVED",
    flights,
    provider: "expedia",
  });
}

async function getReturnFlights(selectedDepartureId) {
  // click departure
  let departureNode = document.querySelector(
    `[data-id='${selectedDepartureId}']`
  );
  if (!departureNode) {
    // may have re-rendered because we are changing departure selection after viewing returns
    // re-render wipes dataset.id
    await loadResults(() => setIdDataset(selectedDepartureId));
    departureNode = document.querySelector(
      `[data-id='${selectedDepartureId}']`
    );
  }
  departureNode.querySelector("button").click();

  // new UI opens a panel with upgrade options
  // requires another click
  document.querySelector('[data-test-id="select-button"]').click();

  await pause();
  // parse returns
  try {
    await loadResults(scrapeRedesignUI, sendReturns);
  } catch (e) {
    console.log(e);
    chrome.runtime.sendMessage({
      event: "FAILED_SCRAPER",
      source: "expedia",
      description: `${e.name} ${e.message}`,
    });
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

function findMatchingDOMNode(list, target) {
  return list.find((item) => item.dataset.id === target);
}

function pause() {
  return new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
}
function pauseLonger() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}
function getFlightElements() {
  const flightElements = document.querySelector(UI_REDESIGN_SELECTORS.flightContainer);
  if (!flightElements) {
    return;
  }
  let isInitialCall = !flightElements.dataset.id;
  const selector = isInitialCall ? UI_REDESIGN_SELECTORS.flightContainer :
    UI_REDESIGN_SELECTORS.flightContainerSecondPass;
  return Array.from(
      document.querySelectorAll(selector)
  );
}
async function scrapeRedesignUI() {
  const flightElements = getFlightElements();

  if (!flightElements) {
    return Promise.reject();
  }
  if (flightElements.length === 0) {
    throw new Error("Empty results");
  }
  const flights = [];
  for (let i = 0; i < flightElements.length; i++) {
    if (isHighlightingItin) {
      return;
    }
    const flightEl = flightElements[i];
    try {
      const flight = {};

      let marketingAirline = flightEl.querySelector(
        UI_REDESIGN_SELECTORS.marketingAirline
      );
      let operatingAirline = flightEl.querySelector(
        UI_REDESIGN_SELECTORS.operatingAirline
      );

      if (marketingAirline.childNodes.length > 1) {
        // "Delta"
        // "• Delta 4164 operated by Skywest DBA Delta Connection"
        [marketingAirline, operatingAirline] = marketingAirline.childNodes;
      }
      flight.marketingAirline = AirlineMap.getAirlineName(marketingAirline.textContent);

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
      flight.fromTime = standardizeTimeString(flight.fromTime);
      flight.toTime = standardizeTimeString(flight.toTime);

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
          if (from.length !== 3) {
            // no airport, just listing the city
            from = departureText.split("-")[1];
          }
          let duration = details.children[0].textContent.replace("flight", "");
          // for operating might have to find index of first digit, then consider string before it if extra string after flight num
          let operatingAirline = details.children[1].textContent
            .match(/[A-z]*/g)
            .join(" ")
            .trim();
          let arrivalText = arrival.textContent;
          let toTime = arrivalText.split(" - ")[0].toLowerCase().replace('arrival', '');
          if (
            i > 0 && isOvernight(stops[stops.length - 1].toTime, fromTime)
          ) {
            // layover went to the next day
            fromTime += "+1";
          } else if (
            isOvernight(fromTime, toTime)
          ) {
            // overnight flight
            toTime += "+1";
          }
          let to = arrivalText.slice(
            arrivalText.indexOf("(") + 1,
            arrivalText.indexOf(")")
          );
          if (to.length !== 3) {
            // no airport, just listing the city
            to = arrivalText.split("-")[1];
          }
          stops.push({
            fromTime: standardizeTimeString(fromTime),
            toTime: standardizeTimeString(toTime),
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
        fare = flightEl.querySelector(UI_REDESIGN_SELECTORS.listFare).textContent;
      } else {
        // departure selection on roundtrip or oneway
        flightEl.dataset.id = [
          flight.fromTime,
          flight.toTime,
          flight.marketingAirline,
        ].join("-"); // will use this id attribute to find the itin the user selected

        departureFlight = flight;
        fare = modal.querySelector(UI_REDESIGN_SELECTORS.modalFare).textContent;
      }

      flights.push({
        departureFlight,
        returnFlight,
        fare,
      });
      // close modal
      modal.querySelector(UI_REDESIGN_SELECTORS.closeModalViewButton).click();
    } catch (e) {
      console.log(e);
      // must be an ad row
    }
  }
  return flights;
}
function setIdDataset(selectedDepartureId = "") {
  const legNodes = getFlightElements();

  for (let legNode of legNodes) {
    let [fromTime, toTime] = legNode.querySelector(
      "[data-test-id='departure-time']"
    ).textContent.split(" - ");
    const arrivesNextDay = legNode.querySelector("[data-test-id='arrives-next-day']");
    if (arrivesNextDay) {
      toTime = toTime + arrivesNextDay.textContent.trim();
    }

    let marketingAirline = legNode.querySelector(
      UI_REDESIGN_SELECTORS.marketingAirline
    ).textContent;
    marketingAirline = AirlineMap.getAirlineName(marketingAirline);

    const idValues = [];
    if (selectedDepartureId) {
      idValues.push(selectedDepartureId);
    }
    idValues.push(
      standardizeTimeString(fromTime),
      standardizeTimeString(toTime),
      marketingAirline.trim()
    )
    const id = idValues.join("-");
    legNode.dataset.id = id;
    if (selectedDepartureId === id) {
      return;
    }
  }
}
// so far redesign variant only for oneway flights
const UI_REDESIGN_SELECTORS = {
  flightContainer: "[data-test-id='offer-listing']",
  flightContainerSecondPass: "[data-test-id='offer-listing']:not([data-id])",
  marketingAirline: "[data-test-id='flight-operated']",
  operatingAirline: "[data-test-id='operated-by']",
  modalFare: "[data-test-id='fare-types-carousel'] .uitk-lockup-price",
  listFare: ".uitk-price-subtext",
  clickToOpenModal: "[data-test-id='select-link']",
  modalViewContainerDesktop:
    "[data-test-id='listing-details-and-fares']:not(:empty)",
  modalViewContainerMobile: ".uitk-dialog-content",
  openModalViewLegsContainer: "[data-test-id='show-details-link'] button",
  modalViewLegsContainer: "[data-test-id='flight-details']", // then grab children
  modalViewSummaryContainer: "[data-test-id='flight-summary']",
  closeModalViewButton: "button[data-icon='tool-close']",
};
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
  marketingAirline: "[data-test-id='airline-name'",
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
