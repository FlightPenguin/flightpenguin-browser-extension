/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/shared/helpers.js":
/*!*******************************!*\
  !*** ./src/shared/helpers.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "standardizeTimeString": () => (/* binding */ standardizeTimeString)
/* harmony export */ });
var standardizeTimeString = function standardizeTimeString(time) {
  return time.toLowerCase().replace(" ", "").trim();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************************!*\
  !*** ./src/southwest/contentScript.js ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shared_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/helpers.js */ "./src/shared/helpers.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

Sentry.init({
  dsn: "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451"
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // parse page to get flights, then send background to process and display on new web page.
  switch (message.event) {
    case "STOP_PARSING":
      break;

    case "BEGIN_PARSING":
      var id = window.setInterval(function () {
        var southwestFlights = JSON.parse(window.sessionStorage.getItem("AirBookingSearchResultsSearchStore-searchResults-v1"));

        if (southwestFlights && southwestFlights.searchResults) {
          sendFlightsToBackground(southwestFlights);
          window.clearInterval(id);
        }
      }, 500);
      break;

    case "HIGHLIGHT_FLIGHT":
      var selectedDepartureId = message.selectedDepartureId,
          selectedReturnId = message.selectedReturnId;
      southwestParser();
      highlightSouthwestItin(selectedDepartureId, selectedReturnId);
      addBackToSearchButton();
      break;

    default:
      break;
  }
});

function sendFlightsToBackground(southwestFlights) {
  if (!southwestFlights) {
    return;
  }

  var _southwestFlights$sea = _slicedToArray(southwestFlights.searchResults.airProducts, 2),
      departures = _southwestFlights$sea[0],
      returns = _southwestFlights$sea[1];

  if (departures && departures.details.length === 0 || returns && returns.details.length === 0) {
    // no complete itins
    chrome.runtime.sendMessage({
      event: "NO_FLIGHTS_FOUND",
      provider: "southwest"
    });
    return;
  }

  departures = departures.details;
  returns = returns ? returns.details : [];
  var itins = createSouthwestItins(departures, returns);
  chrome.runtime.sendMessage({
    event: "FLIGHT_RESULTS_RECEIVED",
    flights: itins,
    provider: "southwest"
  });
}

function addBackToSearchButton() {
  if (document.querySelector("#back-to-search")) {
    return;
  }

  var button = document.createElement("button");
  button.id = "back-to-search";
  button.textContent = "Return to FlightPenguin";
  button.title = "Click to return to FlightPenguin and keep browsing.";
  button.addEventListener("click", handleBackToSearchButtonClick);
  document.body.append(button);
}

function handleBackToSearchButtonClick() {
  chrome.runtime.sendMessage({
    event: "FOCUS_WEBPAGE"
  });
}

function highlightSouthwestItin(selectedDepartureId, selectedReturnId) {
  var _document$querySelect = document.querySelectorAll(".transition-content.price-matrix--details-area ul"),
      _document$querySelect2 = _slicedToArray(_document$querySelect, 2),
      departureList = _document$querySelect2[0],
      returnList = _document$querySelect2[1]; // reset prior selections


  var previousDepSelection = departureList.querySelector("[data-selected='true']");

  if (previousDepSelection) {
    previousDepSelection.dataset.selected = "false";
    previousDepSelection.style.border = "";
  } // highlight selections


  var dep = findMatchingDOMNode(_toConsumableArray(departureList.children), selectedDepartureId);
  dep.style.border = "10px solid #f2554b";
  dep.style.borderRadius = "6px";
  dep.style.paddingTop = "25px";
  dep.style.paddingBottom = "25px";
  dep.dataset.selected = "true";

  if (selectedReturnId) {
    var previousReturnValueSelection = returnList.querySelector("[data-selected='true']");

    if (previousReturnValueSelection) {
      previousReturnValueSelection.dataset.selected = "false";
      previousReturnValueSelection.style.border = "";
    }

    var returnValue = findMatchingDOMNode(_toConsumableArray(returnList.children), selectedReturnId);
    returnValue.style.border = "10px solid #f2554b";
    returnValue.style.borderRadius = "6px";
    returnValue.style.paddingTop = "25px";
    returnValue.style.paddingBottom = "25px";
    returnValue.dataset.selected = "true";
  }

  var yPosition = window.pageYOffset + dep.getBoundingClientRect().top - window.innerHeight / 2;
  window.scroll(0, yPosition);
}

function findMatchingDOMNode(list, target) {
  return list.find(function (item) {
    return item.dataset.id === target;
  });
}
/**
 * Parse DOM and set id.
 * The id will be used to find the flight to highlight.
 */


function southwestParser() {
  var _document$querySelect3 = document.querySelectorAll(".transition-content.price-matrix--details-area ul"),
      _document$querySelect4 = _slicedToArray(_document$querySelect3, 2),
      departures = _document$querySelect4[0],
      returns = _document$querySelect4[1];

  var depNodes = departures.querySelectorAll("li:not([data-visited='true']");
  var flights = [];

  if (returns) {
    var returnValueNodes = returns.querySelectorAll("li:not([data-visited='true']");
    flights = flights.concat(querySouthwestDOM(returnValueNodes));
  } // If we want to go down the regex path (unfinished)...
  // const pattern = /(?<dep>.{5}(PM|AM)).+(?<arr>.{5}(PM|AM)).+(?<duration>Duration\d+h\s\d+m).+(?<stops>\d+h\s\d+m).+(?<price>\$\d+)/;
  // pat = /(?<dep>.{5}(PM|AM)).+(?<arr>.{5}(PM|AM)).+(?<stops>\d+h\s\d+m).+(?<price>\$\d+)/;


  flights = flights.concat(querySouthwestDOM(depNodes));
  return flights;
}

function formatTimeTo12HourClock(time) {
  var _time$split = time.split(":"),
      _time$split2 = _slicedToArray(_time$split, 2),
      hours = _time$split2[0],
      minutes = _time$split2[1];

  hours = Number(hours);
  var timeOfDay = hours >= 12 ? "PM" : "AM";

  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours -= 12;
  }

  return "".concat(hours, ":").concat(minutes).concat(timeOfDay);
}

