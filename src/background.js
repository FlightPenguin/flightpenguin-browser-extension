Sentry.init({
  dsn:
    "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451",
});
// debugger and console logs can be seen by clicking background.js link for this extension under chrome://extensions,
// it will open a developer console for this extension and in addition to logs you can see the local storage
import { makeItins, sortFlights, findReturnFlights } from "./dataModels.js";
import ORIGIN from "./config.js";


chrome.runtime.setUninstallURL('https://forms.gle/s1BfyyBQb5qtXr7H6', function () {
  Sentry.captureMessage('uninstall');
});


chrome.runtime.onInstalled.addListener(function () {
  console.log("Is this thing on?");
});

let browserActionClicked = false;
chrome.browserAction.onClicked.addListener(function () {
  if (browserActionClicked) {
    // blocks rapid successive clicks
    return;
  }
  browserActionClicked = true;
  // get user access token using oauth constants in manifest.json
  chrome.identity.getAuthToken({ interactive: true }, async (token) => {
    /**
    Fetch the user's info, passing in the access token in the Authorization
    HTTP request header. Doing this instead of identity.getProfileUserInfo bc it didn't work.
    @param {String} accessToken
    @returns {Object} email
                      family_name
                      given_name
                      id
                      locale
                      name
                      picture
                      verified_email
    */
    function getUserInfo(accessToken) {
      const requestURL =
        "https://www.googleapis.com/oauth2/v1/userinfo?alt=json";
      const requestHeaders = new Headers();
      requestHeaders.append("Authorization", "Bearer " + accessToken);
      const driveRequest = new Request(requestURL, {
        method: "GET",
        headers: requestHeaders,
      });
      return fetch(driveRequest).then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw response.status;
        }
      });
    }
    const { email } = await getUserInfo(token);
    fetch(`${ORIGIN}/get-customer/${email}`)
      .then((resp) => resp.json())
      .then(({ customer }) => {
        if (
          customer &&
          (customer.stripeSubscriptionId || customer.skipSubscription)
        ) {
          createNewWebPage({});
        } else {
          chrome.tabs.create(
            { url: ORIGIN },
          );
        }
      })
      .catch((err) => {
        console.error(err);
        chrome.tabs.create(
          { url: ORIGIN },
        );
      })
      .finally(() => browserActionClicked = false);
  });
});

let tabIds = {};
let windowIds = {};
let formData = {};
let webPageTabId;
let webPageWindowId;
let webPageTabIndex;
let paywallTabId;
let returnList = [];

let allDepartures = {};
let allItins = {};
let departureSelected = false;
let canHighlightSkyscannerTab = false;
let isExpediaReady = true;
let expediaMessage;
let messageQueue = [];
let beginTime = 0;
let providersReceived = new Set();
let failedProviders = new Set();
let providersTimeoutIds = {};

