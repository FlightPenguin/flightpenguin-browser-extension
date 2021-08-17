/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/utilityFunctions.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function convertTimeTo24HourClock(time, addDays) {
  var timeFormatted = time.toLowerCase();

  var _timeFormatted$split = timeFormatted.split(":"),
      _timeFormatted$split2 = _slicedToArray(_timeFormatted$split, 2),
      hours = _timeFormatted$split2[0],
      minutesAndTimeOfDay = _timeFormatted$split2[1];

  hours = Number(hours);
  var minutes = Number(minutesAndTimeOfDay.replace(/(pm)|(am)|(\+\d)/g, "").trim());

  if (addDays) {
    var daysToAdd = time.match(/(\+\d)/);

    if (daysToAdd) {
      hours += daysToAdd[0].split("+")[1] * 24;
    }
  }

  if (timeFormatted.includes("pm") && hours % 12 !== 0) {
    hours += 12;
  } else if (timeFormatted.includes("am") && hours % 12 === 0) {
    hours -= 12;
  }

  return {
    hours: hours,
    minutes: minutes
  };
}

function convert12HourTimeToMinutes(time) {
  var _convertTimeTo24HourC = convertTimeTo24HourClock(time, true),
      hours = _convertTimeTo24HourC.hours,
      minutes = _convertTimeTo24HourC.minutes;

  return hours * 60 + minutes;
}

function addTimezoneOffset(time, tzOffset) {
  var minutes = convert12HourTimeToMinutes(time);
  var newTimeInMinutes = minutes - tzOffset;
  return convertMinutesTo12HourClock(newTimeInMinutes, true);
}

function convertMinutesTo12HourClock(time, addDay) {
  var totalMinutes = Math.abs(time);
  var hours = Math.floor(totalMinutes / 60) % 24;
  var minutes = totalMinutes % 60;
  var minuteString = "" + minutes;
  minuteString = minuteString.padStart(2, "0");
  var timeString = "";

  if (hours < 12) {
    if (hours === 0) {
      timeString += "12";
    } else {
      timeString += hours;
    }

    timeString += ":".concat(minuteString, " AM");
  } else {
    if (hours === 12) {
      timeString += 12;
    } else {
      timeString += "".concat(hours - 12);
    }

    timeString += ":".concat(minuteString, " PM");
  }

  if (addDay && totalMinutes / 60 > 24) {
    timeString += "+".concat(Math.floor(totalMinutes / 60 / 24));
  }

  return timeString;
}

function convertDurationToMinutes(duration) {
  // duration looks like 10h 30m
  var durationHours;
  var durationRest;

  if (duration.includes("h")) {
    var _duration$split = duration.split("h");

    var _duration$split2 = _slicedToArray(_duration$split, 2);

    durationHours = _duration$split2[0];
    durationRest = _duration$split2[1];
  } else {
    // less than 1 hour
    durationHours = 0;
    durationRest = duration;
  }

  var durationMinutes = durationRest.trim().split("m")[0] || 0;
  var durationTotalMinutes = Number(durationMinutes) + Number(durationHours) * 60;
  return durationTotalMinutes;
} // calculate timezone offset in minutes


function getTimezoneOffset(fromTime, toTime, duration) {
  var _convertTimeTo24HourC2 = convertTimeTo24HourClock(fromTime),
      fromHr = _convertTimeTo24HourC2.hours,
      fromMin = _convertTimeTo24HourC2.minutes;

  var _convertTimeTo24HourC3 = convertTimeTo24HourClock(toTime),
      toHr = _convertTimeTo24HourC3.hours,
      toMin = _convertTimeTo24HourC3.minutes;

  var endsNextDay = toTime.match(/(\+\d)/);
  var startsNextDay = fromTime.match(/(\+\d)/);
  var startDayOffset = 0;
  var endDayOffset = 0;

  if (startsNextDay) {
    var _startsNextDay$0$spli = startsNextDay[0].split("+"),
        _startsNextDay$0$spli2 = _slicedToArray(_startsNextDay$0$spli, 2),
        _ = _startsNextDay$0$spli2[0],
        startDays = _startsNextDay$0$spli2[1];

    startDayOffset += Number(startDays);
    endDayOffset = startDayOffset;
  }

  if (endsNextDay) {
    var _endsNextDay$0$split = endsNextDay[0].split("+"),
        _endsNextDay$0$split2 = _slicedToArray(_endsNextDay$0$split, 2),
        _2 = _endsNextDay$0$split2[0],
        endDays = _endsNextDay$0$split2[1];

    endDayOffset += Number(endDays);
  }

  var fromTotalMinutes = (fromHr + 24 * startDayOffset) * 60 + fromMin;
  var toTotalMinutes = (toHr + 24 * endDayOffset) * 60 + toMin;
  var durationMinutes = convertDurationToMinutes(duration);
  return durationMinutes - (toTotalMinutes - fromTotalMinutes);
}

