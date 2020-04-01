// debugger and console logs can be seen by clicking background.js link for this extension under chrome://extensions,
// it will open a developer console for this extension and in addition to logs you can see the local storage
chrome.runtime.onInstalled.addListener(function() {
  console.log("Is this thing on?");
});

const tabIds = {};
const windowIds = [];
let formData = {};
let webPageTabId;

chrome.runtime.onMessage.addListener(function(message, sender, reply) {
  console.info(message.event, message);

  switch (message.event) {
    case "FORM_DATA_RECEIVED":
      formData = message.formData;
      openProviderSearchResults(message.formData);
      break;
    case "FLIGHT_RESULTS_RECEIVED":
      let tabId;
      if (sender.origin.includes("southwest")) {
        // save results with their tab index so we know where to move the user to when they make a flight selection
        tabId = tabIds["southwest"];
      } else if (sender.origin.includes("priceline")) {
        tabId = tabIds["priceline"];
      }
      nextMessage = {
        event: "FLIGHT_RESULTS_FOR_CLIENT",
        flights: message.flights,
        tabId,
        formData
      };
      if (!webPageTabId) {
        createNewWebPage(nextMessage);
      } else {
        // make sure webpage still exists
        chrome.tabs.get(webPageTabId, tab => {
          if (!tab) {
            createNewWebPage(nextMessage);
          } else {
            chrome.tabs.sendMessage(tab.id, nextMessage);
          }
        });
      }

      // need to clean up variables when webpage tab is closed
      break;
    case "HIGHLIGHT_TAB":
      const { selectedDepartureId, selectedReturnId } = message;
      chrome.tabs.get(message.tabId, tab => {
        chrome.tabs.highlight({ tabs: [tab.index] }, () => {
          chrome.tabs.sendMessage(message.tabId, {
            event: "HIGHLIGHT_FLIGHT",
            selectedDepartureId,
            selectedReturnId
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
chrome.tabs.onRemoved.addListener(function(tabId) {
  if (tabId === webPageTabId) {
    windowIds.forEach(windowId => {
      chrome.windows.remove(windowId);
    });
  }
});

function createNewWebPage(message) {
  chrome.tabs.create({ url: chrome.extension.getURL("./index.html") }, tab => {
    window.setTimeout(() => {
      // need setTimeout here or else message will be missed by new tab.
      chrome.tabs.sendMessage(tab.id, message);
    }, 1000);
    webPageTabId = tab.id;
  });
}

// use chrome.webRequest API to listen for when flight results API has finished fetching
// then send message to content script to begin parsing results off DOM
chrome.webRequest.onCompleted.addListener(
  function(args) {
    console.log("web request complete ", args.url);
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
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
      }, 2000);
    });
  },
  {
    urls: [
      "https://www.southwest.com/api/air-booking/v1/air-booking/page/air/booking/shopping",
      "https://www.priceline.com/pws/v0/fly/graph/query"
    ]
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
  providers.forEach(provider => {
    const url = providerURLBaseMap[provider](message);
    // Open url in a new window. Not a new tab because we can't read results from inactive tabs (browser powers down inactive tabs).
    chrome.windows.create({ url, focused: false, incognito: true }, win => {
      tabIds[provider] = win.tabs[0].id;
      windowIds.push(win.id);
    });
  });
}

const providerURLBaseMap = {
  priceline: pricelineTabURL,
  southwest: southwestTabURL
};
const priceline_cabin_map = {
  econ: "ECO", // to get Basic Econ, set requestBasicEconomy to "true" in request body
  prem_econ: "PEC",
  business: "BUS",
  first: "FST"
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
