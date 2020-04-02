// console.log and debugger work here, open dev tools on web page (how you normally would) to see them
console.clear();
console.log("hello...");

let rafID = 0;
let allItins = [];

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  // parse page to get flights, then send background to process and display on new web page.
  console.info("Received message ", message.event);
  switch (message.event) {
    case "BEGIN_PARSING":
      if (window.location.origin.includes("priceline")) {
        loadPricelineResults();
      } else if (window.location.origin.includes("southwest")) {
        const southwestFlights = southwestParser();
        console.info("Sending parsed results to background ", southwestFlights);
        chrome.runtime.sendMessage({
          event: "FLIGHT_RESULTS_RECEIVED",
          flights: southwestFlights
        });
      }
      break;
    case "HIGHLIGHT_FLIGHT":
      const { selectedDepartureId, selectedReturnId } = message;
      findSouthwestNodes(selectedDepartureId, selectedReturnId);
      break;
    default:
      break;
  }
});

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
          flights: pricelineFlights
        });
      }
      moreItins.forEach(itin => {
        // itin.style.border = "10px solid tomato";
        itin.dataset.visited = true;
      });
      allItins = allItins.concat(moreItins);
      newY = window.scrollY + window.innerHeight;
      lastTime = currentTime;
    }

    rafID = window.requestAnimationFrame(parseMorePriceline);
  }
}

function findSouthwestNodes(selectedDepartureId, selectedReturnId) {
  const [departureList, returnList] = document.querySelectorAll(
    ".transition-content.price-matrix--details-area ul"
  );

  const dep = findMatch(
    Array.from(departureList.children),
    selectedDepartureId
  );
  const ret = findMatch(Array.from(returnList.children), selectedReturnId);
  dep.style.border = "10px solid tomato";
  ret.style.border = "10px solid tomato";
}

function findMatch(list, target) {
  return list.find(item => item.dataset.id === target);
}

function southwestParser() {
  const [departures, returns] = document.querySelectorAll(
    ".transition-content.price-matrix--details-area ul"
  );
  const selectors = {
    fromTime: ".air-operations-time-status[type='origination'] .time--value",
    toTime: ".air-operations-time-status[type='destination'] .time--value",
    fare: ".fare-button_primary-yellow [aria-hidden='true'] span:last-child",
    currency:
      ".fare-button_primary-yellow [aria-hidden='true'] .currency--symbol",
    duration: ".flight-stops--duration-time",
    layovers: ".flight-stops-badge"
  };
  // If we want to go down the regex path (unfinished)...
  // const pattern = /(?<dep>.{5}(PM|AM)).+(?<arr>.{5}(PM|AM)).+(?<duration>Duration\d+h\s\d+m).+(?<stops>\d+h\s\d+m).+(?<price>\$\d+)/;
  // pat = /(?<dep>.{5}(PM|AM)).+(?<arr>.{5}(PM|AM)).+(?<stops>\d+h\s\d+m).+(?<price>\$\d+)/;

  const departureList = querySouthwestDOM(departures.children, selectors);
  const returnList = querySouthwestDOM(returns.children, selectors);

  const itins = [];
  for (let i = 0; i < departureList.length; i++) {
    for (let j = 0; j < returnList.length; j++) {
      itins.push({
        departureFlight: departureList[i],
        returnFlight: returnList[j],
        fare: Number(departureList[i].fare) + Number(returnList[j].fare),
        currency: departureList[i].currency,
        airline: "Southwest"
      });
    }
  }

  return itins;
}
function pricelineParser(itinNodes) {
  const selectors = {
    fromTime: ".departure time",
    toTime: ".arrival time",
    duration: "[class^='Slice__Duration'] time",
    layovers: "[class^='Stops__StopsText']",
    airline: "[class^='AirlineTitle']"
  };
  const fareSelector = {
    fare: "[data-test='rounded-dollars']",
    currency: "[data-test='currency-symbol']"
  };
  const itins = itinNodes.map(node => {
    const [itinNode, fareNode] = node.children;

    const [departureFlight, returnFlight] = queryPricelineDOM(
      [itinNode.children[0], itinNode.children[1]], // third child is text about government approval
      selectors
    );
    node.dataset.id = [
      departureFlight.fromTime,
      departureFlight.toTime,
      returnFlight.fromTime,
      returnFlight.toTime
    ].join("-"); // will use this id attribute to find the itin the user selected
    // discarding (aka _) "per person" node below
    const [fareInfo, _] = queryPricelineDOM(fareNode.children, fareSelector);
    const { currency, fare } = fareInfo;

    return { departureFlight, returnFlight, currency, fare: Number(fare) };
  });

  return itins;
}

function queryPricelineDOM(htmlCollection, selectors) {
  return Array.from(htmlCollection).map(containerNode => {
    const data = {};
    Object.entries(selectors).forEach(([key, selector]) => {
      try {
        const node = containerNode.querySelector(selector);
        if (["fromTime", "toTime"].includes(key)) {
          data[key] = node.dateTime;
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

function querySouthwestDOM(htmlCollection, selectors) {
  return Array.from(htmlCollection).map(containerNode => {
    const data = {};
    Object.entries(selectors).forEach(([key, selector]) => {
      try {
        const node = containerNode.querySelector(selector);
        if (["fromTime", "toTime"].includes(key)) {
          data[key] = node.textContent.split(" ")[1]; // first part contains 'Departs'/'Arrives', alternatively can filter childNodes for nodeType === Node.TEXT_NODE
        } else {
          data[key] = node.textContent;
        }
      } catch (e) {
        console.info("Error parsing ", key, e);
      }
    });
    containerNode.dataset.id = [data.fromTime, data.toTime].join("-");

    return data;
  });
}