function getTimeDetails(time) {
  var _convertTimeTo24HourC4 = convertTimeTo24HourClock(time, true),
      hours = _convertTimeTo24HourC4.hours,
      minutes = _convertTimeTo24HourC4.minutes;

  var timeOfDay = time.toLowerCase().match(/(pm)|(am)/)[0];
  var excessDays = time.match(/(\+\d)/);
  var displayHours = Number(time.split(":")[0]); // want 12 hour clock

  return {
    hours: hours,
    displayHours: displayHours,
    minutes: minutes,
    timeOfDay: timeOfDay,
    excessDays: excessDays ? excessDays[0] : excessDays
  };
}

function isOvernight(fromTime, toTime) {
  var MINUTES_PER_DAY = 24 * 60; // return convert12HourTimeToMinutes(fromTime) + convertDurationToMinutes(duration) > MINUTES_PER_DAY;
  // if fromTime + duration > 24 hour

  return fromTime.toLowerCase().includes('pm') && toTime.toLowerCase().includes('am');
}


;// CONCATENATED MODULE: ./src/index.js
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = src_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function src_slicedToArray(arr, i) { return src_arrayWithHoles(arr) || src_iterableToArrayLimit(arr, i) || src_unsupportedIterableToArray(arr, i) || src_nonIterableRest(); }

function src_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function src_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function src_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || src_unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function src_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return src_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return src_arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return src_arrayLikeToArray(arr); }

function src_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


var totalFlights = 0;
var allItins = {};
var departureFlights = [];
var returnFlights = [];
var flightsById = {};
var selections = [];
var search = {};
var numTicks;
var isShowingReturns = false;
var earliestTakeoffTime = Number.POSITIVE_INFINITY;
var latestLandingTime = Number.NEGATIVE_INFINITY;
var flightListItemWidth = 1418;
var timeBarContainerWidth = flightListItemWidth - 350 - 1; // if you update this, update CSS too

var GA_TRACKING_ID = "164337457-1";

(function (i, s, o, g, r, a, m) {
  i["GoogleAnalyticsObject"] = r;
  i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments);
  }, i[r].l = 1 * new Date();
  a = s.createElement(o), m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga"); // Note: https protocol here


ga("create", "UA-" + GA_TRACKING_ID, "auto"); // Enter your GA identifier

ga("set", "checkProtocolTask", function () {}); // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200

ga("set", "transport", "beacon");
ga("require", "displayfeatures");
ga("send", "pageview", "/index.html"); // Specify the virtual path

