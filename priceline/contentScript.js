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
      loadPricelineResults();
      break;
    case "HIGHLIGHT_FLIGHT":
      const { selectedDepartureId, selectedReturnId, provider } = message;
      highlightPricelineItin(selectedDepartureId, selectedReturnId);
      break;
    default:
      break;
  }
});

function highlightPricelineItin(depId, retId) {
  window.cancelAnimationFrame(rafID);
  // reset prior selection
  const prevSelection = document.querySelector(
    "[class^='Itinerary__MainZone'][data-selected='true']"
  );
  if (prevSelection) {
    prevSelection.dataset.selected = "false";
    prevSelection.style.border = "";
  }
  const itinNode = findMatchingDOMNode(
    Array.from(document.querySelectorAll("[class^='Itinerary__MainZone']")),
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
function loadPricelineResults() {
  let newY = window.innerHeight;
  let lastTime = 0;

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
          "[class^='Itinerary__MainZone']:not([data-visited='true']"
        )
      );
      if (moreItins.length) {
        const pricelineFlights = pricelineParser(moreItins);
        chrome.runtime.sendMessage({
          event: "FLIGHT_RESULTS_RECEIVED",
          flights: pricelineFlights,
        });
      }
      moreItins.forEach((itin) => {
        itin.dataset.visited = true;
      });
      allItins = allItins.concat(moreItins);
      newY = window.scrollY + window.innerHeight;
      lastTime = currentTime;
    }

    rafID = window.requestAnimationFrame(parseMorePriceline);
  }
}

function findMatchingDOMNode(list, target) {
  return list.find((item) => item.dataset.id === target);
}

function pricelineParser(itinNodes) {
  const selectors = {
    fromTime: ".departure time",
    toTime: ".arrival time",
    duration: "[class^='Slice__Duration'] time",
    airline: "[class^='AirlineTitle']",
  };
  const fareSelector = {
    fare: "[data-test='rounded-dollars']",
    currency: "[data-test='currency-symbol']",
  };
  const itins = itinNodes.map((node) => {
    const [itinNode, fareNode] = node.children;

    const [departureFlight, returnFlight] = queryPricelineDOM(
      [itinNode.children[0], itinNode.children[1]], // third child is text about government approval
      selectors
    );
    node.dataset.id = [
      departureFlight.fromTime,
      departureFlight.toTime,
      departureFlight.airline,
      returnFlight.fromTime,
      returnFlight.toTime,
      returnFlight.airline,
    ].join("-"); // will use this id attribute to find the itin the user selected
    node.dataset.visited = "true";
    // discarding (aka _) "per person" node below
    const [fareInfo, _] = queryPricelineDOM(fareNode.children, fareSelector);
    const { currency, fare } = fareInfo;

    return { departureFlight, returnFlight, currency, fare: Number(fare) };
  });

  return itins;
}

function queryPricelineDOM(htmlCollection, selectors) {
  return Array.from(htmlCollection).map((containerNode) => {
    const data = {};
    Object.entries(selectors).forEach(([key, selector]) => {
      try {
        const node = containerNode.querySelector(selector);
        if (["fromTime", "toTime"].includes(key)) {
          data[key] = node.textContent.replace("a", "AM").replace("p", "PM");
        } else {
          data[key] = node.textContent;
        }
      } catch (e) {
        console.info("Error parsing ", key, e);
      }
    });

    return data;
  });
}
