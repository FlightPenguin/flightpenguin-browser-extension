// console.log and debugger work here, open dev tools on web page (how you normally would) to see them
console.clear();
console.log("hello...");

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  // parse page to get flights, then send background to process and display on new web page.
  console.info("Received message ", message.event);
  switch (message.event) {
    case "BEGIN_PARSING":
      if (window.location.origin.includes("priceline")) {
        const pricelineFlights = pricelineParser();
        chrome.runtime.sendMessage({
          event: "FLIGHT_RESULTS_RECEIVED",
          flights: pricelineFlights
        });
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
      // TODO
      break;
    default:
      break;
  }
});

function southwestParser() {
  const [departures, returns] = document.querySelectorAll(
    ".transition-content.price-matrix--details-area ul"
  );
  const selectors = {
    fromTime: ".air-operations-time-status[type='origination']",
    toTime: ".air-operations-time-status[type='destination']",
    fare: ".fare-button_primary-yellow",
    duration: ".flight-stops--duration-time",
    layovers: ".flight-stops-badge"
  };
  // If we want to go down the regex path (unfinished)...
  // const pattern = /(?<dep>.{5}(PM|AM)).+(?<arr>.{5}(PM|AM)).+(?<duration>Duration\d+h\s\d+m).+(?<stops>\d+h\s\d+m).+(?<price>\$\d+)/;
  // pat = /(?<dep>.{5}(PM|AM)).+(?<arr>.{5}(PM|AM)).+(?<stops>\d+h\s\d+m).+(?<price>\$\d+)/;

  const departureList = parseText(departures.children, selectors);
  const returnList = parseText(returns.children, selectors);

  return { departureList, returnList };
}
function pricelineParser() {
  const [departures, returns] = document.querySelectorAll("");
  const selectors = {
    fromTime: "",
    toTime: "",
    fare: "",
    duration: "",
    layovers: ""
  };

  const departureList = parseText(departures.children, selectors);
  const returnList = parseText(returns.children, selectors);

  return { departureList, returnList };
}

function parseText(htmlCollection, selectors) {
  return Array.from(htmlCollection).map(departure => {
    const data = {};
    Object.entries(selectors).forEach(([key, selector]) => {
      try {
        data[key] = departure.querySelector(selector).textContent;
      } catch (e) {
        console.info("Error parsing ", key, e);
      }
    });
    return data;
  });
}