var tableHeaders = document.querySelectorAll(".table-header");
tableHeaders.forEach(function (el) {
  return el.style.width = flightListItemWidth + "px";
});
var departuresSection = document.querySelector(".departures-section");
var departuresContainer = document.querySelector(".departures-content");
var depListNode = document.querySelector(".departures-list");
var returnsSection = document.querySelector(".returns-section");
var returnsContainer = document.querySelector(".returns-content");
var retListNode = document.querySelector(".returns-list");
var depTimeBarContainer = document.querySelector(".departures-time-bar-container");
var depTimeBarHeaderContainer = document.querySelector(".departures-time-bar-container-header");
var retTimeBarContainer = document.querySelector(".returns-time-bar-container");
var retTimeBarHeaderContainer = document.querySelector(".returns-time-bar-container-header");
var loadingContainer = document.getElementById("loading");
var formContainer = document.querySelector("form");
var mainContainer = document.querySelector("main");
var searchPageLogo = document.getElementById("search-form-logo");
var resultsPageLogo = document.getElementById("results-logo");
window.addEventListener("popstate", function () {
  // use browser back button to undo departure flight selection for roundtrip
  // send message to bg that selections have been reset.
  // providers that show departures and returns on separate pages need to be updated to go back to departures.
  chrome.runtime.sendMessage({
    event: "CLEAR_SELECTIONS"
  });
  clearSelections();
});
var sortContainer = document.querySelectorAll(".sort-container");
sortContainer.forEach(function (node) {
  node.addEventListener("change", function (e) {
    var _containerNode;

    var sortFunction;

    switch (e.target.value) {
      case "pain":
        sortFunction = function sortFunction(a, b) {
          return a.pain - b.pain;
        };

        break;

      case "price":
        sortFunction = function sortFunction(a, b) {
          return allItins[a.itinIds[0]].fareNumber - allItins[b.itinIds[0]].fareNumber;
        };

        if (isShowingReturns) {
          sortFunction = function sortFunction(a, b) {
            return allItins["".concat(selections[0].dataset.id, "-").concat(a.id)].fareNumber - allItins["".concat(selections[0].dataset.id, "-").concat(b.id)].fareNumber;
          };
        }

        break;

      case "duration":
        sortFunction = function sortFunction(a, b) {
          return a.durationMinutes - b.durationMinutes;
        };

        break;

      case "stops":
        sortFunction = function sortFunction(a, b) {
          return a.layovers.length - b.layovers.length;
        };

        break;

      case "takeoff":
        sortFunction = function sortFunction(a, b) {
          return convert12HourTimeToMinutes(a.fromTime) - convert12HourTimeToMinutes(b.fromTime);
        };

        break;

      case "landing":
        sortFunction = function sortFunction(a, b) {
          return convert12HourTimeToMinutes(a.toTime) - convert12HourTimeToMinutes(b.toTime);
        };

        break;

      default:
        return;
    }

    var containerNode = depListNode;
    var flights = departureFlights;

    if (isShowingReturns) {
      containerNode = retListNode;
      flights = returnFlights;
    } // sort


    var sortedFlights = flights.slice().sort(sortFunction); // append rendered rows in new order

    var sortedNodeList = sortedFlights.map(function (_ref) {
      var id = _ref.id;
      return flightsById[id];
    });
    containerNode.innerHTML = "";

    (_containerNode = containerNode).append.apply(_containerNode, _toConsumableArray(sortedNodeList));
  });
});
chrome.runtime.onMessage.addListener(function (message) {
  console.log(message.event, message);

  switch (message.event) {
    case "RESET_SEARCH":
      // state variables
      totalFlights = 0;
      allItins = {};
      departureFlights = [];
      returnFlights = [];
      flightsById = {};
      selections = [];
      search = message.formData;
      numTicks = 0;
      isShowingReturns = false;
      earliestTakeoffTime = Number.POSITIVE_INFINITY;
      latestLandingTime = Number.NEGATIVE_INFINITY; // search header

      createHeader(message.formData); // departure list

      departuresSection.style.display = "none";
      depListNode.innerHTML = ""; // departure time bars

      var timeBarHeader = depTimeBarHeaderContainer;
      timeBarHeader.innerHTML = "";
      depTimeBarContainer.innerHTML = "";
      depTimeBarContainer.style.display = null;
      depTimeBarContainer.append(timeBarHeader); // return list

      returnsSection.style.display = "none";
      retListNode.innerHTML = ""; // return time bars

      timeBarHeader = retTimeBarHeaderContainer;
      timeBarHeader.innerHTML = "";
      retTimeBarContainer.innerHTML = "";
      retTimeBarContainer.append(timeBarHeader);
      break;

    case "FLIGHT_RESULTS_FOR_CLIENT":
      var _message$flights = message.flights,
          departureList = _message$flights.departureList,
          itins = _message$flights.itins,
          formData = message.formData;
      search = formData;
      allItins = _objectSpread(_objectSpread({}, allItins), itins);
      mainContainer.style.display = null;
      formContainer.style.display = "none";
      searchPageLogo.style.display = "none";
      resultsPageLogo.style.display = null;

      if (departureList.length) {
        departureFlights = departureList;
        departuresSection.style.display = null;

        var _createIntervals = createIntervals(departureList),
            _increment = _createIntervals.increment,
            _startHourOffset = _createIntervals.startHourOffset,
            _intervals = _createIntervals.intervals,
            _dayWidths = _createIntervals.dayWidths;

        createNodeList(departureList, depListNode, _increment, _startHourOffset, true);
        createTimeBarContainer(departureList[0].timezoneOffset, depTimeBarContainer, depTimeBarHeaderContainer, _intervals, _dayWidths);
      }

      createHeader(search);
      break;

    case "RETURN_FLIGHTS_FOR_CLIENT":
      var _message$flights2 = message.flights,
          returnList = _message$flights2.returnList,
          newItins = _message$flights2.itins;
      allItins = _objectSpread(_objectSpread({}, allItins), newItins);
      returnFlights = returnList;
      isShowingReturns = true;
      returnsSection.style.display = null;
      selections[0].querySelector(".fare").style.display = "none";
      loadingContainer.style.display = "none";

      var _createIntervals2 = createIntervals(returnList),
          increment = _createIntervals2.increment,
          startHourOffset = _createIntervals2.startHourOffset,
          intervals = _createIntervals2.intervals,
          dayWidths = _createIntervals2.dayWidths;

      createNodeList(returnList, retListNode, increment, startHourOffset, false);
      createTimeBarContainer(returnList[0].timezoneOffset, retTimeBarContainer, retTimeBarHeaderContainer, intervals, dayWidths); // scroll to Returns section

      window.scroll(0, window.pageYOffset + returnsSection.getBoundingClientRect().top);
      break;

    case "FOCUS_WEBPAGE_CLIENT":
      loadingContainer.style.display = "none";
      var lastSelection = selections.pop();
      lastSelection.tabIndex = "0";
      delete lastSelection.dataset.selected;
      break;

    default:
      break;
  }
});

