/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/background/constants.ts
var PROVIDERS_NEEDING_RETURNS = ["expedia"];
var PROVIDERS_SUPPORTING_POINTS_SEARCH = ["expedia"];
var SUPPORTED_PROVIDERS = ["expedia" // "skyscanner",
// "southwest"
]; // eslint-disable-next-line @typescript-eslint/no-empty-function

var DEFAULT_ON_READY_FUNCTION = function DEFAULT_ON_READY_FUNCTION() {};
;// CONCATENATED MODULE: ./src/background/eventHandlers/clearSelections.ts
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


var handleClearSelections = function handleClearSelections(providerManager) {
  providerManager.setReturns([]);

  var _iterator = _createForOfIteratorHelper(PROVIDERS_NEEDING_RETURNS),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var providerName = _step.value;
      providerManager.setReady(providerName, false);
      providerManager.setOnReady(providerName, DEFAULT_ON_READY_FUNCTION);
      var tabId = providerManager.getTabId(providerName);

      if (tabId) {
        chrome.tabs.sendMessage(tabId, {
          event: "CLEAR_SELECTION"
        });
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};
;// CONCATENATED MODULE: ./src/shared/nameMaps/airlineMap.js
var AirlineMap = {
  airlineDetailsMap: {
    "American Airlines": {
      display: "American",
      color: "#C5423E",
      code: "AA"
    },
    American: {
      display: "American",
      color: "#C5423E",
      code: "AA"
    },
    Delta: {
      display: "Delta",
      color: "#EE722E",
      code: "DL"
    },
    Southwest: {
      display: "Southwest",
      color: "#F6C04D",
      code: "WN"
    },
    United: {
      display: "United",
      color: "#235EA6",
      code: "UA"
    },
    "Air Canada": {
      display: "Air Canada",
      color: "#E53222",
      code: "AC"
    },
    "Alaska Airlines": {
      display: "Alaska",
      color: "#51172C",
      code: "AS"
    },
    jetBlue: {
      display: "jetBlue",
      color: "#5F90C8",
      code: "B6"
    },
    "JetBlue Airways": {
      display: "jetBlue",
      color: "#5F90C8",
      code: "B6"
    },
    "Spirit Airlines": {
      display: "Spirit",
      color: "#BBB140",
      code: "NK"
    },
    WestJet: {
      display: "WestJet",
      color: "#4BA89C",
      code: "WS"
    },
    Aeromexico: {
      display: "Aeromexico",
      color: "#000000",
      code: "AM"
    },
    "Frontier Airlines": {
      display: "Frontier",
      color: "#378055",
      code: "F9"
    },
    // "Volaris": { display: "Volaris", color: "#84417B", code: "Y4" }, // Seems like Priceline doeesn't show Volaris
    Interjet: {
      display: "Interjet",
      color: "#A8A8A8",
      code: "4O"
    },
    // "Allegiant": { display: "Allegiant", color: "#CAB83D", code: "G4" }, // Seems like Priceline doesn't show Allegiant
    "Hawaiian Airlines": {
      display: "Hawaiian",
      color: "#4D388A",
      code: "HA"
    },
    // "VivaAerobus": { display: "VivaAerobus", color: "", code: "" }, // Seems like Priceline doesn't show VivaAerobus
    "Sun Country Airlines": {
      display: "Sun Country",
      color: "#D79A71",
      code: "SY"
    },
    "Porter Airlines": {
      display: "Porter",
      color: "#0F2B53",
      code: "PD"
    },
    // "Ryanair": {display: "Ryanair", color: "#ECC954", code: "FR" }, // Seems like Priceline doesn't show Ryanair
    "China Southern Airlines": {
      display: "China Southern",
      color: "#93ACCA",
      code: "CZ"
    },
    Lufthansa: {
      display: "Lufthansa",
      color: "#EFB95D",
      code: "LH"
    },
    SWISS: {
      display: "Swiss",
      color: "#D42D21",
      code: "LX"
    },
    "China Eastern Airlines": {
      display: "China Eastern",
      color: "#A9545F",
      code: "MU"
    },
    "British Airways": {
      display: "British",
      color: "#EA8E8C",
      code: "BA"
    },
    Iberia: {
      display: "Iberia",
      color: "#D05653",
      code: "IB"
    },
    "Air China": {
      display: "Air China",
      color: "#DF524B",
      code: "CA"
    },
    "Emirates Airlines": {
      display: "Emirates",
      color: "#CF534F",
      code: "EK"
    },
    "KLM-Royal Dutch Airlines": {
      display: "KLM",
      color: "#44A0DC",
      code: "KL"
    },
    "Air France": {
      display: "Air France",
      color: "#DB3832",
      code: "AF"
    },
    "Turkish Airlines": {
      display: "Turkish",
      color: "#DB3832",
      code: "TK"
    },
    "Cathay Pacific": {
      display: "Cathay",
      color: "#2A645A",
      code: "CX"
    },
    "Cathay Dragon": {
      display: "Cathay",
      color: "#2A645A",
      code: "CX"
    },
    "EVA Airways": {
      display: "EVA",
      color: "#6F9F64",
      code: "BR"
    },
    "China Airlines": {
      display: "China Airlines",
      color: "#DAABB1",
      code: "CI"
    },
    "ANA Airlines": {
      display: "ANA",
      color: "#254897",
      code: "NH"
    },
    "Japan Airlines": {
      display: "Japan Airlines",
      color: "#E56E69",
      code: "JL"
    },
    "Air India": {
      display: "Air India",
      color: "#D47346",
      code: "AI"
    },
    "Qantas Airways": {
      display: "Qantas",
      color: "#E34538",
      code: "QF"
    },
    "Singapore Airlines": {
      display: "Sinagpore",
      color: "#EFA952",
      code: "SQ"
    },
    "ANA (All Nippon Airways)": {
      display: "ANA",
      color: "#0f4a8d"
    }
  },
  getAirlineName: function getAirlineName(airlineName) {
    if (!airlineName || typeof airlineName !== "string") {
      return;
    }

    var formattedAirlineName = airlineName.trim();
    var airlineDetails = this.airlineDetailsMap[formattedAirlineName];

    if (airlineDetails) {
      formattedAirlineName = airlineDetails.display;
    }

    return formattedAirlineName;
  },
  getAirlineDetails: function getAirlineDetails(airlineName) {
    var formattedAirlineName = airlineName.trim();
    return this.airlineDetailsMap[formattedAirlineName] || {
      display: formattedAirlineName,
      color: "#DFCCFB"
    };
  }
};
/* harmony default export */ const airlineMap = (AirlineMap);
;// CONCATENATED MODULE: ./src/shared/nameMaps/regionalAirlines.js
var regionalAirlines = ["Aer Lingus Regional", "Aeromexico Connect", "SkyWest", "Alaska Horizon", "Horizon Air", "Alitalia CityLiner", "Air Canada Express", "Air New Zealand Link", "American Eagle", "Delta Connection", "Fiji Link", "HOP!", "Iberia Regional", "KLM Cityhopper", "Lufthansa Regional", "Moçambique Expresso", "Ohana by Hawaiian", "PAL Express", "QantasLink", "South African Express", "TAP Express", "Tunisair Express", "United Express", "Virgin Australia Regional Airlines", "WestJet Encore", "WestJet Link"];

function isRegionalAirline(airline) {
  var airlineTarget = airline.toLowerCase();
  var found = regionalAirlines.find(function (regional) {
    return airlineTarget.includes(regional.toLowerCase());
  });
  return Boolean(found);
}

/* harmony default export */ const nameMaps_regionalAirlines = (isRegionalAirline);
;// CONCATENATED MODULE: ./src/utilityFunctions.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || utilityFunctions_unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function utilityFunctions_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return utilityFunctions_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return utilityFunctions_arrayLikeToArray(o, minLen); }

function utilityFunctions_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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


;// CONCATENATED MODULE: ./src/dataModels.js
function dataModels_slicedToArray(arr, i) { return dataModels_arrayWithHoles(arr) || dataModels_iterableToArrayLimit(arr, i) || dataModels_unsupportedIterableToArray(arr, i) || dataModels_nonIterableRest(); }

function dataModels_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function dataModels_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return dataModels_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return dataModels_arrayLikeToArray(o, minLen); }

