// console.log and debugger work here, open dev tools on web page (how you normally would) to see them
console.clear();
console.log("hello...");

let rafID = 0;
let allItins = [];

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // parse page to get flights, then send background to process and display on new web page.
  console.info("Received message ", message.event);
  switch (message.event) {
    case "STOP_PARSING":
      window.cancelAnimationFrame(rafID);
      break;
    case "BEGIN_PARSING":
      loadResults();
      break;
    case "HIGHLIGHT_FLIGHT":
      const { selectedDepartureId, selectedReturnId } = message;
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
 * Priceline has "infinite scroll" results. So to get more results we need to scroll down the page.
 * Every time Priceline needs to fetch more results, our background picks up the API request and
 * calls this function again.
 */
function loadResults() {
  let newY = window.innerHeight;
  let lastTime = 0;
  const seeMoreFlightsButton = document.querySelector(
    "[class^='FlightsDayView_results__'] > div > button"
  );

  rafID = window.requestAnimationFrame(parseMorePriceline);

  function parseMorePriceline(currentTime) {
    if (allItins.length >= 20) {
      // arbitrary number
      window.cancelAnimationFrame(rafID);
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
        // itin.style.border = "10px solid tomato";
        itin.dataset.visited = true;
      });
      allItins = allItins.concat(moreItins);
      //   seeMoreFlightsButton.click();
      lastTime = currentTime;
    }

    rafID = window.requestAnimationFrame(parseMorePriceline);
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
    // if  "[class^='LegInfo_stopsContainer']".children[3].textContent.toLowerCase().includes('non')
  };
  const fareSelector = {
    fare: "[class^='Price_mainPriceContainer']",
  };
  const airlineSelector = {
    airline: "[class^='LogoImage_container']",
  };
  const itins = itinNodes.map((node) => {
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
    node.dataset.visited = "true";

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
  return Array.from(htmlCollection).map((containerNode) => {
    const data = {};
    Object.entries(selectors).forEach(([key, selector]) => {
      try {
        const node = containerNode.querySelector(selector).children[0];
        data[key] = node.textContent.trim();
      } catch (e) {
        console.info("Error parsing ", key, e);
      }
    });

    return data;
  });
}