function createNodeList(list, containerNode, increment, startHourOffset, isDeparture) {
  containerNode.innerHTML = "";
  list.forEach(function (item) {
    var node = document.createElement("li");
    node.classList.add("flight-list-item");
    node.style.width = flightListItemWidth + "px";
    node.tabIndex = "0";
    node.addEventListener("click", handleFlightSelection);
    node.addEventListener("keypress", function (e) {
      if ([13, 32].includes(e.keyCode)) {
        // 13 is enter key code, 32 is space bar
        handleFlightSelection(e);
      }
    });
    var contentNode = document.createElement("div");
    contentNode.classList.add("flight-list-item__left-column");
    var operatingAirline = item.operatingAirline.display,
        marketingAirlineText = item.marketingAirlineText,
        id = item.id,
        itinIds = item.itinIds;
    var cheapestItin;

    if (isDeparture) {
      // departures
      cheapestItin = itinIds.map(function (itinId) {
        return allItins[itinId];
      }).sort(function (a, b) {
        return a.fareNumber - b.fareNumber;
      })[0];
    } else {
      // returns
      cheapestItin = allItins["".concat(selections[0].dataset.id, "-").concat(id)];
    }

    var fare = cheapestItin.fareNumber;
    var costContainer = document.createElement("div");
    costContainer.classList.add("cost-container");
    var fareContainer = document.createElement("span");
    fareContainer.classList.add("fare");
    var units = "";

    if (search.searchByPoints) {
      fareContainer.classList.add("points");
      fareContainer.textContent = "".concat(Math.floor(fare / search.pointsValue).toLocaleString("en"));
      units = "points";
    } else {
      fareContainer.classList.add("dollar");
      fareContainer.textContent = "$".concat(fare.toLocaleString("en"));
    }

    costContainer.append(fareContainer);
    costContainer.append(units);
    contentNode.append(costContainer); // Create and append airline HTML

    var airlinesContainer = document.createElement("div");
    airlinesContainer.classList.add("airlines");
    var airlines = [operatingAirline];

    if (marketingAirlineText) {
      airlines.push(marketingAirlineText);
    }

    airlines.forEach(function (airline, idx) {
      var span = document.createElement("span");
      span.textContent = airline;
      span.title = airline;

      if (idx === 0) {
        span.classList.add("primary-airline");
      } else {
        span.classList.add("secondary-airline");
      }

      airlinesContainer.append(span);
    });
    contentNode.append(airlinesContainer);
    var timeBarNode = createTimeBarRow(item, increment, startHourOffset);
    node.append(contentNode);
    node.append(timeBarNode);
    node.dataset.id = item.id;
    flightsById[item.id] = node;
    containerNode.append(node);
  });
}
/**
SFO→LGA
Sun July 12, Oneway
Economy class, 1 Adult
 * @param {Object} formData
 */


function createHeader(formData) {
  var from = formData.from,
      to = formData.to,
      fromDate = formData.fromDate,
      toDate = formData.toDate,
      cabin = formData.cabin,
      numPax = formData.numPax,
      roundtrip = formData.roundtrip;
  var headerNode = document.getElementById("header");

  if (headerNode.children.length > 1) {
    return;
  }

  var container = document.createDocumentFragment();
  var cabin_map = {
    econ: "Economy",
    prem_econ: "Premium Economy",
    business: "Business",
    first: "First"
  };
  var labels = {
    Airports: "".concat(from).concat(roundtrip ? "&harr;" : "&rarr;").concat(to),
    Depart: fromDate,
    Return: toDate,
    Cabin: cabin_map[cabin],
    Passengers: numPax
  };

  for (var _i = 0, _Object$entries = Object.entries(labels); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = src_slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    if (!value) {
      continue;
    }

    var header = document.createElement("h2");
    header.classList.add("content");
    var label = document.createElement("span");
    label.classList.add("label");
    label.innerText = key;
    header.append(label);
    header.innerHTML += value;
    container.append(header);
  }

  headerNode.append(container);
}

