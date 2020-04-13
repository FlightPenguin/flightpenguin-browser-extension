// console.log and debugger work here, open dev tools on web page (how you normally would) to see them
console.clear();
console.log("hello...");

let rafID = 0;
let intervalID = 0;
let allItins = [];
let firstParse = true;

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
      obs.observe(document.querySelector("[class^='BpkSpinner_bpk-spinner']"));
      break;
    case "HIGHLIGHT_FLIGHT":
      const { selectedDepartureId, selectedReturnId } = message;
      // use IntersectionObserver again, observe #details-modal
      highlightItin(selectedDepartureId, selectedReturnId);
      break;
    default:
      break;
  }
});

function highlightItin(depId, retId) {
  window.cancelAnimationFrame(rafID);
  // reset prior selection
  const prevSelection = document.querySelector(
    ".BpkTicket_bpk-ticket__Brlno[data-selected='true']"
  );
  if (prevSelection) {
    prevSelection.dataset.selected = "false";
    prevSelection.style.border = "";
  }
  const itinNode = findMatchingDOMNode(
    Array.from(document.querySelectorAll(".BpkTicket_bpk-ticket__Brlno")),
    `${depId}-${retId}`
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
    if (allItins.length >= 10) {
      stopParsing();

      return;
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
    fromTime: "[class^='LegInfo_routePartialDepart']",
    toTime: "[class^='LegInfo_routePartialArrive']",
    duration: "[class^='LegInfo_stopsContainer']",
    layovers: "[class^='LegInfo_stopsLabelContainer']",
  };
  const fareSelector = {
    fare: "[class^='Price_mainPriceContainer']",
  };
  const airlineSelector = {
    airline: "[class^='LogoImage_container']",
  };
  const itins = itinNodes.map((node) => {
    node.dataset.visited = "true";

    const fare = node.querySelector(fareSelector.fare).textContent.trim();
    const [departureNode, returnNode] = node.querySelector(
      "[class^='TicketBody_legsContainer']"
    ).children;

    const [departureFlight, returnFlight] = queryDOM(
      [departureNode, returnNode], // third child is text about government approval
      selectors
    );
    const airlines = node
      .querySelector(airlineSelector.airline)
      .textContent.split("+")
      .map((airline) => airline.trim());
    // this isn't right
    departureFlight.airline = airlines[0];
    if (airlines.length === 1) {
      returnFlight.airline = airlines[0];
    } else {
      returnFlight.airline = airlines[1];
    }

    node.dataset.id = [
      departureFlight.fromTime,
      departureFlight.toTime,
      departureFlight.airline,
      returnFlight.fromTime,
      returnFlight.toTime,
      returnFlight.airline,
    ].join("-"); // will use this id attribute to find the itin the user selected

    return {
      departureFlight,
      returnFlight,
      fare: fare.replace("$", ""),
      currency: "$", // no currency node
    };
  });

  return itins;
}

function queryDOM(htmlCollection, selectors) {
  return Array.from(htmlCollection).map((containerNode, itinIdx) => {
    const data = {};
    Object.entries(selectors).forEach(([key, selector]) => {
      try {
        const node = containerNode.querySelector(selector).children[0];

        if (key === "layovers") {
          if (!node.textContent.toLowerCase().includes("non")) {
            containerNode.click();

            const modalNode = document.querySelector("#details-modal");
            const itinNode = modalNode.querySelectorAll(
              "[class^='Itinerary_leg']"
            )[itinIdx];

            const stopsNode = itinNode.querySelector(
              "[class^='LegInfo_stopsLabelContainer']"
            );

            if (!stopsNode.textContent.toLowerCase().includes("non")) {
              stopsNode.click();
              const layoversNode = itinNode.querySelector(
                "[class^='LegSegmentSummary_container']"
              );
              const airlines = Array.from(
                layoversNode.querySelectorAll(
                  "[class^='LogoImage_container'] span:first-of-type"
                )
              );
              const segments = Array.from(
                layoversNode.querySelectorAll(
                  "[class^='LegSegmentDetails_container']"
                )
              );
              const layovers = [];
              for (let i = 0; i < airlines.length; i++) {
                const [fromTime, toTime] = segments[i].querySelectorAll(
                  "[class^='Times_segmentTimes'] > div"
                );
                let [from, to] = segments[i].querySelectorAll(
                  "[class^='Routes_routes'] > span"
                );
                from = from.textContent.split(" ")[0];
                to = to.textContent.split(" ")[0];
                layovers.push({
                  airline: airlines[i].textContent,
                  from,
                  fromTime: fromTime.textContent,
                  to,
                  toTime: toTime.textContent,
                });
              }
              data.layovers = layovers;
            }
          }
        } else {
          data[key] = node.textContent.trim();
        }
      } catch (e) {
        console.info("Error parsing ", key, e);
      }
    });
    return data;
  });
}