function convertDurationMinutesToString(duration) {
  var durationHours = Math.floor(duration / 60);
  var durationMinutes = duration % 60;
  return "".concat(durationHours, "h ").concat(durationMinutes, "m");
}

function getIndividualSouthwestLegDetails(flight) {
  var _flight$fareProducts, _flight$fareProducts$, _flight$fareProducts$2, _flight$fareProducts$3, _flight$fareProducts$4, _flight$fareProducts2, _flight$fareProducts3, _flight$fareProducts4, _flight$fareProducts5, _flight$fareProducts6, _flight$fareProducts7, _flight$fareProducts8, _flight$fareProducts9, _flight$fareProducts10, _flight$fareProducts11;

  var layovers = [];

  if (flight.segments.length > 1) {
    layovers = flight.segments.map(function (_ref) {
      var stopsDetails = _ref.stopsDetails;
      return stopsDetails.map(function (stop) {
        return {
          fromTime: (0,_shared_helpers_js__WEBPACK_IMPORTED_MODULE_0__.standardizeTimeString)(formatTimeTo12HourClock(stop.departureTime)),
          toTime: (0,_shared_helpers_js__WEBPACK_IMPORTED_MODULE_0__.standardizeTimeString)(formatTimeTo12HourClock(stop.arrivalTime)),
          operatingAirline: "Southwest",
          duration: convertDurationMinutesToString(stop.legDuration),
          from: stop.originationAirportCode,
          to: stop.destinationAirportCode
        };
      });
    });
    layovers = layovers.flat();
  }

  var fare = (_flight$fareProducts = flight.fareProducts) === null || _flight$fareProducts === void 0 ? void 0 : (_flight$fareProducts$ = _flight$fareProducts.ADULT) === null || _flight$fareProducts$ === void 0 ? void 0 : (_flight$fareProducts$2 = _flight$fareProducts$.WGA) === null || _flight$fareProducts$2 === void 0 ? void 0 : (_flight$fareProducts$3 = _flight$fareProducts$2.fare) === null || _flight$fareProducts$3 === void 0 ? void 0 : (_flight$fareProducts$4 = _flight$fareProducts$3.totalFare) === null || _flight$fareProducts$4 === void 0 ? void 0 : _flight$fareProducts$4.value;
  fare = fare || ((_flight$fareProducts2 = flight.fareProducts) === null || _flight$fareProducts2 === void 0 ? void 0 : (_flight$fareProducts3 = _flight$fareProducts2.ADULT) === null || _flight$fareProducts3 === void 0 ? void 0 : (_flight$fareProducts4 = _flight$fareProducts3.ANY) === null || _flight$fareProducts4 === void 0 ? void 0 : (_flight$fareProducts5 = _flight$fareProducts4.fare) === null || _flight$fareProducts5 === void 0 ? void 0 : (_flight$fareProducts6 = _flight$fareProducts5.totalFare) === null || _flight$fareProducts6 === void 0 ? void 0 : _flight$fareProducts6.value);
  fare = fare || ((_flight$fareProducts7 = flight.fareProducts) === null || _flight$fareProducts7 === void 0 ? void 0 : (_flight$fareProducts8 = _flight$fareProducts7.ADULT) === null || _flight$fareProducts8 === void 0 ? void 0 : (_flight$fareProducts9 = _flight$fareProducts8.BUS) === null || _flight$fareProducts9 === void 0 ? void 0 : (_flight$fareProducts10 = _flight$fareProducts9.fare) === null || _flight$fareProducts10 === void 0 ? void 0 : (_flight$fareProducts11 = _flight$fareProducts10.totalFare) === null || _flight$fareProducts11 === void 0 ? void 0 : _flight$fareProducts11.value);

  if (!fare) {
    return null;
  }

  return {
    fromTime: (0,_shared_helpers_js__WEBPACK_IMPORTED_MODULE_0__.standardizeTimeString)(formatTimeTo12HourClock(flight.departureTime)),
    toTime: (0,_shared_helpers_js__WEBPACK_IMPORTED_MODULE_0__.standardizeTimeString)(formatTimeTo12HourClock(flight.arrivalTime)),
    marketingAirline: "Southwest",
    layovers: layovers,
    fare: Math.round(Number(fare)),
    currency: "$",
    duration: convertDurationMinutesToString(flight.totalDuration),
    from: flight.originationAirportCode,
    to: flight.destinationAirportCode
  };
}