var flightsNotSelected = [];

function handleFlightSelection(e) {
  if (e.currentTarget.dataset.selected) {
    return;
  }

  var selectedNode = e.currentTarget;
  selectedNode.dataset.selected = true;
  selectedNode.tabIndex = "-1";
  console.log(selections);
  selections.push(selectedNode);

  if (selections.length === 1 && search.roundtrip) {
    loadingContainer.style.display = null; // This page loads in a new tab so there is no history.
    // Add blank history state so the user can click browser back button.
    // The back button will be used to undo user actions, like flight selection.

    history.pushState({}, null, window.location.pathname);
    chrome.runtime.sendMessage({
      event: "DEPARTURE_SELECTED",
      departureId: selectedNode.dataset.id
    }); // hide departures

    flightsNotSelected = Array.from(departuresContainer.querySelectorAll("li:not([data-selected='true'])"));
    flightsNotSelected.forEach(function (flight) {
      return flight.style.display = "none";
    });
    document.querySelector(".sort-container").style.display = "none";
    document.querySelector(".section-header").textContent = "Your selected departure";
  } else if (selections.length === 2 || !search.roundtrip) {
    var selectionIds = selections.map(function (sel) {
      return sel.dataset.id;
    });
    chrome.runtime.sendMessage({
      event: "HIGHLIGHT_TAB",
      selectedDepartureId: selectionIds[0],
      selectedReturnId: selectionIds[1]
    });
  }
}
/**
 * Clears selections state and resets UI.
 */


function clearSelections() {
  loadingContainer.style.display = "none";
  selections.forEach(function (sel) {
    sel.style.border = "";
    delete sel.dataset.selected;
    sel.tabIndex = "0";
  });
  flightsNotSelected.forEach(function (flight) {
    return flight.style.display = null;
  });
  selections[0].querySelector(".fare").style.display = null;
  document.querySelector(".sort-container").style.display = null;
  document.querySelector(".section-header").textContent = "Departures";
  returnsSection.style.display = "none";
  isShowingReturns = false;
  retListNode.innerHTML = "";
  var timeBarHeader = retTimeBarContainer.children[0];
  timeBarHeader.innerHTML = "";
  retTimeBarContainer.innerHTML = "";
  retTimeBarContainer.append(timeBarHeader);
  selections = [];
  window.scroll(0, 0);
}

