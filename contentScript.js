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
    fare: ".fare-button_primary-yellow [aria-hidden='true']",
    duration: ".flight-stops--duration-time",
    layovers: ".flight-stops-badge"
  };
  // If we want to go down the regex path (unfinished)...
  // const pattern = /(?<dep>.{5}(PM|AM)).+(?<arr>.{5}(PM|AM)).+(?<duration>Duration\d+h\s\d+m).+(?<stops>\d+h\s\d+m).+(?<price>\$\d+)/;
  // pat = /(?<dep>.{5}(PM|AM)).+(?<arr>.{5}(PM|AM)).+(?<stops>\d+h\s\d+m).+(?<price>\$\d+)/;

  const departureList = parseText(departures.children, selectors, {
    airline: "Southwest"
  });
  const returnList = parseText(returns.children, selectors, {
    airline: "Southwest"
  });

  return { departureList, returnList };
}
function pricelineParser(itinNodes) {
  // const [departures, returns] = document.querySelectorAll("");
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
  const departureList = [];
  const returnList = [];
  itinNodes.forEach(node => {
    const [departureFlight, returnFlight] = parseText(
      node.children[0].children,
      selectors
    );
    const price = parseText(node.children[1].children, fareSelector);
    const { currency, fare } = price[0];
    departureFlight.fare = `${currency}${fare}`;
    returnFlight.fare = `${currency}${fare}`;

    departureList.push(departureFlight);
    returnList.push(returnFlight);
  });
  return { departureList, returnList };
}

function parseText(htmlCollection, selectors, moreKeyValues = {}) {
  return Array.from(htmlCollection).map(departure => {
    let data = {};
    Object.entries(selectors).forEach(([key, selector]) => {
      try {
        data[key] = departure.querySelector(selector).textContent;
      } catch (e) {
        console.info("Error parsing ", key, e);
      }
    });
    const id = [data.fromTime, data.toTime, data.fare].join("-");
    departure.dataset.id = id;
    data = {
      id,
      ...data,
      ...moreKeyValues
    };

    return data;
  });
}
