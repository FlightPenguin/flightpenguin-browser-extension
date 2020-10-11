Sentry.init({
  dsn:
    "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451",
});

let rafID = 0;
let allItins = [];
let southwestFlights;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // parse page to get flights, then send background to process and display on new web page.
  console.info("Received message ", message.event);
  switch (message.event) {
    case "STOP_PARSING":
      window.cancelAnimationFrame(rafID);
      break;
    case "BEGIN_PARSING":
      const id = window.setInterval(() => {
        southwestFlights = JSON.parse(
          window.sessionStorage.getItem(
            "AirBookingSearchResultsSearchStore-searchResults-v1"
          )
        );
        if (southwestFlights && southwestFlights.searchResults) {
          sendFlightsToBackground(southwestFlights);
          window.clearInterval(id);
        }
      }, 500);
      break;
    case "HIGHLIGHT_FLIGHT":
      const { selectedDepartureId, selectedReturnId } = message;
      southwestParser();
      highlightSouthwestItin(selectedDepartureId, selectedReturnId);
      addBackToSearchButton();
      break;
    default:
      break;
  }
});

function sendFlightsToBackground(southwestFlights) {
  if (!southwestFlights) {
    return;
  }
  let [departures, returns] = southwestFlights.searchResults.airProducts;
  if (
    (departures && !departures.details.length) ||
    (returns && !returns.details.length)
  ) {
    // no complete itins
    chrome.runtime.sendMessage({
      event: "FLIGHT_RESULTS_RECEIVED",
      flights: [],
      provider: "southwest",
    });
    return;
  }
  departures = departures.details;
  returns = returns ? returns.details : [];
  const itins = createSouthwestItins(departures, returns);
  chrome.runtime.sendMessage({
    event: "FLIGHT_RESULTS_RECEIVED",
    flights: itins,
    provider: "southwest",
  });
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

function highlightSouthwestItin(selectedDepartureId, selectedReturnId) {
  window.cancelAnimationFrame(rafID);
  const [departureList, returnList] = document.querySelectorAll(
    ".transition-content.price-matrix--details-area ul"
  );
  // reset prior selections
  const prevDepSelection = departureList.querySelector(
    "[data-selected='true']"
  );
  if (prevDepSelection) {
    prevDepSelection.dataset.selected = "false";
    prevDepSelection.style.border = "";
  }
  // highlight selections
  const dep = findMatchingDOMNode(
    Array.from(departureList.children),
    selectedDepartureId
  );
  dep.style.border = "10px solid tomato";
  dep.dataset.selected = "true";

  if (selectedReturnId) {
    const prevRetSelection = returnList.querySelector("[data-selected='true']");
    if (prevRetSelection) {
      prevRetSelection.dataset.selected = "false";
      prevRetSelection.style.border = "";
    }
    const ret = findMatchingDOMNode(
      Array.from(returnList.children),
      selectedReturnId
    );
    ret.style.border = "10px solid tomato";
    ret.dataset.selected = "true";
  }

  const yPosition =
    window.pageYOffset +
    dep.getBoundingClientRect().top -
    window.innerHeight / 2;
  window.scroll(0, yPosition);
}

function findMatchingDOMNode(list, target) {
  return list.find((item) => item.dataset.id === target);
}

function loadSouthwestResults() {
  let newY = window.innerHeight;
  let lastTime = 0;

  rafID = window.requestAnimationFrame(parseMoreSouthwest);

  function parseMoreSouthwest(currentTime) {
    if (allItins.length >= 20) {
      // arbitrary number
      window.cancelAnimationFrame(rafID);
      return;
    }
    // every 5 seconds scroll to next viewPort
    const timeToScroll = Math.max(0, 5000 - (currentTime - lastTime));
    if (timeToScroll === 0) {
      window.scroll(0, newY);

      const flights = southwestParser();
      if (flights.length) {
        // just running this function to make and set dataset.id
        // chrome.runtime.sendMessage({
        //   event: "FLIGHT_RESULTS_RECEIVED",
        //   flights,
        // });
      } else {
        window.cancelAnimationFrame(rafID);
      }
      allItins = allItins.concat(flights);
      newY = window.scrollY + window.innerHeight;
      lastTime = currentTime;
    }

    rafID = window.requestAnimationFrame(parseMoreSouthwest);
  }
}

/**
 * Parse DOM and set id.
 * The id will be used to find the flight to highlight.
 */
function southwestParser() {
  const selectors = {
    fromTime: ".air-operations-time-status[type='origination'] .time--value",
    toTime: ".air-operations-time-status[type='destination'] .time--value",
    // fare: ".fare-button_primary-yellow [aria-hidden='true'] span:last-child",
    // currency:
    //   ".fare-button_primary-yellow [aria-hidden='true'] .currency--symbol",
    // duration: ".select-detail--flight-duration",
    // layovers: ".flight-stops--items",
  };
  const [departures, returns] = document.querySelectorAll(
    ".transition-content.price-matrix--details-area ul"
  );
  const depNodes = departures.querySelectorAll("li:not([data-visited='true']");
  let flights = [];
  if (returns) {
    const retNodes = returns.querySelectorAll("li:not([data-visited='true']");
    flights = flights.concat(querySouthwestDOM(retNodes, selectors));
  }

  // If we want to go down the regex path (unfinished)...
  // const pattern = /(?<dep>.{5}(PM|AM)).+(?<arr>.{5}(PM|AM)).+(?<duration>Duration\d+h\s\d+m).+(?<stops>\d+h\s\d+m).+(?<price>\$\d+)/;
  // pat = /(?<dep>.{5}(PM|AM)).+(?<arr>.{5}(PM|AM)).+(?<stops>\d+h\s\d+m).+(?<price>\$\d+)/;

  flights = flights.concat(querySouthwestDOM(depNodes, selectors));
  return flights;
}

function formatTimeTo12HourClock(time) {
  let [hours, minutes] = time.split(":");
  hours = Number(hours);
  const timeOfDay = hours >= 12 ? "PM" : "AM";

  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours -= 12;
  }
  return `${hours}:${minutes}${timeOfDay}`;
}