function createTimeBarHeader(intervals, tzOffset, dayWidths) {
  var timeBarHeaderContainer = document.createDocumentFragment();
  var intervalWidth = timeBarContainerWidth / (intervals.length - 1);
  var currDate = search.fromDate;
  var depAirportCode = search.from;
  var arrAirportCode = search.to;

  if (isShowingReturns) {
    currDate = search.toDate;
    depAirportCode = search.to;
    arrAirportCode = search.from;
  }

  var _currDate$split$map = currDate.split("-").map(function (dateString) {
    return Number(dateString);
  }),
      _currDate$split$map2 = src_slicedToArray(_currDate$split$map, 3),
      year = _currDate$split$map2[0],
      month = _currDate$split$map2[1],
      day = _currDate$split$map2[2];

  var departureDate = new Date(year, month - 1, day);
  var initialDepartureDay = departureDate.getDate();
  var days = 0;
  var date;

  for (var index = 0; index < intervals.length; index++) {
    var getTimeColorClass = function getTimeColorClass(time) {
      var _convertTimeTo24HourC = convertTimeTo24HourClock(time),
          hours = _convertTimeTo24HourC.hours;

      var className = "";

      if (hours <= 5) {
        className = "early-morning";
      } else if (hours <= 12) {
        className = "morning";
      } else if (hours < 5) {
        className = "afternoon";
      } else if (hours < 24) {
        className = "evening";
      }

      return className;
    };

    var interval = intervals[index];
    var timeMinutes = interval * 60;
    var time = convertMinutesTo12HourClock(Math.abs(timeMinutes));
    var originTime = time.replace(":00", "");
    var intervalNode = document.createElement("div");
    intervalNode.classList.add("interval-time");
    var intervalLineNode = document.createElement("div");
    var timeNode = document.createElement("span");
    timeNode.classList.add("interval-time-text");

    if (tzOffset) {
      intervalNode.classList.add("tz-change");
      timeNode.classList.add("tz-change");
    } else {
      intervalNode.classList.add("no-tz-change");
      timeNode.classList.add("no-tz-change");
    }

    if (index === 0) {
      intervalNode.classList.add("first");
      timeNode.classList.add("first");
      timeNode.dataset.content = "Time at ".concat(depAirportCode);
    } else if (index > 0) {
      intervalLineNode.classList.add("interval-line");
    }

    var modifierClass = "";

    if (originTime === "12 AM") {
      modifierClass = "midnight";
    } else if (originTime === "12 PM") {
      modifierClass = "midday";
    }

    if (modifierClass) {
      var _intervalLineNode$cla;

      intervalNode.classList.add(modifierClass);

      (_intervalLineNode$cla = intervalLineNode.classList).add.apply(_intervalLineNode$cla, ["interval-line", modifierClass]);

      timeNode.classList.add(modifierClass);
    }

    if (originTime === "12 AM" || index === 0) {
      var dayOfWeek = document.createElement("span"); // Copy the initial date to a new object to make sure dates are accurate while adding days
      // Because Sept 30 gives us an initialDepartureDay of 30.
      // Then when days = 1. 30 + 1 = Oct 1 because we add to Sept. Fine
      // Then when days = 2. 30 + 2 = Nov 2 because we add to Oct. Whoops.

      date = new Date(departureDate.getTime());
      date.setDate(initialDepartureDay + days);
      dayOfWeek.innerText = date.toLocaleString("en-us", {
        weekday: "long"
      });
      dayOfWeek.classList.add("day-of-the-week");
      intervalNode.append(dayOfWeek);
      days++;
    }

    timeNode.innerText = originTime.toLowerCase();
    timeNode.classList.add(getTimeColorClass(time));
    intervalNode.append(timeNode);
    intervalNode.style.left = intervalWidth * index + "px";
    intervalLineNode.style.left = intervalWidth * index + "px";
    var timeIntervalContainer = document.createElement("div");
    timeIntervalContainer.append(intervalNode);
    timeBarHeaderContainer.append(timeIntervalContainer);
    timeBarHeaderContainer.append(intervalLineNode);

    if (tzOffset) {
      var _tzTimeNode$classList;

      var tzTimeMinutes = timeMinutes - tzOffset;
      var tzTime = convertMinutesTo12HourClock(Math.abs(tzTimeMinutes)).replace(":00", "");
      var tzTimeNode = document.createElement("span");

      (_tzTimeNode$classList = tzTimeNode.classList).add.apply(_tzTimeNode$classList, ["interval-time-text", "timezone"]);

      if (index === 0) {
        tzTimeNode.classList.add("first");
        tzTimeNode.dataset.content = "Time at ".concat(arrAirportCode);
      }

      tzTimeNode.classList.add(getTimeColorClass(time));
      tzTimeNode.innerText = tzTime.toLowerCase();
      intervalNode.append(tzTimeNode);
    }
  }

  return timeBarHeaderContainer;
}

function createTimeBarContainer(timezoneOffset, timeBarContainer, timeBarHeaderContainer, intervals, dayWidths) {
  timeBarContainer.style.width = timeBarContainerWidth + "px";
  var timeBarHeader = createTimeBarHeader(intervals, timezoneOffset, dayWidths);
  timeBarHeaderContainer.innerHTML = "";
  timeBarHeaderContainer.append(timeBarHeader);
}

function createTimeNodes(fromTimeDetails, toTimeDetails) {
  return [fromTimeDetails, toTimeDetails].map(function (timeDetails, idx) {
    var displayHours = timeDetails.displayHours,
        minutes = timeDetails.minutes,
        timeOfDay = timeDetails.timeOfDay,
        excessDays = timeDetails.excessDays;
    var timeContainer = document.createElement("div");
    timeContainer.classList.add("time-container");

    if (idx === 0) {
      timeContainer.classList.add("departure-time");
    } else {
      timeContainer.classList.add("arrival-time");
    }

    var minuteString = String(minutes);
    minuteString = minuteString.padStart(2, "0");
    timeContainer.textContent = "".concat(displayHours, ":").concat(minuteString, " ").concat(timeOfDay);
    return timeContainer;
  });
}

