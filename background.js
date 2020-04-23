// debugger and console logs can be seen by clicking background.js link for this extension under chrome://extensions,
// it will open a developer console for this extension and in addition to logs you can see the local storage
import { makeItins, diffDepartures, findReturnFlights } from "./dataModels.js";

chrome.runtime.onInstalled.addListener(function () {
  console.log("Is this thing on?");
});

let tabIds = {};
let windowIds = {};
let formData = {};
let webPageTabId;
let webPageWindowId;
let webPageTabIndex;

let allDepartures = {};
let allItins = {};
let departureSelected = false;
let canHighlightSkyscannerTab = false;
let messageQueue = [];

chrome.runtime.onMessage.addListener(function (message, sender, reply) {
  console.info(message.event, message);

  switch (message.event) {
    case "FORM_DATA_RECEIVED":
      formData = message.formData;
      openProviderSearchResults(message.formData);
      // clean up incase user is doing a different search
      closeWindows();
      tabIds = {};
      windowIds = {};
      allDepartures = {};
      allItins = {};
      departureSelected = false;
      messageQueue = [];
      canHighlightSkyscannerTab = false;
      if (webPageTabId) {
        chrome.tabs.sendMessage(webPageTabId, {
          event: "RESET_SEARCH",
          formData,
        });
      }
      break;
    case "FLIGHT_RESULTS_RECEIVED":
      if (departureSelected) {
        break;
      }
      let provider;
      if (sender.origin.includes("southwest")) {
        // save results with their tab index so we know where to move the user to when they make a flight selection
        provider = "southwest";
      } else if (sender.origin.includes("priceline")) {
        provider = "priceline";
      } else if (sender.origin.includes("skyscanner")) {
        provider = "skyscanner";
      }
      const { departures, itins } = makeItins(
        message.flights,
        provider,
        windowIds[provider],
        tabIds[provider]
      );
      allItins = { ...allItins, ...itins };

      const departuresToSend = diffDepartures(allDepartures, departures);

      allDepartures = { ...allDepartures, ...departures };

      sendFlightsToWebpage(departuresToSend, provider, itins);
      break;
    case "DEPARTURE_SELECTED":
      departureSelected = true;
      const departure = allDepartures[message.departureId];
      const returnList = findReturnFlights(departure, allItins);

      chrome.tabs.sendMessage(webPageTabId, {
        event: "RETURN_FLIGHTS",
        flights: { returnList },
      });
      break;
    case "HIGHLIGHT_TAB":
      const { selectedDepartureId, selectedReturnId } = message;
      const itin = allItins[`${selectedDepartureId}-${selectedReturnId}`];

      if (itin.provider === "skyscanner" && !canHighlightSkyscannerTab) {
        messageQueue = [itin];
      } else {
        highlightTab(itin);
      }
      break;
    case "SKYSCANNER_READY":
      canHighlightSkyscannerTab = true;
      if (messageQueue.length) {
        messageQueue.forEach((msg) => {
          highlightTab(msg);
        });
      }
      break;
    case "FOCUS_WEBPAGE":
      chrome.windows.update(webPageWindowId, { focused: true }, (win) => {
        chrome.tabs.highlight({
          tabs: [webPageTabIndex],
        });
      });
      break;
    default:
      console.error("Unhandled message ", message);
      break;
  }
});

function sendFlightsToWebpage(departuresToSend, provider, itins) {
  const nextMessage = {
    event: "FLIGHT_RESULTS_FOR_CLIENT",
    flights: {
      departureList: departuresToSend,
      itins,
    },
    tabId: tabIds[provider],
    formData,
  };
  if (!webPageTabId) {
    createNewWebPage(nextMessage);
  } else {
    // make sure webpage still exists
    chrome.tabs.get(webPageTabId, (tab) => {
      if (!tab) {
        createNewWebPage(nextMessage);
      } else {
        chrome.tabs.sendMessage(tab.id, nextMessage);
      }
    });
  }
}

function highlightTab(itin) {
  chrome.windows.update(windowIds[itin.provider], { focused: true }, (win) => {
    chrome.tabs.sendMessage(itin.tabId, {
      event: "HIGHLIGHT_FLIGHT",
      selectedDepartureId: itin.depFlight.id,
      selectedReturnId: itin.retFlight ? itin.retFlight.id : "",
      provider: itin.provider,
    });
    chrome.tabs.sendMessage(webPageTabId, {
      event: "RESET_SELECTIONS",
    });
  });
}
// clean up provider windows when webpage tab is closed
chrome.tabs.onRemoved.addListener(function (tabId) {
  if (tabId === webPageTabId) {
    closeWindows();
  }
});

function closeWindows() {
  Object.values(windowIds).forEach((windowId) => {
    chrome.windows.remove(windowId);
  });
}