function convertDurationMinutesToString(duration) {
  const durationHours = Math.floor(duration / 60);
  const durationMinutes = duration % 60;
  return `${durationHours}h ${durationMinutes}m`;
}

function getIndividualSouthwestLegDetails(flight) {
  let layovers = [];
  if (flight.stopsDetails.length > 1) {
    layovers = flight.stopsDetails.map((stop) => {
      return {
        fromTime: Helpers.standardizeTimeString(
          formatTimeTo12HourClock(stop.departureTime)
        ),
        toTime: Helpers.standardizeTimeString(
          formatTimeTo12HourClock(stop.arrivalTime)
        ),
        operatingAirline: "Southwest",
        duration: convertDurationMinutesToString(stop.legDuration),
        from: stop.originationAirportCode,
        to: stop.destinationAirportCode,
      };
    });
  }
  const fare = flight.fareProducts.ADULT.WGA.fare.totalFare;
  if (!fare) {
    return null;
  }
  return {
    fromTime: Helpers.standardizeTimeString(
      formatTimeTo12HourClock(flight.departureTime)
    ),
    toTime: Helpers.standardizeTimeString(
      formatTimeTo12HourClock(flight.arrivalTime)
    ),
    marketingAirline: "Southwest",
    layovers,
    fare: Math.round(Number(fare.value)),
    currency: "$",
    duration: convertDurationMinutesToString(flight.totalDuration),
    from: flight.originationAirportCode,
    to: flight.destinationAirportCode,
  };
}

function createSouthwestItins(departureList, returnList) {
  const itins = [];
  if (returnList.length) {
    // roundtrip
    for (let departureItem of departureList) {
      const departureFlight = getIndividualSouthwestLegDetails(departureItem);
      if (!departureFlight) {
        // unavailable flight
        continue;
      }
      for (let returnItem of returnList) {
        const returnFlight = getIndividualSouthwestLegDetails(returnItem);
        if (!returnFlight) {
          // unavailable flight
          continue;
        }
        itins.push({
          departureFlight,
          returnFlight,
          fare: departureFlight.fare + returnFlight.fare,
          currency: departureFlight.currency,
        });
      }
    }
  } else {
    // oneway
    for (let departureItem of departureList) {
      const departureFlight = getIndividualSouthwestLegDetails(departureItem);
      if (!departureFlight) {
        // unavailable flight
        continue;
      }
      itins.push({
        departureFlight,
        fare: departureFlight.fare,
        currency: departureFlight.currency,
      });
    }
  }

  return itins;
}

function querySouthwestDOM(htmlCollection, selectors) {
  return Array.from(htmlCollection).map((containerNode) => {
    const data = {};
    Object.entries(selectors).forEach(([key, selector]) => {
      try {
        const node = containerNode.querySelector(selector);
        if (["fromTime", "toTime"].includes(key)) {
          const value = node.textContent.split(" ")[1]; // first part contains 'Departs'/'Arrives', alternatively can filter childNodes for nodeType === Node.TEXT_NODE
          data[key] = Helpers.standardizeTimeString(value);
        } else if (key === "layovers") {
          data[key] = Array.from(
            node.querySelectorAll(".flight-stops--item")
          ).map((n) => {
            const airport = n.textContent.substring(0, 3);
            const duration = n.textContent.split(".")[1];
            return { airport, duration };
          });
        } else {
          data[key] = node.textContent;
        }
      } catch (e) {
        console.info("Error parsing ", key, e);
      }
    });
    data.airline = "Southwest";
    containerNode.dataset.id = [data.fromTime, data.toTime, data.airline].join(
      "-"
    );
    return data;
  });
}