function createSouthwestItins(departureList, returnList) {
  var itins = [];

  if (returnList.length > 0) {
    // roundtrip
    var _iterator = _createForOfIteratorHelper(departureList),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var departureItem = _step.value;
        var departureFlight = getIndividualSouthwestLegDetails(departureItem);

        if (!departureFlight) {
          // unavailable flight
          continue;
        }

        var _iterator2 = _createForOfIteratorHelper(returnList),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var returnItem = _step2.value;
            var returnFlight = getIndividualSouthwestLegDetails(returnItem);

            if (!returnFlight) {
              // unavailable flight
              continue;
            }

            itins.push({
              departureFlight: departureFlight,
              returnFlight: returnFlight,
              fare: departureFlight.fare + returnFlight.fare,
              currency: departureFlight.currency
            });
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else {
    // oneway
    var _iterator3 = _createForOfIteratorHelper(departureList),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _departureItem = _step3.value;

        var _departureFlight = getIndividualSouthwestLegDetails(_departureItem);

        if (!_departureFlight) {
          // unavailable flight
          continue;
        }

        itins.push({
          departureFlight: _departureFlight,
          fare: _departureFlight.fare,
          currency: _departureFlight.currency
        });
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }

  return itins;
}

function querySouthwestDOM(htmlCollection) {
  return _toConsumableArray(htmlCollection).map(function (containerNode) {
    var data = {};

    var _map = _toConsumableArray(containerNode.querySelectorAll(".time--value")).map(function (element) {
      return element.textContent;
    }),
        _map2 = _slicedToArray(_map, 2),
        fromTimeRaw = _map2[0],
        toTimeRaw = _map2[1];

    var fromTime = (0,_shared_helpers_js__WEBPACK_IMPORTED_MODULE_0__.standardizeTimeString)(fromTimeRaw).replace("departs", "");
    var toTime = (0,_shared_helpers_js__WEBPACK_IMPORTED_MODULE_0__.standardizeTimeString)(toTimeRaw).replace("arrives", "");
    data.fromTime = fromTime;
    data.toTime = toTime;
    data.airline = "Southwest";
    containerNode.dataset.id = [data.fromTime, data.toTime, data.airline].join("-");
    return data;
  });
}
})();

/******/ })()
;