chrome.runtime.onMessage.addListener(function (message, sender, reply) {
  console.info(message.event, message);

  switch (message.event) {
    case "FORM_DATA_RECEIVED":
      formData = {
        ...message.formData,
        from: message.formData.from.toUpperCase(),
        to: message.formData.to.toUpperCase(),
      };
      openProviderSearchResults(formData, message.windowConfig);
      // clean up incase user is doing a different search
      closeWindows();
      tabIds = {};
      windowIds = {};
      allDepartures = {};
      allItins = {};
      departureSelected = false;
      messageQueue = [];
      providersReceived = new Set();
      failedProviders = new Set();
      canHighlightSkyscannerTab = false;
      returnList = [];
      providersTimeoutIds = {};
      isExpediaReady = true;
      expediaMessage = null;

      if (webPageTabId) {
        chrome.tabs.sendMessage(webPageTabId, {
          event: "RESET_SEARCH",
          formData,
        });
      }
      break;
    case "NO_FLIGHTS_FOUND":
      failedProviders.add(message.provider);
      clearTimeout(providersTimeoutIds[message.provider]);

      if (failedProviders.size >= Object.keys(tabIds).length) {
        sendMessageToWebpage({ event: "NO_FLIGHTS_FOUND_CLIENT" });
        closeWindows();
      }
      Sentry.captureException(new Error(`No flights found ${message.provider}`, {
        extra: formData,
      }));
      break;
    case "FAILED_SCRAPER":
      addFailedScraper(message.provider);
      break;
    case "FLIGHT_RESULTS_RECEIVED":
      if (departureSelected) {
        break;
      }
      const { flights, provider } = message;
      clearTimeout(providersTimeoutIds[provider]);

      if (!flights.length) {
        break;
      }
      if (!providersReceived.has(provider)) {
        Sentry.captureMessage(`${provider} flight results took ${performance.now() - beginTime}`);
        providersReceived.add(provider);
      }

      const { departures, itins } = makeItins(
        flights,
        allDepartures,
        allItins,
        provider,
        windowIds[provider],
        tabIds[provider]
      );
      allItins = { ...itins };
      allDepartures = { ...departures };

      const departuresToSend = sortFlights(allDepartures, allItins);
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
        flights: expediaFlights,
        provider: expediaProvider,
      } = message;
      if (expediaFlights.length === 0) {
        return;
      }
      clearTimeout(providersTimeoutIds.expedia);
      const { itins: expediaItins, returns: expediaReturns } = makeItins(
        expediaFlights,
        allDepartures,
        allItins,
        expediaProvider,
        windowIds[expediaProvider],
        tabIds[expediaProvider],
        true
      );
      allItins = { ...allItins, ...expediaItins };
      let expediaReturnList = Object.values(expediaReturns);
      // TODO dedup returns
      expediaReturnList = sortFlights(expediaReturnList, allItins);
      returnList = returnList.concat(expediaReturnList);

      chrome.tabs.sendMessage(webPageTabId, {
        event: "RETURN_FLIGHTS_FOR_CLIENT",
        flights: {
          returnList,
          itins: expediaItins,
        },
      });
      break;
    case "DEPARTURE_SELECTED":
      if (!formData.roundtrip) {
        return;
      }
      departureSelected = true;
      const departure = allDepartures[message.departureId];
      // itin needs to be set to {} for Southwest
      // Southwest allItins ids includes return id because we know that info
      // but message.departureId is still just departure id.
      const itinsForDeparture = departure.itinIds.flatMap(itinId => allItins[itinId]);
      const itinProviders = itinsForDeparture.map(i => i.provider);

      if (itinProviders.includes("expedia")) {
        const getExpediaReturns = () => {
          // expedia shows return options for roundtrip after you select a departure.
          chrome.tabs.sendMessage(tabIds.expedia, {
            event: "GET_RETURN_FLIGHTS",
            departure,
            itin: itinsForDeparture[itinProviders.indexOf("expedia")],
          });

          providersTimeoutIds.expedia = setTimeout(() => {
            Sentry.captureException(new Error(`Scraper failed for expedia`), {
              extra: formData
            });
          }, 10000);
        }
        if (isExpediaReady) {
          getExpediaReturns();
        } else {
          expediaMessage = getExpediaReturns;
        }
      } else if (itinProviders.includes("skyscanner") || itinProviders.includes("southwest")) {
        returnList = findReturnFlights(departure, allItins);
        returnList = sortFlights(returnList, allItins);

        chrome.tabs.sendMessage(webPageTabId, {
          event: "RETURN_FLIGHTS_FOR_CLIENT",
          flights: { returnList },
        });
      }
      break;
    case "HIGHLIGHT_TAB":
      const { selectedDepartureId, selectedReturnId } = message;
      let key = selectedDepartureId;
      if (selectedReturnId) {
        key += `-${selectedReturnId}`;
      }
      highlightTab(allItins[key]);
      break;
    case "SKYSCANNER_READY":
      canHighlightSkyscannerTab = true;
      if (messageQueue.length) {
        messageQueue.forEach((msg) => {
          highlightTab(msg);
        });
      }
      break;
    case "SEND_BEGIN_EVENT":
      setTimeout(() => {
        chrome.tabs.sendMessage(tabIds[message.provider], {
          event: "BEGIN_PARSING",
          formData,
        });
      }, 2000);
      break;
    case "EXPEDIA_READY":
      isExpediaReady = true;
      if (expediaMessage) {
        expediaMessage();
        expediaMessage = null;
      }
      break;
    case "FOCUS_WEBPAGE":
      sendMessageToWebpage({ event: "FOCUS_WEBPAGE_CLIENT" });
      chrome.windows.update(webPageWindowId, { focused: true }, (win) => {
        chrome.tabs.highlight({
          tabs: [webPageTabIndex],
        });
      });
      break;
    case "CLEAR_SELECTIONS":
      returnList = [];
      // move Expedia to departures page
      if (tabIds.expedia) {
        isExpediaReady = false;
        chrome.tabs.sendMessage(tabIds.expedia, {
          event: "CLEAR_SELECTION",
        });
      }
      break;
    default:
      console.error(message);
      break;
  }
});

function addFailedScraper(provider) {
  failedProviders.add(provider);

  if (failedProviders.size >= Object.keys(tabIds).length) {
    sendMessageToWebpage({ event: "FAILED_SCRAPER_CLIENT" });
    closeWindows();
  }
  Sentry.captureException(new Error(`Scraper failed for ${provider}`), {
    extra: formData
  });
}