function createTimeBarRow(flight, increment, startHourOffset) {
  var _timeBarRow$classList;

  var layovers = flight.layovers,
      fromTimeDetails = flight.fromTimeDetails,
      toTimeDetails = flight.toTimeDetails,
      duration = flight.duration;
  var timeBarRow = document.createElement("div");
  var timeBarSegmentContainer = document.createElement("div");
  timeBarSegmentContainer.classList.add("time-bar-segment-container");
  timeBarSegmentContainer.dataset.content = duration;
  timeBarRow.append(timeBarSegmentContainer);

  (_timeBarRow$classList = timeBarRow.classList).add.apply(_timeBarRow$classList, ["time-bar-row", "tooltip"]);

  var timeNodes = createTimeNodes(fromTimeDetails, toTimeDetails);
  var startDayOffset = 0;
  var endDayOffset = 0;
  var timeSegments = document.createDocumentFragment();
  var iterator = layovers.length ? layovers : [flight];

  var _iterator = _createForOfIteratorHelper(iterator),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _step.value,
          fromTime = _step$value.fromTime,
          toTime = _step$value.toTime,
          isLayoverStop = _step$value.isLayoverStop,
          from = _step$value.from,
          to = _step$value.to,
          _step$value$operating = _step$value.operatingAirline,
          color = _step$value$operating.color,
          display = _step$value$operating.display;
      var endsNextDay = toTime.match(/(\+\d)/);
      var startsNextDay = fromTime.match(/(\+\d)/);

      if (!isLayoverStop) {
        if (startsNextDay) {
          var _startsNextDay$0$spli = startsNextDay[0].split("+"),
              _startsNextDay$0$spli2 = src_slicedToArray(_startsNextDay$0$spli, 2),
              _ = _startsNextDay$0$spli2[0],
              startDays = _startsNextDay$0$spli2[1]; // 24 hours in a day but we need to lay out the time bar on the correct day


          startDayOffset += Number(startDays); // the rightmost position of the time bar aka when the flight arrives, will be relative to when the flight departed

          endDayOffset = startDayOffset;
        }

        if (endsNextDay) {
          var _endsNextDay$0$split = endsNextDay[0].split("+"),
              _endsNextDay$0$split2 = src_slicedToArray(_endsNextDay$0$split, 2),
              _2 = _endsNextDay$0$split2[0],
              endDays = _endsNextDay$0$split2[1];

          endDayOffset += Number(endDays);
        }
      }

      var _createTimeBar = createTimeBar(fromTime, toTime, color, display, startDayOffset, endDayOffset, increment, startHourOffset),
          timeBarSegment = _createTimeBar.timeBarSegment;

      if (!isLayoverStop) {
        if (endsNextDay) {
          startDayOffset = endDayOffset;
        }
      }

      timeBarSegment.classList.add("time-bar-segment");

      if (isLayoverStop) {
        timeBarSegment.classList.add("layover");
        timeBarSegment.dataset.content = from; // Some segments have a gap even when the calculated positions and width should line up!

        timeBarSegment.style.width = timeBarSegment.style.width.replace("px", "") * 1 + 1 + "px";
      }

      timeSegments.append(timeBarSegment);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var lastTimeSegment = timeSegments.children[timeSegments.childElementCount - 1];
  var rightPositionNumber = Number(lastTimeSegment.style.left.replace("px", "")) + Number(lastTimeSegment.style.width.replace("px", ""));
  var leftPosition = timeSegments.children[0].style.left;
  var leftPositionNumber = Number(leftPosition.replace("px", ""));
  timeBarSegmentContainer.style.left = timeSegments.children[0].style.left;
  timeBarSegmentContainer.append(timeSegments); // how far away from time bar we want left time node to be

  timeNodes[0].style.left = leftPositionNumber - (97 + 10) + "px"; // how far away from time bar we want right time node to be

  timeNodes[1].style.left = rightPositionNumber + 10 + "px";
  timeBarRow.append.apply(timeBarRow, _toConsumableArray(timeNodes));
  return timeBarRow;
}

function createTimeBar(fromTime, toTime, airlineColor, airlineName, startDayOffset, endDayOffset, increment, startHourOffset) {
  var timeBarSegment = document.createElement("div");

  var _createIndividualTime = createIndividualTimeBarPosition(fromTime, toTime, startDayOffset, endDayOffset, increment, startHourOffset),
      timeBarWidth = _createIndividualTime.timeBarWidth,
      startPositionPx = _createIndividualTime.startPositionPx;

  timeBarSegment.title = "".concat(airlineName, " ").concat(fromTime, "-").concat(toTime);
  timeBarSegment.style.width = "".concat(timeBarWidth, "px");
  timeBarSegment.style.backgroundColor = airlineColor;
  timeBarSegment.style.left = "".concat(startPositionPx, "px");
  return {
    timeBarSegment: timeBarSegment
  };
}

