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
let beginTime = 0;
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
      const { flights, provider } = message;

      const { departures, itins } = makeItins(
        flights,
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
          itins: allItins,
        },
        tabId: tabIds[provider],
        formData,
      };
      sendMessageToWebpage(nextMessage);
      break;
    case "RETURN_FLIGHTS_RECEIVED":
      // for providers that show returns separate from departures,
      // and only once you select a departure.
      const {
        departure: expediaDeparture,
        flights: expediaFlights,
        provider: expediaProvider,
      } = message;
      const { departures: expediaReturns, itins: expediaItins } = makeItins(
        expediaFlights,
        expediaProvider,
        windowIds[expediaProvider],
        tabIds[expediaProvider],
        true
      );
      allItins = { ...allItins, ...expediaItins };

      chrome.tabs.sendMessage(webPageTabId, {
        event: "RETURN_FLIGHTS_FOR_CLIENT",
        flights: {
          returnList: Object.values(expediaItins).map((itin) => itin.retFlight),
          itins: expediaItins,
        },
      });
      break;
    case "DEPARTURE_SELECTED":
      departureSelected = true;
      const departure = allDepartures[message.departureId];

      if (formData.searchByPoints && formData.roundtrip) {
        // expedia shows return options for roundtrip after you select a departure.
        chrome.tabs.sendMessage(tabIds.expedia, {
          event: "GET_RETURN_FLIGHTS",
          departure,
          itin: allItins[departure.id],
        });
        break;
      }
      chrome.tabs.sendMessage(webPageTabId, {
        event: "RETURN_FLIGHTS_FOR_CLIENT",
        flights: { returnList: findReturnFlights(departure, allItins) },
      });
      break;
    case "HIGHLIGHT_TAB":
      const { selectedDepartureId, selectedReturnId } = message;
      let key = selectedDepartureId;
      if (selectedReturnId) {
        key += `-${selectedReturnId}`;
      }
      const itin = allItins[key];

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
    case "CLEAR_SELECTIONS":
      // move Expedia to departures page
      chrome.tabs.sendMessage(tabIds.expedia, {
        event: "CLEAR_SELECTION",
      });
      break;
    case "FAILED_SCRAPER":
      sendMessageToWebpage(message);
      break;
    default:
      console.error(message);
      break;
  }
});

function sendMessageToWebpage(message) {
  if (!webPageTabId) {
    console.log("first results", performance.now() - beginTime);
    createNewWebPage(message);
  } else {
    // make sure webpage still exists
    chrome.tabs.get(webPageTabId, (tab) => {
      if (!tab) {
        console.log("first results", performance.now() - beginTime);
        createNewWebPage(message);
      } else {
        chrome.tabs.sendMessage(tab.id, message);
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
  const { southwest, priceline, skyscanner, searchByPoints } = message;

  const providers = [];

  if (searchByPoints) {
    providers.push("expedia");
  } else {
    if (southwest) {
      providers.push("southwest");
    }
    if (priceline) {
      providers.push("priceline");
    }
    if (skyscanner) {
      providers.push("skyscanner");
    }
  }

  providers.forEach(async (provider) => {
    const url = providerURLBaseMap[provider](message);
    // Open url in a new window. Not a new tab because we can't read results from inactive tabs (browser powers down inactive tabs).
    await createWindow(url, provider);
    if (!beginTime) {
      beginTime = performance.now();
      console.log("begin", beginTime);
    }
    chrome.tabs.sendMessage(tabIds[provider], { event: "BEGIN_PARSING" });
  });
}
function createWindow(url, provider) {
  return new Promise((resolve) => {
    chrome.windows.create({ url, focused: false }, async (win) => {
      tabIds[provider] = win.tabs[0].id;
      windowIds[provider] = win.id;
      chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        if (info.status === "complete" && tabId === tabIds[provider]) {
          chrome.tabs.onUpdated.removeListener(listener);
          resolve();
        }
      });
    });
  });
}

const providerURLBaseMap = {
  priceline: pricelineTabURL,
  southwest: southwestTabURL,
  skyscanner: skyscannerTabURL,
  expedia: expediaTabUrl,
};
const expedia_cabin_map = {
  econ: "economy",
  prem_econ: "premiumeconomy",
  business: "business",
  first: "first",
};
function expediaTabUrl(formData) {
  // http://www.expedia.com/Flights-Search?trip=roundtrip&leg1=from:sfo,to:lax,departure:6/14/2020TANYT&leg2=from:lax,to:sfo,departure:06/16/2020TANYT&passengers=adults:1,children:0,seniors:0,infantinlap:Y&options=cabinclass:economy&mode=search&origref=www.expedia.com
  const { from, to, fromDate, toDate, numPax, cabin, roundtrip } = formData;
  const startDate = formatDate(fromDate);
  const tripType = roundtrip ? "roundtrip" : "oneway";
  let url = `https://www.expedia.com/Flights-Search?trip=${tripType}&leg1=from:${from},to:${to},departure:${startDate}TANYT`;

  function formatDate(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return [month, day, year].join("/");
  }

  if (roundtrip) {
    const endDate = formatDate(toDate);
    url += `&leg2=from:${to},to:${from},departure:${endDate}TANYT`;
  }
  url += `&passengers=adults:${numPax},children:0,seniors:0,infantinlap:0`;
  url += `&cabinclass:${cabin}`;
  url += "&mode=search&origref=www.expedia.com";

  return url;
}
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