function dataModels_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function dataModels_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function dataModels_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




/**
 * Flight {
 *  id: <fromTime-toTime-airline>,
 *  fromTime: "", YYYY-MM-DDTHH-MM // TODO standardize datetime
 *  toTime: "",
 *  duration: "",
 *  airline: "", // TODO change to list for multiple airlines (layovers) and marketing vs operating
 *  itinIds: [""],
 *  layovers: [Layover] // TODO
 * }
 * @param {string} fromTime
 * @param {string} toTime
 * @param {string} operatingAirline
 * @param {string} marketingAirline
 * @param {string} duration
 */

function Flight(fromTime, toTime, operatingAirline, marketingAirline, duration, layovers) {
  this.fromTime = fromTime;
  this.toTime = toTime;
  this.fromTimeDetails = getTimeDetails(fromTime);
  this.toTimeDetails = getTimeDetails(toTime);
  var opAirline = operatingAirline ? operatingAirline.replace("Operated by", "").replace("Partially operated by", "") : operatingAirline;
  opAirline = airlineMap.getAirlineName(opAirline);
  var markAirline = airlineMap.getAirlineName(marketingAirline); // operating airline is what is primarily displayed
  // marketing airline is used to create the id

  if (opAirline) {
    var isPartiallyOperated = operatingAirline.includes("Partially operated by");

    if (nameMaps_regionalAirlines(opAirline) || isPartiallyOperated) {
      // regional airlines don't get the primary airline spot
      // they'll be displayed where we display marketing airlines
      this.operatingAirline = markAirline;

      if (isPartiallyOperated) {
        this.marketingAirlineText = operatingAirline;
      } else {
        this.marketingAirlineText = "Operated by ".concat(opAirline);
      }
    } else {
      this.operatingAirline = opAirline;
      this.marketingAirlineText = "Marketed by ".concat(markAirline);
    }
  } else {
    // operating and marketing are the same airline
    this.operatingAirline = markAirline;
  }

  this.operatingAirline = cleanupAirline(this.operatingAirline); // marketing airline is unique, not operating

  this.id = "".concat(this.fromTime, "-").concat(this.toTime, "-").concat(markAirline);
  this.duration = duration;
  this.durationMinutes = convertDurationToMinutes(duration);
  this.layovers = layovers || [];
  this.itinIds = [];
  this.timezoneOffset = this.calculateTimezoneOffset();
}

function cleanupAirline(airline) {
  var justAirlines = [airline];

  if (airline.includes("Partially operated by")) {
    justAirlines = airline.split("Partially operated by ");
  } else if (airline.includes("Operated by")) {
    justAirlines = airline.split("Operated by");
  }

  var justAirline = justAirlines[justAirlines.length - 1].trim();
  var airlines = justAirline.split(" + ");
  var shortAirlineName;

  if (airlines.length === 1) {
    shortAirlineName = airlines[0];
  } else {
    shortAirlineName = airlines.map(function (airline) {
      return airlineMap.getAirlineName(airline.replace("  ", " "));
    }).join(", ");
  }

  return airlineMap.getAirlineDetails(shortAirlineName.replace("  ", " "));
}

Flight.prototype.calculateTimezoneOffset = function () {
  var _this = this;

  var totalTimezoneOffset = 0;

  if (!this.layovers.length) {
    totalTimezoneOffset = getTimezoneOffset(this.fromTime, this.toTime, this.duration);
  } else {
    var layovers = this.layovers.map(function (_ref, idx) {
      var fromTime = _ref.fromTime,
          toTime = _ref.toTime,
          duration = _ref.duration,
          operatingAirline = _ref.operatingAirline;
      totalTimezoneOffset += getTimezoneOffset(fromTime, toTime, duration);
      return _objectSpread(_objectSpread({}, _this.layovers[idx]), {}, {
        operatingAirline: cleanupAirline(operatingAirline),
        timezoneOffset: totalTimezoneOffset
      });
    });
    var layoversWithStops = [];

    for (var i = 0; i < layovers.length - 1; i++) {
      var previousFlight = layovers[i];
      var nextFlight = layovers[i + 1];
      var fromTime = previousFlight.toTime,
          from = previousFlight.to;
      var toTime = nextFlight.fromTime,
          to = nextFlight.from; // could do this check here
      // if (isOvernight(fromTime, toTime)) {
      //   toTime += "+1";
      // }

      layoversWithStops.push(previousFlight);
      layoversWithStops.push({
        fromTime: fromTime,
        toTime: toTime,
        from: from,
        to: to,
        isLayoverStop: true,
        operatingAirline: {
          display: "Layover at ".concat(from, "."),
          color: "transparent"
        }
      });
    }

    layoversWithStops.push(layovers[layovers.length - 1]);
    this.layovers = layoversWithStops;
  }

  return totalTimezoneOffset;
}; // TODO
// Flight.prototype.addLayover = function(layover) {
//   // new Layover(layover)
//   this.layovers.push(layover);
// };

