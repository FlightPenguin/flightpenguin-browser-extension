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

let allDepartures = {};
let allItins = {};
let departureSelected = false;

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

      // need to clean up variables when webpage tab is closed
      break;
    case "DEPARTURE_SELECTED":
      departureSelected = true;
      const departure = allDepartures[message.departureId];
      const returnList = findReturnFlights(departure, allItins);
      Object.values(tabIds).forEach((tabId) => {
        chrome.tabs.sendMessage(tabId, { event: "STOP_PARSING" });
      });
      chrome.tabs.sendMessage(webPageTabId, {
        event: "RETURN_FLIGHTS",
        flights: { returnList },
      });
      break;
    case "HIGHLIGHT_TAB":
      const { selectedDepartureId, selectedReturnId } = message;
      // remove this line once you weave windowId from message var
      chrome.tabs.get(message.tabId, (tab) => {
        chrome.windows.update(tab.windowId, { focused: true }, (win) => {
          chrome.tabs.sendMessage(message.tabId, {
            event: "HIGHLIGHT_FLIGHT",
            selectedDepartureId,
            selectedReturnId,
            provider: message.provider,
          });
        });
      });
      break;
    default:
      console.error("Unhandled message ", message);
      break;
  }
});
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
      webPageTabId = tab.id;
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
    }
    window.setTimeout(() => {
      // give provider page time to render
      // this has great potential to break for slow internet speeds
      chrome.tabs.sendMessage(tabId, { event: "BEGIN_PARSING" });
    }, 5000);
  },
  {
    urls: [
      "https://www.southwest.com/api/air-booking/v1/air-booking/page/air/booking/shopping",
      "https://www.priceline.com/pws/v0/fly/graph/query",
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
  const { southwest, priceline } = message;
  const providers = [];
  if (southwest) {
    providers.push("southwest");
  }
  if (priceline) {
    providers.push("priceline");
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
};
const priceline_cabin_map = {
  econ: "ECO", // to get Basic Econ, set requestBasicEconomy to "true" in request body
  prem_econ: "PEC",
  business: "BUS",
  first: "FST",
};
function southwestTabURL(formData) {
  const { from, to, fromDate, toDate, numPax } = formData;
  // sub in search args
  let newFrom = from.toUpperCase();
  switch (from) {
    case "SFO":
      newFrom = "OAK";
      break;
    default:
      break;
  }
  return `https://www.southwest.com/air/booking/select.html?adultPassengersCount=${numPax}&departureDate=${fromDate}&departureTimeOfDay=ALL_DAY&destinationAirportCode=${to}&fareType=USD&int=HOMEQBOMAIR&originationAirportCode=${from}&passengerType=ADULT&reset=true&returnDate=${toDate}&returnTimeOfDay=ALL_DAY&seniorPassengersCount=0&tripType=roundtrip`;
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