function createNewWebPage(message) {
  chrome.tabs.create(
    { url: chrome.extension.getURL("./index.html") },
    (tab) => {
      window.setTimeout(() => {
        // need setTimeout here or else message will be missed by new tab.
        chrome.tabs.sendMessage(tab.id, message);
      }, 1000);
      webPageWindowId = tab.windowId;
      webPageTabId = tab.id;
      webPageTabIndex = tab.index;
    }
  );
}

// use chrome.webRequest API to listen for when flight results API has finished fetching
// then send message to content script to begin parsing results off DOM
chrome.webRequest.onCompleted.addListener(
  function (args) {
    console.log("web request complete ", args.url);
    let tabId;
    if (args.url.includes("priceline")) {
      tabId = tabIds["priceline"];
    } else if (args.url.includes("southwest")) {
      tabId = tabIds["southwest"];
    } else if (args.url.includes("skyscanner")) {
      tabId = tabIds["skyscanner"];
    }
    window.setTimeout(() => {
      // give provider page time to render
      // this has great potential to break for slow internet speeds
      chrome.tabs.sendMessage(tabId, { event: "BEGIN_PARSING" });
    }, 1000);
  },
  {
    urls: [
      "https://www.southwest.com/api/air-booking/v1/air-booking/page/air/booking/shopping*",
      "https://www.priceline.com/pws/v0/fly/graph/query*",
      "https://www.skyscanner.com/g/conductor/v1/fps3/search/*",
    ],
  }
);

function openProviderSearchResults(message) {
  /**
   * Open tabs to provider search results pages.
   * Keep track of opened tab ids to send messages to them.
   *
   * message schema:
    from: "sfo"
    to: "lax"
    southwest: false
    priceline: true
    cabin: "Economy"
    fromDate: "2020-03-24"
    toDate: "2020-03-25"
    numPax: 2
     */
  const { southwest, priceline, skyscanner } = message;
  const providers = [];
  if (southwest) {
    providers.push("southwest");
  }
  if (priceline) {
    providers.push("priceline");
  }
  if (skyscanner) {
    providers.push("skyscanner");
  }
  providers.forEach((provider) => {
    const url = providerURLBaseMap[provider](message);
    // Open url in a new window. Not a new tab because we can't read results from inactive tabs (browser powers down inactive tabs).
    chrome.windows.create({ url, focused: false }, (win) => {
      tabIds[provider] = win.tabs[0].id;
      windowIds[provider] = win.id;
    });
  });
}

const providerURLBaseMap = {
  priceline: pricelineTabURL,
  southwest: southwestTabURL,
  skyscanner: skyscannerTabURL,
};
const skyscanner_cabin_map = {
  econ: "economy",
  prem_econ: "premiumeconomy",
  business: "business",
  first: "first",
};
function skyscannerTabURL(formData) {
  const { from, to, fromDate, toDate, numPax, cabin, roundtrip } = formData;
  const startDate = fromDate.replace(/-/g, "").substring(2);
  let url = `https://www.skyscanner.com/transport/flights/${from}/${to}/${startDate}/`;

  if (roundtrip) {
    const endDate = toDate.replace(/-/g, "").substring(2);
    url += `${endDate}/`;
  }

  return `${url}?adults=${numPax}&children=0&adultsv2=${numPax}&childrenv2=&infants=0&cabinclass=${skyscanner_cabin_map[cabin]}`;
}

const priceline_cabin_map = {
  econ: "ECO", // to get Basic Econ, set requestBasicEconomy to "true" in request body
  prem_econ: "PEC",
  business: "BUS",
  first: "FST",
};
function southwestTabURL(formData) {
  const { from, to, fromDate, toDate, numPax, roundtrip } = formData;
  let url = `https://www.southwest.com/air/booking/select.html?adultPassengersCount=${numPax}&departureDate=${fromDate}&departureTimeOfDay=ALL_DAY&destinationAirportCode=${to}&fareType=USD&int=HOMEQBOMAIR&originationAirportCode=${from}&passengerType=ADULT&reset=true&seniorPassengersCount=0`;
  if (roundtrip) {
    url += `&returnDate=${toDate}&returnTimeOfDay=ALL_DAY&tripType=roundtrip`;
  } else {
    url += `&returnDate=&returnTimeOfDay=ALL_DAY&tripType=oneway`;
  }
  //www.southwest.com/air/booking/select.html?adultPassengersCount=1&departureDate=2020-04-28&departureTimeOfDay=ALL_DAY&destinationAirportCode=LGA&fareType=USD&int=HOMEQBOMAIR&originationAirportCode=SFO&passengerType=ADULT&reset=true&returnDate=&returnTimeOfDay=ALL_DAY&seniorPassengersCount=0&tripType=oneway

  return url;
}
function pricelineTabURL(formData) {
  const { from, to, fromDate, toDate, numPax, cabin } = formData;
  return `https://www.priceline.com/m/fly/search/${from}-${to}-${fromDate.replace(
    /-/g,
    ""
  )}/${to}-${from}-${toDate.replace(/-/g, "")}/?cabin-class=${
    priceline_cabin_map[cabin]
  }&num-adults=${numPax}`;
}