/**
 * Layover {
 *   from: "",
 *   to: "",
 *   duration: "",
 *   fromTime: "",
 *   toTime: "",
 *   airline: "",
 *   duration: "",
 * }
 */

/**
 * @param {object} flights
 * @param {object} itins
 * @returns {array} list of departures
 */


function sortFlights(flights, itins) {
  for (var _i = 0, _Object$entries = Object.entries(flights); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = dataModels_slicedToArray(_Object$entries[_i], 2),
        k = _Object$entries$_i[0],
        v = _Object$entries$_i[1];

    var airportChange = 1;

    if (v.layovers.length) {
      for (var i = 1; i < v.layovers.length; i++) {
        if (v.layovers[i - 1].to !== v.layovers[i].from) {
          airportChange = 2;
          break;
        }
      }
    }

    var price = itins[v.itinIds.sort(function (a, b) {
      return itins[a].fareNumber - itins[b].fareNumber;
    })[0]].fareNumber;
    v.pain = (Math.log2(v.durationMinutes) + Math.log2(price) + v.layovers.length) * airportChange;
  }

  return Object.values(flights).sort(function (a, b) {
    return a.pain - b.pain;
  });
}
/**
 * Itin {
 *   id: <dep_flight_id>-<ret_flight_id>,
 *   depFlight: Flight,
 *   retFlight: Flight,
 *   provider: "",
 *   tab_id: Number,
 *   window_id: Number,
 *   fare: ""
 * }
 * @param {object} depFlight
 * @param {object} retFlight
 * @param {number} fare
 * @param {string} currency
 * @param {string} provider
 * @param {number} windowId
 * @param {number} tabId
 */


function Itin(depFlight, retFlight, fare, currency, provider, windowId, tabId, makeRetFlightOnly) {
  if (makeRetFlightOnly) {
    this.depFlight = depFlight;
  } else {
    this.depFlight = new Flight(depFlight.fromTime, depFlight.toTime, depFlight.operatingAirline, depFlight.marketingAirline, depFlight.duration, depFlight.layovers);
  }

  if (retFlight) {
    this.retFlight = new Flight(retFlight.fromTime, retFlight.toTime, retFlight.operatingAirline, retFlight.marketingAirline, retFlight.duration, retFlight.layovers);
    this.id = "".concat(this.depFlight.id, "-").concat(this.retFlight.id);
  } else {
    this.id = this.depFlight.id;
  }

  this.provider = provider;
  this.windowId = windowId;
  this.tabId = tabId; // String interpolate to make sure we're dealing with a string

  this.fareNumber = Number("".concat(fare).match(/\d+/g).join(""));
  this.currency = currency;
}

function findReturnFlights(depFlight, itins) {
  return depFlight.itinIds.map(function (itinId) {
    return itins[itinId].retFlight;
  });
}
/**
 *
 * @param {array} itinCollection
 * @param {string} provider
 * @param {number} windowId
 * @param {number} tabId
 * @returns {object} {itins, departures, returns}
 */


function makeItins(itinCollection, departures, itins, provider, windowId, tabId) {
  var makeRetFlightOnly = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var returns = {};
  itinCollection.forEach(function (ic) {
    var itin = new Itin(ic.departureFlight, ic.returnFlight, ic.fare, ic.currency, provider, windowId, tabId, makeRetFlightOnly); // the deduping flights part

    if (departures[itin.depFlight.id]) {
      // set flight to existing instance
      // depFlight is just a Flight, not an itin, so this is okay
      itin.depFlight = departures[itin.depFlight.id];
    } else {
      // add new flight
      departures[itin.depFlight.id] = itin.depFlight;
    }

    if (itin.retFlight) {
      if (returns[itin.retFlight.id]) {
        // set flight to existing instance
        itin.retFlight = returns[itin.retFlight.id];
      } else {
        // add new flight
        returns[itin.retFlight.id] = itin.retFlight;
      }

      itin.retFlight.itinIds.push(itin.id);
    }

    itin.depFlight.itinIds.push(itin.id); // if (itins[itin.id]) {
    //   // this can happen if the same itin exists across different providers
    //   itins[itin.id].push(itin);
    // } else {
    //   itins[itin.id] = [itin];
    // }

    itins[itin.id] = itin;
  });
  return {
    itins: itins,
    departures: departures,
    returns: returns
  };
}


;// CONCATENATED MODULE: ./src/background/eventHandlers/departureSelected.ts
function departureSelected_createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = departureSelected_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function departureSelected_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return departureSelected_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return departureSelected_arrayLikeToArray(o, minLen); }

function departureSelected_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var handleDepartureSelected = function handleDepartureSelected(providerManager, departureId) {
  var _providerManager$getF;

  if (!((_providerManager$getF = providerManager.getFormData()) !== null && _providerManager$getF !== void 0 && _providerManager$getF.roundtrip)) {
    return;
  }

  var departure = providerManager.getDeparture(departureId);
  /*
     itin needs to be set to {} for Southwest
     Southwest allItins ids includes return id because we know that info
     but message.departureId is still just departure id.
  */

  var itineraries = providerManager.getItineraries();
  var departureItineraries = departure.itinIds.flatMap(function (itinId) {
    return itineraries[itinId];
  });
  var departureProviders = departureItineraries.map(function (itinerary) {
    return itinerary.provider;
  });

  if (hasReturnProviders(departureProviders)) {
    requestNoRoundtripProviderReturns(departure, providerManager, departureProviders, departureItineraries);
  } else {
    getRoundtripProviderReturns(departure, providerManager);
  }
};

var hasReturnProviders = function hasReturnProviders(departureProviders) {
  return PROVIDERS_NEEDING_RETURNS.some(function (providerName) {
    return departureProviders.includes(providerName);
  });
};