function createIntervals(flights) {
  var earliestFlight = flights.slice().sort(function (a, b) {
    return a.fromTimeDetails.hours - b.fromTimeDetails.hours;
  })[0];
  var latestFlight = flights.slice().sort(function (a, b) {
    return b.toTimeDetails.hours - a.toTimeDetails.hours;
  })[0];

  if (earliestFlight.fromTimeDetails.hours < earliestTakeoffTime) {
    earliestTakeoffTime = Math.max(0, earliestFlight.fromTimeDetails.hours - 2);
  }

  if (latestFlight.toTimeDetails.hours > latestLandingTime) {
    latestLandingTime = latestFlight.toTimeDetails.hours + 2;
  }

  var startHour = earliestTakeoffTime;

  if (startHour < 12) {
    startHour = 0;
  } else {
    startHour = 12;
  }

  var increment;

  if (latestLandingTime - earliestTakeoffTime > 72) {
    increment = 6;
  } else if (latestLandingTime - startHour <= 12) {
    increment = 1;
  } else if (latestLandingTime - startHour <= 24) {
    if (startHour % 4 === 0) {
      increment = 2;
    } else if (startHour % 3 === 0) {
      increment = 3;
    }
  } else if (startHour % 4 === 0) {
    increment = 4;
  } else {
    increment = 3;
  }

  var intervals = [];
  var time = startHour;

  while (time <= latestLandingTime + increment) {
    intervals.push(time);
    time += increment;
  }

  numTicks = intervals.length;
  var intervalWidth = timeBarContainerWidth / (numTicks - 1);
  var dayWidths = [];
  var lastDayIdx = 0;

  var _iterator2 = _createForOfIteratorHelper(intervals.entries()),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _step2$value = src_slicedToArray(_step2.value, 2),
          idx = _step2$value[0],
          interval = _step2$value[1];

      if (interval % 24 === 0 && interval !== 0) {
        dayWidths.push(intervalWidth * (idx - lastDayIdx));
        lastDayIdx = idx;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  if (lastDayIdx !== intervals.length - 1) {
    dayWidths.push(intervalWidth * (intervals.length - 1 - lastDayIdx));
  }

  return {
    intervals: intervals,
    increment: increment,
    startHourOffset: startHour,
    dayWidths: dayWidths
  };
}

function createIndividualTimeBarPosition(fromTime, toTime, startDayOffset, endDayOffset, increment, startHourOffset) {
  /**
   * Basically this is what's happening here:
   * Intervals for 24 hours
   * [12am, 6am, 12pm, 6pm, 12am]
   * [0px, 100px, 200px, 300px, 400px]
   * If we want the whole thing to be 400 px, 400 px / 24 hours = 33.33 px/hr
   * So 6:05am would be (33.33 * 6) + (5 * 33.33/60) = start position in pixels
   * width = end position in pixels - start position in pixels
   */
  var totalHours = (numTicks - 1) * increment;
  var totalMinutes = totalHours * 60;
  var pxPerMinute = timeBarContainerWidth / totalMinutes;
  var minutesPerHour = 60;
  var minutesPerDay = minutesPerHour * 24;
  var positionAtMidnight = pxPerMinute * minutesPerDay;
  var startMinutesOffset = startDayOffset * minutesPerDay - startHourOffset * minutesPerHour; // if flight starts on a following day, happens with layovers

  var endMinutesOffset = endDayOffset * minutesPerDay - startHourOffset * minutesPerHour; // if flight ends on a following day, happens with long distance flights and layovers

  var fromTimeAttrs = convertTimeTo24HourClock(fromTime);
  var startTimeInMinutes = startMinutesOffset + fromTimeAttrs.minutes + fromTimeAttrs.hours * minutesPerHour;
  var toTimeAttrs = convertTimeTo24HourClock(toTime);
  var endTimeInMinutes = endMinutesOffset + toTimeAttrs.minutes + toTimeAttrs.hours * minutesPerHour;
  var startPositionPx = startTimeInMinutes * pxPerMinute;
  var endPositionPx = endTimeInMinutes * pxPerMinute;

  if (endPositionPx < startPositionPx) {
    endPositionPx += positionAtMidnight;
  }

  var timeBarWidth = endPositionPx - startPositionPx;
  return {
    timeBarWidth: timeBarWidth,
    startPositionPx: startPositionPx
  };
}
/******/ })()
;