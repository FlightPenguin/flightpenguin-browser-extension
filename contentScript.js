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
        loadSouthwestResults();
      }
      break;
    case "HIGHLIGHT_FLIGHT":
      const { selectedDepartureId, selectedReturnId, provider } = message;
      if (provider === "southwest") {
        findSouthwestNodes(selectedDepartureId, selectedReturnId);
      } else if (provider === "priceline") {
        highlightPricelineItin(selectedDepartureId, selectedReturnId);
      }
      break;
    default:
      break;
  }
});

function highlightPricelineItin(depId, retId) {
  window.cancelAnimationFrame(rafID);
  const itinNode = findMatchingDOMNode(
    Array.from(document.querySelectorAll("[class^='Itinerary__MainZone']")),
    `${depId}-${retId}`
  );
  itinNode.style.border = "10px solid tomato";
  window.scroll(0, window.pageYOffset + itinNode.getBoundingClientRect().top);
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

  const dep = findMatchingDOMNode(
    Array.from(departureList.children),
    selectedDepartureId
  );
  const ret = findMatchingDOMNode(
    Array.from(returnList.children),
    selectedReturnId
  );
  dep.style.border = "10px solid tomato";
  ret.style.border = "10px solid tomato";
}

function findMatchingDOMNode(list, target) {
  return list.find(item => item.dataset.id === target);
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
        chrome.runtime.sendMessage({
          event: "FLIGHT_RESULTS_RECEIVED",
          flights
        });
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
function southwestParser() {
  const [departures, returns] = document.querySelectorAll(
    ".transition-content.price-matrix--details-area ul"
  );
  const depNodes = departures.querySelectorAll("li:not([data-visited='true']");
  const retNodes = returns.querySelectorAll("li:not([data-visited='true']");

  if (!depNodes.length || !retNodes.length) {
    return;
  }
  // query for not visited nodes
  // if node is still loading don't mark as visited
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

  const departureList = querySouthwestDOM(depNodes, selectors);
  const returnList = querySouthwestDOM(retNodes, selectors);

  const itins = [];
  for (let i = 0; i < departureList.length; i++) {
    for (let j = 0; j < returnList.length; j++) {
      itins.push({
        departureFlight: departureList[i],
        returnFlight: returnList[j],
        fare: Number(departureList[i].fare) + Number(returnList[j].fare),
        currency: departureList[i].currency
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
      departureFlight.airline,
      returnFlight.fromTime,
      returnFlight.toTime,
      returnFlight.airline
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
    data.airline = "Southwest";
    containerNode.dataset.id = [data.fromTime, data.toTime, data.airline].join(
      "-"
    );
    return data;
  });
}
