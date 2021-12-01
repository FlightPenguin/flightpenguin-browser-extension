/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/shared/events/index.ts":
/*!************************************!*\
  !*** ./src/shared/events/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sendFailedScraper": () => (/* reexport safe */ _sendFailedScraper__WEBPACK_IMPORTED_MODULE_0__.sendFailedScraper),
/* harmony export */   "sendFlightsEvent": () => (/* reexport safe */ _sendFlights__WEBPACK_IMPORTED_MODULE_1__.sendFlightsEvent),
/* harmony export */   "sendNoFlightsEvent": () => (/* reexport safe */ _sendNoFlights__WEBPACK_IMPORTED_MODULE_2__.sendNoFlightsEvent),
/* harmony export */   "sendReturnFlightsEvent": () => (/* reexport safe */ _sendReturnFlights__WEBPACK_IMPORTED_MODULE_3__.sendReturnFlightsEvent),
/* harmony export */   "sendSelectedFlight": () => (/* reexport safe */ _sendSelectedFlight__WEBPACK_IMPORTED_MODULE_4__.sendSelectedFlight),
/* harmony export */   "sendHighlightTab": () => (/* reexport safe */ _sendHighlightTab__WEBPACK_IMPORTED_MODULE_5__.sendHighlightTab),
/* harmony export */   "sendScraperComplete": () => (/* reexport safe */ _sendScraperComplete__WEBPACK_IMPORTED_MODULE_6__.sendScraperComplete)
/* harmony export */ });
/* harmony import */ var _sendFailedScraper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sendFailedScraper */ "./src/shared/events/sendFailedScraper.ts");
/* harmony import */ var _sendFlights__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sendFlights */ "./src/shared/events/sendFlights.ts");
/* harmony import */ var _sendNoFlights__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sendNoFlights */ "./src/shared/events/sendNoFlights.ts");
/* harmony import */ var _sendReturnFlights__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sendReturnFlights */ "./src/shared/events/sendReturnFlights.ts");
/* harmony import */ var _sendSelectedFlight__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sendSelectedFlight */ "./src/shared/events/sendSelectedFlight.ts");
/* harmony import */ var _sendHighlightTab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sendHighlightTab */ "./src/shared/events/sendHighlightTab.ts");
/* harmony import */ var _sendScraperComplete__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sendScraperComplete */ "./src/shared/events/sendScraperComplete.ts");








/***/ }),

/***/ "./src/shared/events/sendFailedScraper.ts":
/*!************************************************!*\
  !*** ./src/shared/events/sendFailedScraper.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sendFailedScraper": () => (/* binding */ sendFailedScraper)
/* harmony export */ });
function sendFailedScraper(providerName, error, searchType) {
  var windowConfig = {
    height: window.outerHeight,
    width: window.outerWidth,
    left: window.screenX,
    top: window.screenY
  };
  chrome.runtime.sendMessage({
    event: "FAILED_SCRAPER",
    searchType: searchType,
    providerName: providerName,
    description: "".concat(error.name, " ").concat(error.message),
    windowConfig: windowConfig
  });
}

/***/ }),

/***/ "./src/shared/events/sendFlights.ts":
/*!******************************************!*\
  !*** ./src/shared/events/sendFlights.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sendFlightsEvent": () => (/* binding */ sendFlightsEvent)
/* harmony export */ });
function sendFlightsEvent(providerName, flights) {
  console.debug("Sending ".concat(flights.length, " departure flights from ").concat(providerName));
  chrome.runtime.sendMessage({
    event: "FLIGHT_RESULTS_RECEIVED",
    flights: flights,
    provider: providerName
  });
}

/***/ }),

/***/ "./src/shared/events/sendHighlightTab.ts":
/*!***********************************************!*\
  !*** ./src/shared/events/sendHighlightTab.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sendHighlightTab": () => (/* binding */ sendHighlightTab)
/* harmony export */ });
var sendHighlightTab = function sendHighlightTab(departureFlightId, returnFlightId) {
  chrome.runtime.sendMessage({
    event: "HIGHLIGHT_TAB",
    selectedDepartureId: departureFlightId,
    selectedReturnId: returnFlightId
  });
};

/***/ }),

/***/ "./src/shared/events/sendNoFlights.ts":
/*!********************************************!*\
  !*** ./src/shared/events/sendNoFlights.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sendNoFlightsEvent": () => (/* binding */ sendNoFlightsEvent)
/* harmony export */ });
function sendNoFlightsEvent(providerName, searchType) {
  chrome.runtime.sendMessage({
    event: "NO_FLIGHTS_FOUND",
    provider: providerName,
    searchType: searchType
  });
}

/***/ }),

/***/ "./src/shared/events/sendReturnFlights.ts":
/*!************************************************!*\
  !*** ./src/shared/events/sendReturnFlights.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sendReturnFlightsEvent": () => (/* binding */ sendReturnFlightsEvent)
/* harmony export */ });
function sendReturnFlightsEvent(providerName, flights) {
  console.debug("Sending ".concat(flights.length, " return flights from ").concat(providerName));
  chrome.runtime.sendMessage({
    event: "RETURN_FLIGHTS_RECEIVED",
    flights: flights,
    provider: providerName
  });
}

/***/ }),

/***/ "./src/shared/events/sendScraperComplete.ts":
/*!**************************************************!*\
  !*** ./src/shared/events/sendScraperComplete.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sendScraperComplete": () => (/* binding */ sendScraperComplete)
/* harmony export */ });
function sendScraperComplete(providerName, searchType) {
  chrome.runtime.sendMessage({
    event: "SUCCESSFUL_SCRAPER",
    searchType: searchType,
    providerName: providerName
  });
}

/***/ }),

/***/ "./src/shared/events/sendSelectedFlight.ts":
/*!*************************************************!*\
  !*** ./src/shared/events/sendSelectedFlight.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sendSelectedFlight": () => (/* binding */ sendSelectedFlight)
/* harmony export */ });
var sendSelectedFlight = function sendSelectedFlight(flightType, flightId) {
  if (flightType === "DEPARTURE") {
    chrome.runtime.sendMessage({
      event: "".concat(flightType.toUpperCase(), "_SELECTED"),
      departureId: flightId
    });
  }
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
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/*!****************************************************!*\
  !*** ./src/southwest/emptyResultsContentScript.ts ***!
  \****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shared_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/events */ "./src/shared/events/index.ts");

(0,_shared_events__WEBPACK_IMPORTED_MODULE_0__.sendNoFlightsEvent)("southwest", "BOTH");
})();

/******/ })()
;