function sendMessageToWebpage(message) {
  if (!webPageTabId) {
    createNewWebPage(message);
  } else {
    // make sure webpage still exists
    chrome.tabs.get(webPageTabId, (tab) => {
      if (!tab) {
        createNewWebPage(message);
      } else {
        chrome.tabs.sendMessage(tab.id, message);
      }
    });
  }
}

function highlightTab(itin) {
  if (formData.searchByPoints) {
    chrome.tabs.create({ url: 'https://flightpenguin.com/flight-penguin-points' });
    return;
  }
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

async function openProviderSearchResults(formData, windowConfig) {
  /**
   * Open tabs to provider search results pages.
   * Keep track of opened tab ids to send messages to them.
   *
   * formData schema:
    from: "SFO"
    to: "LAX"
    southwest: false
    priceline: true
    cabin: "Economy"
    fromDate: "2020-03-24"
    toDate: "2020-03-25"
    numPax: 2
     */
  const { searchByPoints } = formData;

  let providers = [];

  if (searchByPoints) {
    providers = ["expedia"];
  } else {
    providers = ["southwest", "skyscanner", "expedia"];
  }

  const promises = providers.map((provider) => {
    const url = providerURLBaseMap[provider](formData);
    // Open url in a new window. Not a new tab because we can't read results from inactive tabs (browser powers down inactive tabs).
    return createWindow(url, provider, windowConfig, formData);
  });

  await Promise.all(promises);
  // update again for chrome on windows, to move results window to foreground
  chrome.windows.update(webPageWindowId, {focused: true});
}

function createWindow(url, provider, windowConfig, formData) {
  const { height, width, left, top } = windowConfig;
  return new Promise((resolve) => {
    chrome.windows.create({ url, focused: false, height, width, left, top }, async (win) => {
      tabIds[provider] = win.tabs[0].id;
      windowIds[provider] = win.id;

      chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        if (info.status === "complete" && tabId === tabIds[provider]) {
          chrome.tabs.onUpdated.removeListener(listener);
          chrome.tabs.sendMessage(tabIds[provider], { event: "BEGIN_PARSING", formData });
          if (!beginTime) {
            beginTime = performance.now();
          }
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
  prem_econ: "premium_economy",
  business: "business",
  first: "first",
};
function expediaTabUrl(formData) {
  /**
   * URLs from search results page, different from a search from the homepage
   * oneway
   * https://www.expedia.com/Flights-Search?mode=search&trip=oneway&leg1=from:SFO,to:JFK,departure:12/20/2020TANYT&leg2=from:JFK,to:SFO,departure:12/23/2020TANYT&passengers=adults:1,children:0,infantinlap:N&options=carrier:*,cabinclass:economy,maxhops:1,nopenalty:N&pageId=0
   *
   * roundtrip
   * https://www.expedia.com/Flights-Search?mode=search&trip=roundtrip&leg1=from:SFO,to:JFK,departure:12/20/2020TANYT&leg2=from:JFK,to:SFO,departure:12/25/2020TANYT&passengers=adults:1,children:0,infantinlap:N&options=carrier:*,cabinclass:first,maxhops:1,nopenalty:N&pageId=0
   *
   **/

  const { from, to, fromDate, toDate, numPax, cabin, roundtrip } = formData;
  const startDate = formatDate(fromDate);
  const tripType = roundtrip ? "roundtrip" : "oneway";
  let url = `https://www.expedia.com/Flights-Search?mode=search&trip=${tripType}&leg1=from:${from},to:${to},departure:${startDate}TANYT&leg2=from:${to},to:${from},`;

  function formatDate(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return [month, day, year].join("/");
  }

  if (roundtrip) {
    const endDate = formatDate(toDate);
    url += `departure:${endDate}TANYT`;
  } else {
    url += `departure:${startDate}TANYT`;
  }
  url += `&passengers=adults:${numPax},children:0,seniors:0,infantinlap:N&options=carrier:*,`;
  url += `cabinclass:${expedia_cabin_map[cabin]},`;
  url += "maxhops:1,nopenalty:N&pageId=0";
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

  const fromCaps = from.toUpperCase();
  const toCaps = to.toUpperCase();

  let url = `https://www.southwest.com/air/booking/select.html?adultPassengersCount=${numPax}&departureDate=${fromDate}&departureTimeOfDay=ALL_DAY&destinationAirportCode=${toCaps}&fareType=USD&int=HOMEQBOMAIR&originationAirportCode=${fromCaps}&passengerType=ADULT&reset=true&seniorPassengersCount=0`;
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