var requestNoRoundtripProviderReturns = function requestNoRoundtripProviderReturns(departure, providerManager, departureProviders, departureItineraries) {
  var _iterator = departureSelected_createForOfIteratorHelper(departureProviders),
      _step;

  try {
    var _loop = function _loop() {
      var providerName = _step.value;
      var tabId = providerManager.getTabId(providerName);

      if (tabId) {
        var getReturns = function getReturns() {
          chrome.tabs.sendMessage(tabId, {
            event: "GET_RETURN_FLIGHTS",
            departure: departure,
            itin: departureItineraries[departureProviders.indexOf(providerName)]
          });
          providerManager.setTimer(providerName, 10000, function () {
            // @ts-ignore
            Sentry.captureException(new Error("Scraper failed for ".concat(providerName, " return flights")), {
              extra: providerManager.getFormData()
            });
          });
        };

        if (providerManager.getReady(providerName)) {
          getReturns();
        } else {
          providerManager.setOnReady(providerName, getReturns);
        }
      }
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};

var getRoundtripProviderReturns = function getRoundtripProviderReturns(departure, providerManager) {
  var itineraries = providerManager.getItineraries();
  var returnList = sortFlights(findReturnFlights(departure, itineraries), itineraries);
  var message = {
    event: "RETURN_FLIGHTS_FOR_CLIENT",
    flights: {
      returnList: returnList
    }
  };
  providerManager.sendMessageToIndexPage(message);
};
;// CONCATENATED MODULE: ./src/background/eventHandlers/dispatchBeginParsing.ts
var handleDispatchBeginParsing = function handleDispatchBeginParsing(providerManager, providerName, timeout) {
  var tabId = providerManager.getTabId(providerName);

  if (tabId) {
    setTimeout(function () {
      chrome.tabs.sendMessage(tabId, {
        event: "BEGIN_PARSING",
        formData: providerManager.getFormData()
      });
    }, timeout);
  }
};
;// CONCATENATED MODULE: ./src/background/eventHandlers/flightResultsReceived.ts
function flightResultsReceived_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function flightResultsReceived_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { flightResultsReceived_ownKeys(Object(source), true).forEach(function (key) { flightResultsReceived_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { flightResultsReceived_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function flightResultsReceived_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var handleFlightResultsReceived = function handleFlightResultsReceived(providerManager, flights, providerName) {
  // if (departureSelected) {
  //   break;
  // } // WHY?!?
  if (flights.length === 0) {
    return; // TODO: Enhance
  }

  var windowId = providerManager.getWindowId(providerName);
  var tabId = providerManager.getTabId(providerName);

  if (!windowId || !tabId) {
    // TODO: Better handle
    return;
  } // @ts-ignore


  var _makeItins = makeItins(flights, providerManager.getDepartures(), providerManager.getItineraries(), providerName, windowId, tabId),
      departures = _makeItins.departures,
      itineraries = _makeItins.itins;

  providerManager.setItineraries(flightResultsReceived_objectSpread({}, itineraries));
  providerManager.setDepartures(flightResultsReceived_objectSpread({}, departures));
  var allDepartures = providerManager.getDepartures();
  var allItineraries = providerManager.getItineraries();
  var departuresToSend = sortFlights(allDepartures, allItineraries);
  var nextMessage = {
    event: "FLIGHT_RESULTS_FOR_CLIENT",
    flights: {
      departureList: departuresToSend,
      itins: allItineraries
    },
    tabId: tabId,
    formData: providerManager.getFormData()
  };
  providerManager.sendMessageToIndexPage(nextMessage);
};
;// CONCATENATED MODULE: ./src/background/eventHandlers/flightReturnResultsReceived.ts
function flightReturnResultsReceived_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function flightReturnResultsReceived_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { flightReturnResultsReceived_ownKeys(Object(source), true).forEach(function (key) { flightReturnResultsReceived_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { flightReturnResultsReceived_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function flightReturnResultsReceived_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var handleFlightReturnResultsReceived = function handleFlightReturnResultsReceived(providerManager, flights, providerName) {
  // for providers that show returns separate from departures,
  // and only once you select a departure.
  if (flights.length === 0) {
    return; // TODO: Enhance
  }

  var windowId = providerManager.getWindowId(providerName);
  var tabId = providerManager.getTabId(providerName);

  if (!windowId || !tabId) {
    // TODO: Better handle
    return;
  } // @ts-ignore


  var _makeItins = makeItins(flights, providerManager.getDepartures(), providerManager.getItineraries(), providerName, windowId, tabId, true),
      returns = _makeItins.returns,
      itineraries = _makeItins.itins;

  var existingItineraries = providerManager.getItineraries();

  var allItins = flightReturnResultsReceived_objectSpread(flightReturnResultsReceived_objectSpread({}, existingItineraries), itineraries);

  providerManager.setItineraries(allItins);
  var returnList = sortFlights(Object.values(returns), allItins); // TODO dedup returns

  providerManager.setReturns(returnList);
  var nextMessage = {
    event: "RETURN_FLIGHTS_FOR_CLIENT",
    flights: {
      returnList: providerManager.getReturns(),
      itins: itineraries
    }
  };
  providerManager.sendMessageToIndexPage(nextMessage);
};
;// CONCATENATED MODULE: ./src/shared/focusTab.ts
var focusTab = function focusTab(windowId, tabId) {
  chrome.windows.update(windowId, {
    focused: true
  }, function (win) {
    chrome.tabs.update(tabId, {
      selected: true
    });
  });
};
;// CONCATENATED MODULE: ./src/background/eventHandlers/focusWebpage.ts

var handleFocusWebpage = function handleFocusWebpage(providerManager) {
  providerManager.sendMessageToIndexPage({
    event: "FOCUS_WEBPAGE_CLIENT"
  });
  var windowId = providerManager.getPrimaryWindowId();
  var tabId = providerManager.getPrimaryTabId();

  if (windowId !== null && windowId !== undefined && tabId !== null && tabId !== undefined) {
    focusTab(windowId, tabId);
  }
};
;// CONCATENATED MODULE: ./src/background/eventHandlers/formDataReceived.ts
function formDataReceived_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function formDataReceived_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { formDataReceived_ownKeys(Object(source), true).forEach(function (key) { formDataReceived_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { formDataReceived_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function formDataReceived_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var handleFormDataReceived = function handleFormDataReceived(providerManager, formData, windowConfig) {
  formData = formDataReceived_objectSpread(formDataReceived_objectSpread({}, formData), {}, {
    from: formData.from.toUpperCase(),
    to: formData.to.toUpperCase()
  });
  providerManager.searchForResults(formData, windowConfig); // clean up incase user is doing a different search
  // closeWindows();
  // allDepartures = {};
  // allItins = {};
  // departureSelected = false;
  // messageQueue = [];
  // providersReceived = new Set();
  // failedProviders = new Set();
  // canHighlightSkyscannerTab = false;
  // returnList = [];
  // providersTimeoutIds = {};
  // isExpediaReady = true;
  // expediaMessage = null;
  //
  // if (webPageTabId) {
  //   chrome.tabs.sendMessage(webPageTabId, {
  //     event: "RESET_SEARCH",
  //     formData,
  //   });
  // }
};
;// CONCATENATED MODULE: ./src/background/eventHandlers/highlightTab.ts
var handleHighlightTab = function handleHighlightTab(providerManager, departureId, returnId) {
  var key = departureId;

  if (returnId) {
    key += "-".concat(returnId);
  }

  var itinerary = providerManager.getItineraries()[key];
  highlightTab(providerManager, itinerary);
};

function highlightTab(providerManager, itinerary) {
  var _providerManager$getF;

  if ((_providerManager$getF = providerManager.getFormData()) !== null && _providerManager$getF !== void 0 && _providerManager$getF.searchByPoints) {
    chrome.tabs.create({
      url: "https://flightpenguin.com/flight-penguin-points"
    });
    return;
  }

  var windowId = providerManager.getWindowId(itinerary.provider);

  if (windowId !== null && windowId !== undefined && itinerary.tabId !== null && itinerary.tabId !== undefined) {
    chrome.windows.update(windowId, {
      focused: true
    }, function (win) {
      chrome.tabs.sendMessage(itinerary.tabId, {
        event: "HIGHLIGHT_FLIGHT",
        selectedDepartureId: itinerary.depFlight.id,
        selectedReturnId: itinerary.retFlight ? itinerary.retFlight.id : "",
        provider: itinerary.provider
      });
      chrome.tabs.update(itinerary.tabId, {
        selected: true
      });
    });
  }
}
;// CONCATENATED MODULE: ./src/background/eventHandlers/noFlightsFound.ts
var handleNoFlightsFound = function handleNoFlightsFound(providerManager, providerName) {
  providerManager.setSuccessful(providerName, 0);

  if (providerManager.isComplete() && providerManager.getTotalFlightCount() === 0) {
    providerManager.sendMessageToIndexPage({
      event: "NO_FLIGHTS_FOUND_CLIENT"
    });
    providerManager.closeWindows();
  } // Sentry.captureException(
  //   new Error(`No flights found ${message.provider}`, {
  //     extra: formData,
  //   }),
  // );

};
;// CONCATENATED MODULE: ./src/background/eventHandlers/providerReady.ts

var handleProviderReady = function handleProviderReady(providerManager, providerName) {
  providerManager.setReady(providerName, true);
  var onReadyFunction = providerManager.getOnReady(providerName);
  onReadyFunction();
  providerManager.setOnReady(providerName, DEFAULT_ON_READY_FUNCTION);
};
;// CONCATENATED MODULE: ./src/background/eventHandlers/scraperFailed.ts
var handleScraperFailed = function handleScraperFailed(providerManager, providerName, errorDescription) {
  providerManager.setFailed(providerName);

  if (providerManager.isComplete() && providerManager.getTotalFlightCount() === 0) {
    providerManager.sendMessageToIndexPage({
      event: "FAILED_SCRAPER_CLIENT"
    });
    providerManager.closeWindows();
  } // @ts-ignore


  window.Sentry.captureException(new Error("Scraper failed for ".concat(providerName)), {
    extra: providerManager.getFormData(),
    details: errorDescription
  });
};
;// CONCATENATED MODULE: ./src/background/eventHandlers/index.ts











;// CONCATENATED MODULE: ./src/expedia/mappings/cabin.ts
var cabinMap = {
  econ: "economy",
  prem_econ: "premium_economy",
  business: "business",
  first: "first"
};
;// CONCATENATED MODULE: ./src/expedia/mappings/getUrl.ts
function getUrl_slicedToArray(arr, i) { return getUrl_arrayWithHoles(arr) || getUrl_iterableToArrayLimit(arr, i) || getUrl_unsupportedIterableToArray(arr, i) || getUrl_nonIterableRest(); }

function getUrl_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function getUrl_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return getUrl_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return getUrl_arrayLikeToArray(o, minLen); }

function getUrl_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getUrl_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function getUrl_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var getUrl = function getUrl(formData) {
  /**
   * URLs from search results page, different from a search from the homepage
   * oneway
   * https://www.expedia.com/Flights-Search?mode=search&trip=oneway&leg1=from:SFO,to:JFK,departure:12/20/2020TANYT&leg2=from:JFK,to:SFO,departure:12/23/2020TANYT&passengers=adults:1,children:0,infantinlap:N&options=carrier:*,cabinclass:economy,maxhops:1,nopenalty:N&pageId=0
   *
   * roundtrip
   * https://www.expedia.com/Flights-Search?mode=search&trip=roundtrip&leg1=from:SFO,to:JFK,departure:12/20/2020TANYT&leg2=from:JFK,to:SFO,departure:12/25/2020TANYT&passengers=adults:1,children:0,infantinlap:N&options=carrier:*,cabinclass:first,maxhops:1,nopenalty:N&pageId=0
   *
   **/
  var from = formData.from,
      to = formData.to,
      fromDate = formData.fromDate,
      toDate = formData.toDate,
      numPax = formData.numPax,
      cabin = formData.cabin,
      roundtrip = formData.roundtrip;
  var startDate = formatDate(fromDate);
  var tripType = roundtrip ? "roundtrip" : "oneway";
  var url = "https://www.expedia.com/Flights-Search?mode=search&trip=".concat(tripType, "&leg1=from:").concat(from, ",to:").concat(to, ",departure:").concat(startDate, "TANYT&leg2=from:").concat(to, ",to:").concat(from, ",");

  if (roundtrip) {
    var endDate = formatDate(toDate);
    url += "departure:".concat(endDate, "TANYT");
  } else {
    url += "departure:".concat(startDate, "TANYT");
  }

  url += "&passengers=adults:".concat(numPax, ",children:0,seniors:0,infantinlap:N&options=carrier:*,");
  url += "cabinclass:".concat(cabinMap[cabin || "econ"], ",");
  url += "maxhops:1,nopenalty:N&pageId=0";
  return url;
};

var formatDate = function formatDate(dateString) {
  var _dateString$split = dateString.split("-"),
      _dateString$split2 = getUrl_slicedToArray(_dateString$split, 3),
      year = _dateString$split2[0],
      month = _dateString$split2[1],
      day = _dateString$split2[2];

  return [month, day, year].join("/");
};
;// CONCATENATED MODULE: ./src/shared/pause.ts
function pause() {
  var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10000;
  return new Promise(function (resolve) {
    setTimeout(resolve, timeout);
  });
}
;// CONCATENATED MODULE: ./src/skyscanner/mappings/cabin.ts
var cabin_cabinMap = {
  econ: "economy",
  prem_econ: "premiumeconomy",
  business: "business",
  first: "first"
};
;// CONCATENATED MODULE: ./src/skyscanner/mappings/getUrl.ts

var getUrl_getUrl = function getUrl(formData) {
  var from = formData.from,
      to = formData.to,
      fromDate = formData.fromDate,
      toDate = formData.toDate,
      numPax = formData.numPax,
      cabin = formData.cabin,
      roundtrip = formData.roundtrip;
  var startDate = fromDate.replace(/-/g, "").slice(2);
  var url = "https://www.skyscanner.com/transport/flights/".concat(from, "/").concat(to, "/").concat(startDate, "/");

  if (roundtrip) {
    var endDate = toDate.replace(/-/g, "").slice(2);
    url += "".concat(endDate, "/");
  }

  return "".concat(url, "?adults=").concat(numPax, "&children=0&adultsv2=").concat(numPax, "&childrenv2=&infants=0&cabinclass=").concat(cabin_cabinMap[cabin || "econ"]);
};
;// CONCATENATED MODULE: ./src/southwest/mappings/getUrl.ts
var mappings_getUrl_getUrl = function getUrl(formData) {
  var from = formData.from,
      to = formData.to,
      fromDate = formData.fromDate,
      toDate = formData.toDate,
      numPax = formData.numPax,
      roundtrip = formData.roundtrip;
  var fromCaps = from.toUpperCase();
  var toCaps = to.toUpperCase();
  var url = "https://www.southwest.com/air/booking/select.html?adultPassengersCount=".concat(numPax, "&departureDate=").concat(fromDate, "&departureTimeOfDay=ALL_DAY&destinationAirportCode=").concat(toCaps, "&fareType=USD&int=HOMEQBOMAIR&originationAirportCode=").concat(fromCaps, "&passengerType=ADULT&reset=true&seniorPassengersCount=0");
  url += roundtrip ? "&returnDate=".concat(toDate, "&returnTimeOfDay=ALL_DAY&tripType=roundtrip") : "&returnDate=&returnTimeOfDay=ALL_DAY&tripType=oneway";
  return url;
};
;// CONCATENATED MODULE: ./src/background/state/isExtensionOpen.ts
var isExtensionOpen = function isExtensionOpen(_ref) {
  var extensionOpenCallback = _ref.extensionOpenCallback,
      extensionClosedCallback = _ref.extensionClosedCallback;
  var url = getExtensionUrl();
  chrome.tabs.query({}, function (tabs) {
    var tab = tabs.find(function (tab) {
      return tab.url === url;
    });

    if (tab) {
      extensionOpenCallback(tab);
    } else {
      extensionClosedCallback();
    }
  });
};

var getExtensionUrl = function getExtensionUrl() {
  var extensionId = chrome.runtime.id;
  return "chrome-extension://".concat(extensionId, "/index.html");
};
;// CONCATENATED MODULE: ./src/background/ProviderManager.ts
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }







var terminalStates = ["FAILED", "SUCCESS"];
var successStates = ["SUCCESS"];
var providerURLBaseMap = {
  southwest: mappings_getUrl_getUrl,
  skyscanner: getUrl_getUrl,
  expedia: getUrl
};
var ProviderManager = /*#__PURE__*/function () {
  function ProviderManager() {
    _classCallCheck(this, ProviderManager);

    this.knownProviders = [];
    this.state = {};
    this.itineraries = {};
    this.departures = {};
    this.returns = [];
    this.formData = null;
    this.primaryTab = null;
    this.setPrimaryTab();
    this.setupClosePrimaryTabListener();
  }

  _createClass(ProviderManager, [{
    key: "setupClosePrimaryTabListener",
    value: function setupClosePrimaryTabListener() {
      var primaryTabId = this.getPrimaryTabId(); // eslint-disable-next-line @typescript-eslint/no-this-alias

      var that = this;
      chrome.tabs.onRemoved.addListener(function (tabId) {
        if (tabId === primaryTabId) {
          that.closeWindows();
        }
      });
    }
  }, {
    key: "getPrimaryTabId",
    value: function getPrimaryTabId() {
      var _this$primaryTab;

      return (_this$primaryTab = this.primaryTab) === null || _this$primaryTab === void 0 ? void 0 : _this$primaryTab.id;
    }
  }, {
    key: "getPrimaryTabIndex",
    value: function getPrimaryTabIndex() {
      var _this$primaryTab2;

      return (_this$primaryTab2 = this.primaryTab) === null || _this$primaryTab2 === void 0 ? void 0 : _this$primaryTab2.index;
    }
  }, {
    key: "getPrimaryWindowId",
    value: function getPrimaryWindowId() {
      var _this$primaryTab3;

      return (_this$primaryTab3 = this.primaryTab) === null || _this$primaryTab3 === void 0 ? void 0 : _this$primaryTab3.windowId;
    }
  }, {
    key: "setFormData",
    value: function setFormData(formData) {
      this.formData = formData;
      this.knownProviders = this.formData.searchByPoints ? PROVIDERS_SUPPORTING_POINTS_SEARCH : SUPPORTED_PROVIDERS;
      this.setDefault();
    }
  }, {
    key: "getFormData",
    value: function getFormData() {
      return this.formData;
    }
  }, {
    key: "setPending",
    value: function setPending(providerName) {
      this.state[providerName]["status"] = "PENDING";
      this.setFlightCount(providerName, 0);
    }
  }, {
    key: "setFailed",
    value: function setFailed(providerName) {
      var flightCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.state[providerName]["status"] = "FAILED";
      this.setFlightCount(providerName, flightCount);
    }
  }, {
    key: "setSuccessful",
    value: function setSuccessful(providerName, flightCount) {
      this.state[providerName]["status"] = "SUCCESS";
      this.setFlightCount(providerName, flightCount);
    }
  }, {
    key: "setPartialReturn",
    value: function setPartialReturn(providerName, flightCountBatchSize) {
      this.state[providerName]["status"] = "PARTIAL_RETURN_CONTINUING";
      var currentCount = this.getFlightCount(providerName);
      return currentCount + flightCountBatchSize;
    }
  }, {
    key: "getStatus",
    value: function getStatus(providerName) {
      return this.state[providerName]["status"];
    }
  }, {
    key: "isProviderComplete",
    value: function isProviderComplete(providerName) {
      var status = this.getStatus(providerName);
      return terminalStates.includes(status);
    }
  }, {
    key: "isComplete",
    value: function isComplete() {
      var _this = this;

      return this.knownProviders.every(function (providerName) {
        _this.isProviderComplete(providerName);
      });
    }
  }, {
    key: "isProviderSuccessful",
    value: function isProviderSuccessful(providerName) {
      var status = this.getStatus(providerName);
      return successStates.includes(status);
    }
  }, {
    key: "isSuccessful",
    value: function isSuccessful() {
      var _this2 = this;

      return this.knownProviders.every(function (providerName) {
        _this2.isProviderSuccessful(providerName);
      });
    }
  }, {
    key: "getItineraries",
    value: function getItineraries() {
      return this.itineraries;
    }
  }, {
    key: "addItineraries",
    value: function addItineraries(itineraries) {
      var _this3 = this;

      itineraries.entries().forEach(function (key, value) {
        _this3.itineraries[key] = value;
      });
    }
  }, {
    key: "setItineraries",
    value: function setItineraries(itineraries) {
      this.itineraries = itineraries;
    }
  }, {
    key: "getDepartures",
    value: function getDepartures() {
      return this.departures;
    }
  }, {
    key: "getDeparture",
    value: function getDeparture(departureId) {
      return this.departures[departureId];
    }
  }, {
    key: "addDepartures",
    value: function addDepartures(departures) {
      var _this4 = this;

      departures.entries().forEach(function (key, value) {
        _this4.departures[key] = value;
      });
    }
  }, {
    key: "setDepartures",
    value: function setDepartures(departures) {
      this.departures = departures;
    }
  }, {
    key: "getReturns",
    value: function getReturns() {
      return this.returns;
    }
  }, {
    key: "addReturns",
    value: function addReturns(returns) {
      var _this5 = this;

      returns.entries().forEach(function (key, value) {
        _this5.returns[key] = value;
      });
    }
  }, {
    key: "setReturns",
    value: function setReturns(returns) {
      this.returns = returns;
    }
  }, {
    key: "setFlightCount",
    value: function setFlightCount(providerName, flightCount) {
      this.state[providerName]["flightCount"] = flightCount;
    }
  }, {
    key: "getFlightCount",
    value: function getFlightCount(providerName) {
      return this.state[providerName]["flightCount"];
    }
  }, {
    key: "setReady",
    value: function setReady(providerName, value) {
      this.state[providerName].ready = value;
    }
  }, {
    key: "getReady",
    value: function getReady(providerName) {
      return this.state[providerName].ready;
    }
  }, {
    key: "setOnReady",
    value: function setOnReady(providerName, callback) {
      this.state[providerName].onReady = callback;
    }
  }, {
    key: "getOnReady",
    value: function getOnReady(providerName) {
      return this.state[providerName].onReady;
    }
  }, {
    key: "setDefault",
    value: function setDefault() {
      var _this6 = this;

      this.knownProviders.forEach(function (providerName) {
        _this6.state[providerName] = {
          status: "PENDING",
          flightCount: 0,
          ready: true,
          onReady: DEFAULT_ON_READY_FUNCTION,
          timer: null
        };
      });
      this.itineraries = {};
      this.departures = {};
      this.returns = [];
    }
  }, {
    key: "setTimer",
    value: function setTimer(providerName, timeout, callback) {
      this.state[providerName].timer = setTimeout(callback, timeout);
    }
  }, {
    key: "getTimer",
    value: function getTimer(providerName) {
      return this.state[providerName].timer;
    }
  }, {
    key: "clearTimeout",
    value: function (_clearTimeout) {
      function clearTimeout(_x) {
        return _clearTimeout.apply(this, arguments);
      }

      clearTimeout.toString = function () {
        return _clearTimeout.toString();
      };

      return clearTimeout;
    }(function (providerName) {
      var timer = this.state[providerName].timer;

      if (timer) {
        clearTimeout(timer);
        this.state[providerName].timer = null;
      }
    })
  }, {
    key: "setTab",
    value: function setTab(providerName, tab) {
      this.state[providerName]["tab"] = tab;
    }
  }, {
    key: "setWindow",
    value: function setWindow(providerName, window) {
      this.state[providerName]["window"] = window;
    }
  }, {
    key: "getTabId",
    value: function getTabId(providerName) {
      var _this$state$providerN;

      return (_this$state$providerN = this.state[providerName].tab) === null || _this$state$providerN === void 0 ? void 0 : _this$state$providerN.id;
    }
  }, {
    key: "getTabIndex",
    value: function getTabIndex(providerName) {
      var _this$state$providerN2;

      return (_this$state$providerN2 = this.state[providerName].tab) === null || _this$state$providerN2 === void 0 ? void 0 : _this$state$providerN2.index;
    }
  }, {
    key: "getWindowId",
    value: function getWindowId(providerName) {
      var _this$state$providerN3;

      return (_this$state$providerN3 = this.state[providerName].window) === null || _this$state$providerN3 === void 0 ? void 0 : _this$state$providerN3.id;
    }
  }, {
    key: "setPrimaryTab",
    value: function setPrimaryTab() {
      var _this7 = this;

      isExtensionOpen({
        extensionOpenCallback: function extensionOpenCallback(tab) {
          _this7.primaryTab = tab;
        },
        extensionClosedCallback: function extensionClosedCallback() {
          // Simpler than polling for status...
          pause(500).then(function () {
            _this7.setPrimaryTab();
          });
        }
      });
    }
  }, {
    key: "createWindow",
    value: function createWindow(url, provider, windowConfig, formData) {
      var height = windowConfig.height,
          width = windowConfig.width,
          left = windowConfig.left,
          top = windowConfig.top; // eslint-disable-next-line @typescript-eslint/no-this-alias

      var that = this;
      return new Promise(function (resolve) {
        chrome.windows.create({
          url: url,
          focused: false,
          height: height,
          width: width,
          left: left,
          top: top
        }, /*#__PURE__*/function () {
          var _ref = _asyncToGenerator(function* (window) {
            var _that$primaryTab;

            if (window && window.tabs && (_that$primaryTab = that.primaryTab) !== null && _that$primaryTab !== void 0 && _that$primaryTab.windowId) {
              // update again for chrome on windows, to move results window to foreground
              chrome.windows.update(that.primaryTab.windowId, {
                focused: true
              });
              that.setTab(provider, window.tabs[0]);
              that.setWindow(provider, window);
              chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
                if (info.status === "complete" && tabId === that.getTabId(provider)) {
                  chrome.tabs.onUpdated.removeListener(listener);
                  chrome.tabs.sendMessage(tabId, {
                    event: "BEGIN_PARSING",
                    formData: formData
                  });
                  resolve();
                }
              });
            } else {
              throw new Error("Unable to create window - no window!");
            }
          });

          return function (_x2) {
            return _ref.apply(this, arguments);
          };
        }());
      });
    }
  }, {
    key: "closeWindow",
    value: function closeWindow(providerName) {
      var windowId = this.getWindowId(providerName);
      console.log(windowId);

      if (windowId) {
        chrome.windows.remove(windowId);
      }
    }
  }, {
    key: "closeWindows",
    value: function closeWindows() {
      var _this8 = this;

      console.log("closeWindows");
      this.knownProviders.forEach(function (providerName) {
        console.log(providerName);

        _this8.closeWindow(providerName);
      });
    }
  }, {
    key: "searchForResults",
    value: function searchForResults(formData, windowConfig) {
      var _this$primaryTab4,
          _this9 = this;

      this.setFormData(formData);
      var primaryTabId = this === null || this === void 0 ? void 0 : (_this$primaryTab4 = this.primaryTab) === null || _this$primaryTab4 === void 0 ? void 0 : _this$primaryTab4.id;

      if (primaryTabId) {
        var promises = this.knownProviders.map(function (provider) {
          var url = providerURLBaseMap[provider](formData); // Open url in a new window.
          // Not a new tab because we can't read results from inactive tabs (browser powers down inactive tabs).

          return _this9.createWindow(url, provider, windowConfig, formData);
        });
        Promise.all(promises).then(function () {
          // update again for chrome on windows, to move results window to foreground
          chrome.windows.update(primaryTabId, {
            focused: true
          });
        });
      }
    }
  }, {
    key: "getTotalFlightCount",
    value: function getTotalFlightCount() {
      var _this10 = this;

      if (!this.isComplete()) {
        return null;
      }

      var total = 0;
      this.knownProviders.forEach(function (providerName) {
        total += _this10.getFlightCount(providerName);
      });
      return total;
    }
  }, {
    key: "sendMessageToIndexPage",
    value: function sendMessageToIndexPage(message) {
      var _this$primaryTab5;

      if ((_this$primaryTab5 = this.primaryTab) !== null && _this$primaryTab5 !== void 0 && _this$primaryTab5.id) {
        chrome.tabs.sendMessage(this.primaryTab.id, message);
      }
    }
  }]);

  return ProviderManager;
}();
;// CONCATENATED MODULE: ./src/background/state/ExtensionUninstalledHandler.ts
var ExtensionUninstalledHandler = function ExtensionUninstalledHandler() {
  chrome.runtime.setUninstallURL("https://forms.gle/s1BfyyBQb5qtXr7H6", function () {
    console.log("Bye");
  });
};
;// CONCATENATED MODULE: ./src/background/state/ExtensionInstalledHandler.ts
var ExtensionInstalledHandler = function ExtensionInstalledHandler() {
  chrome.runtime.onInstalled.addListener(function () {
    console.log("Is this thing on?");
  });
};
;// CONCATENATED MODULE: ./src/config.js
// const dev_origin = "http://localhost:4242"
// production origin
var ORIGIN = "https://subscribe.flightpenguin.com";
/* harmony default export */ const config = (ORIGIN);
;// CONCATENATED MODULE: ./src/auth/getSubscriptionValidity.js

function getSubscriptionValidity(accessToken) {
  return fetch("".concat(config, "/api/subscription/status"), {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: "Bearer ".concat(accessToken)
    })
  }).then(function (response) {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  });
}
;// CONCATENATED MODULE: ./src/background/state/ExtensionOpenedHandler.ts
function ExtensionOpenedHandler_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function ExtensionOpenedHandler_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { ExtensionOpenedHandler_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { ExtensionOpenedHandler_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var ExtensionOpenedHandler = function ExtensionOpenedHandler() {
  chrome.browserAction.onClicked.addListener(function () {
    disableExtension();
    chrome.identity.getAuthToken({
      interactive: true
    }, /*#__PURE__*/function () {
      var _ref = ExtensionOpenedHandler_asyncToGenerator(function* (token) {
        try {
          var _yield$getSubscriptio = yield getSubscriptionValidity(token),
              status = _yield$getSubscriptio.status;

          if (status) {
            isExtensionOpen({
              extensionOpenCallback: handleExtensionOpen,
              extensionClosedCallback: handleExtensionNotOpen
            });
          } else {
            chrome.tabs.create({
              url: config
            });
          }
        } catch (_unused) {
          chrome.tabs.create({
            url: config
          });
        } finally {
          enableExtension();
        }
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  });
};

var disableExtension = function disableExtension() {
  chrome.browserAction.disable();
};

var enableExtension = function enableExtension() {
  chrome.browserAction.enable();
};

var handleExtensionOpen = function handleExtensionOpen(tab) {
  chrome.windows.update(tab.windowId, {
    focused: true
  }, function () {
    if (tab.id != null) {
      chrome.tabs.update(tab.id, {
        active: true
      });
    }
  });
};

var handleExtensionNotOpen = function handleExtensionNotOpen() {
  chrome.tabs.create({
    url: chrome.extension.getURL("./index.html")
  }, function (tab) {
    window.setTimeout(function () {
      // need setTimeout here or else message will be missed by new tab.
      if (tab.id != null) {
        chrome.tabs.sendMessage(tab.id, {});
      }
    }, 1000);
  });
};
;// CONCATENATED MODULE: ./src/background.js
Sentry.init({
  dsn: "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451"
}); // debugger and console logs can be seen by clicking background.js link for this extension under chrome://extensions,
// it will open a developer console for this extension and in addition to logs you can see the local storage




ExtensionUninstalledHandler();
ExtensionInstalledHandler();
ExtensionOpenedHandler();
var providerManager = new ProviderManager();
chrome.runtime.onMessage.addListener(function (message, sender, reply) {
  switch (message.event) {
    case "FORM_DATA_RECEIVED":
      handleFormDataReceived(providerManager, message.formData, message.windowConfig);
      break;

    case "NO_FLIGHTS_FOUND":
      handleNoFlightsFound(providerManager, message.provider);
      break;

    case "FAILED_SCRAPER":
      handleScraperFailed(providerManager, message.source, message.formData, message.description);
      break;

    case "FLIGHT_RESULTS_RECEIVED":
      handleFlightResultsReceived(providerManager, message.flights, message.provider);
      break;

    case "RETURN_FLIGHTS_RECEIVED":
      handleFlightReturnResultsReceived(providerManager, message.flights, message.provider);
      break;

    case "DEPARTURE_SELECTED":
      handleDepartureSelected(providerManager, message.departureId);
      break;

    case "HIGHLIGHT_TAB":
      handleHighlightTab(providerManager, message.selectedDepartureId, message.selectedReturnId);
      break;

    case "SEND_BEGIN_EVENT":
      handleDispatchBeginParsing(providerManager, message.provider, 2000);
      break;

    case "EXPEDIA_READY":
      handleProviderReady(providerManager, "expedia");
      break;

    case "FOCUS_WEBPAGE":
      handleFocusWebpage(providerManager);
      break;

    case "CLEAR_SELECTIONS":
      handleClearSelections(providerManager);
      break;

    default:
      window.Sentry.captureException(new Error(message));
      console.error(message);
      break;
  }
});
/******/ })()
;