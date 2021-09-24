/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/shared/errors.ts":
/*!******************************!*\
  !*** ./src/shared/errors.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParserError": () => (/* binding */ ParserError),
/* harmony export */   "LoadingTimeoutParserError": () => (/* binding */ LoadingTimeoutParserError),
/* harmony export */   "MissingFieldParserError": () => (/* binding */ MissingFieldParserError),
/* harmony export */   "MissingElementLookupError": () => (/* binding */ MissingElementLookupError)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ExtendableError = /*#__PURE__*/function (_Error) {
  _inherits(ExtendableError, _Error);

  var _super = _createSuper(ExtendableError);

  function ExtendableError(message) {
    var _this;

    _classCallCheck(this, ExtendableError);

    _this = _super.call(this);
    _this.message = message;
    _this.stack = new Error().stack;
    _this.name = _this.constructor.name;
    return _this;
  }

  return ExtendableError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var ParserError = /*#__PURE__*/function (_ExtendableError) {
  _inherits(ParserError, _ExtendableError);

  var _super2 = _createSuper(ParserError);

  function ParserError(message) {
    _classCallCheck(this, ParserError);

    return _super2.call(this, message);
  }

  return ParserError;
}(ExtendableError);
var LoadingTimeoutParserError = /*#__PURE__*/function (_ParserError) {
  _inherits(LoadingTimeoutParserError, _ParserError);

  var _super3 = _createSuper(LoadingTimeoutParserError);

  function LoadingTimeoutParserError(message) {
    _classCallCheck(this, LoadingTimeoutParserError);

    return _super3.call(this, message);
  }

  return LoadingTimeoutParserError;
}(ParserError);
var MissingFieldParserError = /*#__PURE__*/function (_ParserError2) {
  _inherits(MissingFieldParserError, _ParserError2);

  var _super4 = _createSuper(MissingFieldParserError);

  function MissingFieldParserError(message) {
    _classCallCheck(this, MissingFieldParserError);

    return _super4.call(this, message);
  }

  return MissingFieldParserError;
}(ParserError);
var MissingElementLookupError = /*#__PURE__*/function (_ParserError3) {
  _inherits(MissingElementLookupError, _ParserError3);

  var _super5 = _createSuper(MissingElementLookupError);

  function MissingElementLookupError(message) {
    _classCallCheck(this, MissingElementLookupError);

    return _super5.call(this, message);
  }

  return MissingElementLookupError;
}(ParserError);

/***/ }),

/***/ "./src/shared/events/index.ts":
/*!************************************!*\
  !*** ./src/shared/events/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sendFailedScraper": () => (/* binding */ sendFailedScraper)
/* harmony export */ });
function sendFailedScraper(providerName, error, searchType) {
  chrome.runtime.sendMessage({
    event: "FAILED_SCRAPER",
    searchType: searchType,
    providerName: providerName,
    description: "".concat(error.name, " ").concat(error.message)
  });
}

/***/ }),

/***/ "./src/shared/events/sendFlights.ts":
/*!******************************************!*\
  !*** ./src/shared/events/sendFlights.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

/***/ }),

/***/ "./src/shared/helpers.js":
/*!*******************************!*\
  !*** ./src/shared/helpers.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "standardizeTimeString": () => (/* binding */ standardizeTimeString)
/* harmony export */ });
var standardizeTimeString = function standardizeTimeString(time) {
  return time.toLowerCase().replace(" ", "").trim();
};



/***/ }),

/***/ "./src/shared/nameMaps/airlineMap.js":
/*!*******************************************!*\
  !*** ./src/shared/nameMaps/airlineMap.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_capitalize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash.capitalize */ "./node_modules/lodash.capitalize/index.js");
/* harmony import */ var lodash_capitalize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_capitalize__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _wrapRegExp(re, groups) { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, undefined, groups); }; var _RegExp = _wrapNativeSuper(RegExp); var _super = RegExp.prototype; var _groups = new WeakMap(); function BabelRegExp(re, flags, groups) { var _this = _RegExp.call(this, re, flags); _groups.set(_this, groups || _groups.get(re)); return _this; } _inherits(BabelRegExp, _RegExp); BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); if (result) result.groups = buildGroups(result, this); return result; }; BabelRegExp.prototype[Symbol.replace] = function (str, substitution) { if (typeof substitution === "string") { var groups = _groups.get(this); return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) { return "$" + groups[name]; })); } else if (typeof substitution === "function") { var _this = this; return _super[Symbol.replace].call(this, str, function () { var args = []; args.push.apply(args, arguments); if (_typeof(args[args.length - 1]) !== "object") { args.push(buildGroups(args, _this)); } return substitution.apply(this, args); }); } else { return _super[Symbol.replace].call(this, str, substitution); } }; function buildGroups(result, re) { var g = _groups.get(re); return Object.keys(g).reduce(function (groups, name) { groups[name] = result[g[name]]; return groups; }, Object.create(null)); } return _wrapRegExp.apply(this, arguments); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var cleanAlaskaAirlinesOperatingName = function cleanAlaskaAirlinesOperatingName(airlineName) {
  var alaskaRegex = /*#__PURE__*/_wrapRegExp(/^([\t-\r 0-9A-Z_a-z\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+as[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+(alaska)([a-z]{1,20})$/i, {
    airline: 1,
    dbaPart1: 2,
    dbaPart2: 3
  });

  var cleanedName = airlineName;

  if (alaskaRegex.test(cleanedName)) {
    var nameGroups = cleanedName.match(alaskaRegex);
    cleanedName = "".concat(nameGroups.groups.airline, " as ").concat(nameGroups.groups.dbaPart1, " ").concat(lodash_capitalize__WEBPACK_IMPORTED_MODULE_0___default()(nameGroups.groups.dbaPart2));
  }

  return cleanedName;
};

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
    "Delta Air Lines": {
      display: "Delta",
      color: "#EE722E",
      code: "DL"
    },
    WN: {
      display: "Southwest",
      color: "#F6C04D",
      code: "WN"
    },
    "Southwest Airlines": {
      display: "Southwest",
      color: "#F6C04D",
      code: "WN"
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
    "United Airlines": {
      display: "United",
      color: "#235EA6",
      code: "UA"
    },
    "Air Canada": {
      display: "Air Canada",
      color: "#E53222",
      code: "AC"
    },
    Alaska: {
      display: "Alaska",
      color: "#51172C",
      code: "AS"
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
    Spirit: {
      display: "Spirit",
      color: "#BBB140",
      code: "NK"
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
    Frontier: {
      display: "Frontier",
      color: "#378055",
      code: "F9"
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
    "Sun Country": {
      display: "Sun Country",
      color: "#D79A71",
      code: "SY"
    },
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
    "Air India Limited": {
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
      display: "Singapore",
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

    var formattedAirlineName = airlineName.trim().replace(/\s+/g, " ");
    formattedAirlineName = cleanAlaskaAirlinesOperatingName(formattedAirlineName);
    var airlineDetails = this.airlineDetailsMap[formattedAirlineName];

    if (airlineDetails) {
      formattedAirlineName = airlineDetails.display;
    }

    return formattedAirlineName;
  },
  getAirlineDetails: function getAirlineDetails(airlineName) {
    var formattedAirlineName = airlineName.trim().replace(/\s+/g, " ");
    formattedAirlineName = cleanAlaskaAirlinesOperatingName(formattedAirlineName);
    return this.airlineDetailsMap[formattedAirlineName] || {
      display: formattedAirlineName,
      color: "#DFCCFB"
    };
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AirlineMap);

/***/ }),

/***/ "./src/shared/ui/backToSearch.ts":
/*!***************************************!*\
  !*** ./src/shared/ui/backToSearch.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addBackToSearchButton": () => (/* binding */ addBackToSearchButton)
/* harmony export */ });
var addBackToSearchButton = function addBackToSearchButton() {
  var backToSearchSelector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "#back-to-search";

  if (document.querySelector(backToSearchSelector)) {
    return;
  }

  var button = document.createElement("button");
  button.id = "back-to-search";
  button.textContent = "Return to FlightPenguin";
  button.title = "Click to return to FlightPenguin and keep browsing.";
  button.addEventListener("click", handleBackToSearchButtonClick);
  document.body.append(button);
};

function handleBackToSearchButtonClick() {
  chrome.runtime.sendMessage({
    event: "FOCUS_WEBPAGE"
  });
}

/***/ }),

/***/ "./src/shared/ui/manageSelectionHighlights.ts":
/*!****************************************************!*\
  !*** ./src/shared/ui/manageSelectionHighlights.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "highlightSelectedElement": () => (/* binding */ highlightSelectedElement),
/* harmony export */   "clearHighlightFromElement": () => (/* binding */ clearHighlightFromElement)
/* harmony export */ });
var highlightSelectedElement = function highlightSelectedElement(element) {
  element.style.border = "10px solid #f2554b";
  element.style.borderRadius = "6px";
  element.style.paddingTop = "25px";
  element.style.paddingBottom = "25px";
  element.dataset.selected = "true";
};
var clearHighlightFromElement = function clearHighlightFromElement(element) {
  element.dataset.selected = "false";
  element.style.border = "";
  element.style.paddingTop = "0px";
  element.style.paddingBottom = "0px";
  element.style.borderRadius = "0px";
};

/***/ }),

/***/ "./src/shared/utilities/createInvisibleIframe.ts":
/*!*******************************************************!*\
  !*** ./src/shared/utilities/createInvisibleIframe.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createInvisibleIframe": () => (/* binding */ createInvisibleIframe)
/* harmony export */ });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors */ "./src/shared/errors.ts");
/* harmony import */ var _waitFor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./waitFor */ "./src/shared/utilities/waitFor.ts");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var createInvisibleIframe = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (parentElement, link) {
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 15000;
    var id = arguments.length > 3 ? arguments[3] : undefined;
    var classNames = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
    var iframeElement = document.createElement("iframe");
    var selector = "iframe";

    if (id) {
      iframeElement.id = id;
      selector += "#id";
    }

    if (classNames) {
      var _iterator = _createForOfIteratorHelper(classNames),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var className = _step.value;
          iframeElement.classList.add(className);
          selector += ".".concat(className);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    iframeElement.src = link;
    iframeElement.style.display = "none";
    iframeElement.dataset.loaded = "false";

    iframeElement.onload = function (event) {
      if (!(event.target instanceof HTMLIFrameElement)) {
        throw new Error("Unable to resolve iframe");
      }

      event.target.dataset.loaded = "true";
    };

    parentElement.appendChild(iframeElement);
    selector += "[data-loaded='true']";
    var iframe = yield (0,_waitFor__WEBPACK_IMPORTED_MODULE_1__.waitForAppearance)(timeout, selector);

    if (!iframe.contentDocument) {
      throw new _errors__WEBPACK_IMPORTED_MODULE_0__.ParserError("Unable to access content document of iframe");
    }

    return iframe.contentDocument;
  });

  return function createInvisibleIframe(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/shared/utilities/findMatchingDOMNode.ts":
/*!*****************************************************!*\
  !*** ./src/shared/utilities/findMatchingDOMNode.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findMatchingDOMNode": () => (/* binding */ findMatchingDOMNode)
/* harmony export */ });
var findMatchingDOMNode = function findMatchingDOMNode(list, id) {
  return list.find(function (item) {
    return item.dataset.fpid === id;
  });
};

/***/ }),

/***/ "./src/shared/utilities/isVisible.ts":
/*!*******************************************!*\
  !*** ./src/shared/utilities/isVisible.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isVisible": () => (/* binding */ isVisible)
/* harmony export */ });
var isVisible = function isVisible(element) {
  return element.offsetWidth > 0 && element.offsetHeight > 0;
};

/***/ }),

/***/ "./src/shared/utilities/waitFor.ts":
/*!*****************************************!*\
  !*** ./src/shared/utilities/waitFor.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "waitForDisappearance": () => (/* binding */ waitForDisappearance),
/* harmony export */   "waitForAppearance": () => (/* binding */ waitForAppearance),
/* harmony export */   "waitForInvisible": () => (/* binding */ waitForInvisible)
/* harmony export */ });
/* harmony import */ var wait_for_the_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wait-for-the-element */ "./node_modules/wait-for-the-element/wait-for-the-element.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errors */ "./src/shared/errors.ts");
/* harmony import */ var _isVisible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isVisible */ "./src/shared/utilities/isVisible.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var waitForDisappearance = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (loadingTimeout, selector) {
    var doc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.document;

    if (doc.querySelector(selector)) {
      var loadingIndicator = yield (0,wait_for_the_element__WEBPACK_IMPORTED_MODULE_0__.waitForTheElementToDisappear)(selector, {
        timeout: loadingTimeout,
        // @ts-ignore
        scope: doc
      });

      if (!loadingIndicator) {
        throw new _errors__WEBPACK_IMPORTED_MODULE_1__.LoadingTimeoutParserError("Took longer than ".concat(loadingTimeout, " ms to make the loading indicator (").concat(selector, ") disappear"));
      }
    }
  });

  return function waitForDisappearance(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var waitForAppearance = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* () {
    var loadingTimeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;
    var selector = arguments.length > 1 ? arguments[1] : undefined;
    var doc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.document;
    var container = doc.querySelector(selector);

    if (!container) {
      container = yield (0,wait_for_the_element__WEBPACK_IMPORTED_MODULE_0__.waitForTheElement)(selector, {
        timeout: loadingTimeout,
        scope: doc
      });

      if (!container) {
        throw new _errors__WEBPACK_IMPORTED_MODULE_1__.LoadingTimeoutParserError("Render of ".concat(selector, " failed to complete in ").concat(loadingTimeout));
      }
    }

    return container;
  });

  return function waitForAppearance() {
    return _ref2.apply(this, arguments);
  };
}();
var waitForInvisible = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* () {
    var disappearanceTimeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5000;
    var selector = arguments.length > 1 ? arguments[1] : undefined;
    var doc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.document;
    var visible = true;
    var startTime = new Date();

    while (visible && startTime.valueOf() - new Date().valueOf() < disappearanceTimeout) {
      var selectedElement = doc.querySelector(selector);

      if (!selectedElement) {
        visible = false;
      }

      visible = (0,_isVisible__WEBPACK_IMPORTED_MODULE_2__.isVisible)(selectedElement);
    }

    if (visible) {
      throw new _errors__WEBPACK_IMPORTED_MODULE_1__.LoadingTimeoutParserError("Took longer than ".concat(disappearanceTimeout, " to make ").concat(selector, " disappear"));
    }
  });

  return function waitForInvisible() {
    return _ref3.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/skyscanner/parser/getFlight.ts":
/*!********************************************!*\
  !*** ./src/skyscanner/parser/getFlight.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFlight": () => (/* binding */ getFlight)
/* harmony export */ });
/* harmony import */ var _shared_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/errors */ "./src/shared/errors.ts");
/* harmony import */ var _shared_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/helpers */ "./src/shared/helpers.js");
/* harmony import */ var _shared_nameMaps_airlineMap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/nameMaps/airlineMap */ "./src/shared/nameMaps/airlineMap.js");
/* harmony import */ var _getLayovers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getLayovers */ "./src/skyscanner/parser/getLayovers.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var FARE_SELECTOR = "[class*='TotalPrice_totalPriceContainer'],[class*='Price_mainPriceContainer'],[class*='CardPrice_totalPrice']";
var DETAILS_SELECTOR = "[class*='UpperTicketBody_leg__']";
var MARKETING_AIRLINE_CONTAINER_SELECTOR = "[class*='LogoImage_container__']";
var OPERATING_AIRLINE_CONTAINER_SELECTOR = "[class*='Operators_operator']";
var TIME_CONTAINER_SELECTOR = "span[class*='LegInfo_routePartialTime__']";
var DURATION_CONTAINER_SELECTOR = "span[class*='Duration_duration']";
var STOP_REGEX = /\d{1,2} stop/;
var getFlight = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (flightCard) {
    var fare = getFare(flightCard);

    var _ref2 = isNonstop(flightCard) ? {
      departureLayovers: [],
      returnLayovers: []
    } : yield (0,_getLayovers__WEBPACK_IMPORTED_MODULE_3__.getLayovers)(flightCard),
        departureLayovers = _ref2.departureLayovers,
        returnLayovers = _ref2.returnLayovers;

    var departureFlight = getFlightDetails(flightCard, "DEPARTURE");
    var returnFlight = getFlightDetails(flightCard, "ARRIVAL");
    setFlightCardVisited(flightCard);
    return {
      departureFlight: _objectSpread(_objectSpread({}, departureFlight), {}, {
        layovers: departureLayovers
      }),
      returnFlight: _objectSpread(_objectSpread({}, returnFlight), {}, {
        layovers: returnLayovers
      }),
      fare: fare
    };
  });

  return function getFlight(_x) {
    return _ref.apply(this, arguments);
  };
}();

var setFlightCardVisited = function setFlightCardVisited(flightCard) {
  flightCard.dataset.visited = "true";
};

var getFare = function getFare(flightCard) {
  var fare = flightCard.querySelector(FARE_SELECTOR);

  if (!fare) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to find fare in card");
  }

  return fare.textContent;
};

var isNonstop = function isNonstop(flightCard) {
  return !STOP_REGEX.test(flightCard.textContent || "");
};

var getFlightDetails = function getFlightDetails(flightCard, type) {
  var index = type === "DEPARTURE" ? 0 : 1;
  var flightContainer = flightCard.querySelectorAll(DETAILS_SELECTOR)[index];

  if (!flightContainer) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to locate ".concat(type, " container"));
  }

  return {
    marketingAirline: getMarketingAirline(flightContainer),
    operatingAirline: getOperatingAirline(flightContainer),
    fromTime: getFlightTime(flightContainer, "DEPARTURE"),
    toTime: getFlightTime(flightContainer, "ARRIVAL"),
    duration: getDurationTime(flightContainer)
  };
};

var getMarketingAirline = function getMarketingAirline(flightContainer) {
  var _airlineContainer$tex;

  var airlineContainer = flightContainer.querySelector(MARKETING_AIRLINE_CONTAINER_SELECTOR);

  if (!airlineContainer) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to locate marketing airline container");
  }

  var rawAirlineName = (_airlineContainer$tex = airlineContainer.textContent) === null || _airlineContainer$tex === void 0 ? void 0 : _airlineContainer$tex.trim();

  if (!rawAirlineName) {
    var airlineLogo = airlineContainer.querySelector("img");

    if (airlineLogo.alt) {
      rawAirlineName = airlineLogo.alt;
    }

    if (!rawAirlineName) {
      throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingFieldParserError("Unable to extract marketing airline name");
    }
  }

  return _shared_nameMaps_airlineMap__WEBPACK_IMPORTED_MODULE_2__.default.getAirlineName(rawAirlineName);
};

var getOperatingAirline = function getOperatingAirline(flightContainer) {
  var _airlineContainer$tex2;

  var airlineContainer = flightContainer.querySelector(OPERATING_AIRLINE_CONTAINER_SELECTOR);

  if (!airlineContainer) {
    var _flightContainer$text;

    if ((_flightContainer$text = flightContainer.textContent) !== null && _flightContainer$text !== void 0 && _flightContainer$text.toLowerCase().includes("operated by")) {
      throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to locate operating airline container");
    } else {
      return null;
    }
  }

  var rawAirlineName = (_airlineContainer$tex2 = airlineContainer.textContent) === null || _airlineContainer$tex2 === void 0 ? void 0 : _airlineContainer$tex2.trim();

  if (!rawAirlineName) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingFieldParserError("Unable to extract operating airline name");
  }

  return _shared_nameMaps_airlineMap__WEBPACK_IMPORTED_MODULE_2__.default.getAirlineName(rawAirlineName);
};

var getFlightTime = function getFlightTime(flightContainer, type) {
  var _timeContainer$textCo;

  var index = type === "DEPARTURE" ? 0 : 1;
  var timeContainer = flightContainer.querySelectorAll(TIME_CONTAINER_SELECTOR)[index];

  if (!timeContainer) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to find ".concat(type, " time container"));
  }

  var timeText = (_timeContainer$textCo = timeContainer.textContent) === null || _timeContainer$textCo === void 0 ? void 0 : _timeContainer$textCo.trim();

  if (!timeText) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to determine ".concat(type, " time"));
  }

  return (0,_shared_helpers__WEBPACK_IMPORTED_MODULE_1__.standardizeTimeString)(timeText);
};

var getDurationTime = function getDurationTime(flightContainer) {
  var _timeContainer$textCo2;

  var timeContainer = flightContainer.querySelector(DURATION_CONTAINER_SELECTOR);

  if (!timeContainer) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to find duration time container");
  }

  var duration = (_timeContainer$textCo2 = timeContainer.textContent) === null || _timeContainer$textCo2 === void 0 ? void 0 : _timeContainer$textCo2.trim();

  if (!duration) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to determine duration time");
  }

  return duration;
};

/***/ }),

/***/ "./src/skyscanner/parser/getFlightLayovers.ts":
/*!****************************************************!*\
  !*** ./src/skyscanner/parser/getFlightLayovers.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFlightLayovers": () => (/* binding */ getFlightLayovers)
/* harmony export */ });
/* harmony import */ var _shared_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/errors */ "./src/shared/errors.ts");
/* harmony import */ var _shared_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/helpers */ "./src/shared/helpers.js");
/* harmony import */ var _shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/utilities/waitFor */ "./src/shared/utilities/waitFor.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var LEG_DETAILS_SELECTOR = "[class*='LegSegmentSummary_container']";
var LEG_INFORMATION_SELECTOR = "[class*='AirlineLogoTitle_container'],[class*='LegSegmentDetails_container']";
var TIMES_SELECTOR = "[class*='Times_segment']";
var AIRPORTS_SELECTOR = "[class*='Routes_route']";
var getFlightLayovers = function getFlightLayovers(legContainer) {
  var _legContainer$querySe;

  (_legContainer$querySe = legContainer.querySelector("button")) === null || _legContainer$querySe === void 0 ? void 0 : _legContainer$querySe.click();
  (0,_shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_2__.waitForAppearance)(500, LEG_DETAILS_SELECTOR, legContainer);
  var layovers = [];
  var legDetailsContainers = legContainer.querySelectorAll(LEG_INFORMATION_SELECTOR);
  var previous = {};

  var _iterator = _createForOfIteratorHelper(legDetailsContainers),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var container = _step.value;

      if (container.className.startsWith("Airline")) {
        var _getAirlines = getAirlines(container),
            operatingAirline = _getAirlines.operatingAirline;

        previous.operatingAirline = operatingAirline;
      } else if (container.className.startsWith("LegSeg")) {
        var _getTimes = getTimes(container),
            arrivalTime = _getTimes.arrivalTime,
            departureTime = _getTimes.departureTime,
            duration = _getTimes.duration;

        var _getAirports = getAirports(container),
            arrivalAirport = _getAirports.arrivalAirport,
            departureAirport = _getAirports.departureAirport;

        previous.duration = duration;
        previous.from = departureAirport;
        previous.to = arrivalAirport;
        previous.fromTime = departureTime;
        previous.toTime = arrivalTime;
        layovers.push(previous);
        previous = {};
      } else {
        throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.ParserError("Unexpected case: ".concat(container.className));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return layovers;
};

var getAirlines = function getAirlines(legDetailsContainer) {
  var _marketingAirlineCont, _operatingAirlineCont;

  var _legDetailsContainer$ = legDetailsContainer.querySelectorAll("span"),
      _legDetailsContainer$2 = _slicedToArray(_legDetailsContainer$, 2),
      marketingAirlineContainer = _legDetailsContainer$2[0],
      operatingAirlineContainer = _legDetailsContainer$2[1];

  if (!marketingAirlineContainer) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to find marketing airline container");
  }

  var marketingAirline = (_marketingAirlineCont = marketingAirlineContainer.textContent) === null || _marketingAirlineCont === void 0 ? void 0 : _marketingAirlineCont.trim();
  var operatingAirline = operatingAirlineContainer && (_operatingAirlineCont = operatingAirlineContainer.textContent) !== null && _operatingAirlineCont !== void 0 && _operatingAirlineCont.toLowerCase().includes("operated") ? operatingAirlineContainer.textContent.split("|")[1].trim() : marketingAirline;

  if (!marketingAirline) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingFieldParserError("Unable to determine marketing airline");
  }

  if (!operatingAirline) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingFieldParserError("Unable to determine operating airline");
  }

  return {
    marketingAirline: marketingAirline,
    operatingAirline: operatingAirline
  };
};

var getTimes = function getTimes(legDetailsContainer) {
  var timesContainer = legDetailsContainer.querySelector(TIMES_SELECTOR);

  if (!timesContainer) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to determine times of layover");
  }

  var _timesContainer$child = _slicedToArray(timesContainer.children, 3),
      departureTimeContainer = _timesContainer$child[0],
      durationSpan = _timesContainer$child[1],
      arrivalTimeContainer = _timesContainer$child[2];

  var departureTime = departureTimeContainer.textContent;

  if (!departureTimeContainer) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingFieldParserError("Couldn't parse departure time of layover");
  }

  var duration = durationSpan.textContent;

  if (!duration) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingFieldParserError("Couldn't parse duration of layover");
  }

  var arrivalTime = arrivalTimeContainer.textContent;

  if (!arrivalTime) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingFieldParserError("Couldn't parse arrival time of layover");
  }

  return {
    departureTime: (0,_shared_helpers__WEBPACK_IMPORTED_MODULE_1__.standardizeTimeString)(departureTime),
    arrivalTime: (0,_shared_helpers__WEBPACK_IMPORTED_MODULE_1__.standardizeTimeString)(arrivalTime),
    duration: duration
  };
};

var getAirports = function getAirports(legDetailsContainer) {
  var _departureAirportSpan, _arrivalAirportSpan$t;

  var airportsContainer = legDetailsContainer.querySelector(AIRPORTS_SELECTOR);

  if (!airportsContainer) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to determine airports of layover");
  }

  var _airportsContainer$qu = airportsContainer.querySelectorAll("span"),
      _airportsContainer$qu2 = _slicedToArray(_airportsContainer$qu, 2),
      departureAirportSpan = _airportsContainer$qu2[0],
      arrivalAirportSpan = _airportsContainer$qu2[1];

  var departureAirport = (_departureAirportSpan = departureAirportSpan.textContent) === null || _departureAirportSpan === void 0 ? void 0 : _departureAirportSpan.split(/\s+/)[0].trim();

  if (!departureAirport) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingFieldParserError("Couldn't parse departure airport of layover");
  }

  var arrivalAirport = (_arrivalAirportSpan$t = arrivalAirportSpan.textContent) === null || _arrivalAirportSpan$t === void 0 ? void 0 : _arrivalAirportSpan$t.split(/\s+/)[0].trim();

  if (!arrivalAirport) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingFieldParserError("Couldn't parse arrival airport of layover");
  }

  return {
    arrivalAirport: arrivalAirport,
    departureAirport: departureAirport
  };
};

/***/ }),

/***/ "./src/skyscanner/parser/getLayovers.ts":
/*!**********************************************!*\
  !*** ./src/skyscanner/parser/getLayovers.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLayovers": () => (/* binding */ getLayovers),
/* harmony export */   "openFlightDetails": () => (/* binding */ openFlightDetails),
/* harmony export */   "closeFlightDetails": () => (/* binding */ closeFlightDetails)
/* harmony export */ });
/* harmony import */ var _ui_manageLayoversIframe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui/manageLayoversIframe */ "./src/skyscanner/ui/manageLayoversIframe.ts");
/* harmony import */ var _getFlightLayovers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getFlightLayovers */ "./src/skyscanner/parser/getFlightLayovers.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var LEG_CONTAINER_SELECTOR = "[class*='Itinerary_leg']";
var getLayovers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (flightCard) {
    var iframeDoc = yield openFlightDetails(flightCard);

    var _ref2 = iframeDoc.querySelectorAll(LEG_CONTAINER_SELECTOR),
        _ref3 = _slicedToArray(_ref2, 2),
        departureLegContainer = _ref3[0],
        returnLegContainer = _ref3[1];

    var departureLayovers = (0,_getFlightLayovers__WEBPACK_IMPORTED_MODULE_1__.getFlightLayovers)(departureLegContainer);
    var returnLayovers = (0,_getFlightLayovers__WEBPACK_IMPORTED_MODULE_1__.getFlightLayovers)(returnLegContainer);
    yield closeFlightDetails(flightCard);
    return {
      departureLayovers: departureLayovers,
      returnLayovers: returnLayovers
    };
  });

  return function getLayovers(_x) {
    return _ref.apply(this, arguments);
  };
}();
var openFlightDetails = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (flightCard) {
    return yield (0,_ui_manageLayoversIframe__WEBPACK_IMPORTED_MODULE_0__.createLayoversIframe)(flightCard);
  });

  return function openFlightDetails(_x2) {
    return _ref4.apply(this, arguments);
  };
}();
var closeFlightDetails = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (flightCard) {
    yield (0,_ui_manageLayoversIframe__WEBPACK_IMPORTED_MODULE_0__.deleteLayoversIframe)(flightCard);
  });

  return function closeFlightDetails(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/skyscanner/parser/getUnsentFlights.ts":
/*!***************************************************!*\
  !*** ./src/skyscanner/parser/getUnsentFlights.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUnsentFlights": () => (/* binding */ getUnsentFlights)
/* harmony export */ });
/* harmony import */ var _shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utilities/waitFor */ "./src/shared/utilities/waitFor.ts");
/* harmony import */ var _ui_handleCaptcha__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/handleCaptcha */ "./src/skyscanner/ui/handleCaptcha.ts");
/* harmony import */ var _getFlight__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getFlight */ "./src/skyscanner/parser/getFlight.ts");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var CAPTCHA_SELECTOR = "#px-captcha";
var NO_RESULTS_SELECTOR = "div[class*=FallbackNoResults_container]";
var RESULTS_SELECTOR = "span[class*=SummaryInfo_itineraryCountContainer]";
var FLIGHT_CARD_SELECTOR = "[class*='FlightsTicket_container'] [role='button']:not([data-visited='true'])";
var getUnsentFlights = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    var loadingTimeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30000;
    yield (0,_shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_0__.waitForAppearance)(loadingTimeout, "body");

    if (isCaptcha()) {
      (0,_ui_handleCaptcha__WEBPACK_IMPORTED_MODULE_1__.handleCaptcha)();
    }

    yield (0,_shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_0__.waitForAppearance)(loadingTimeout, RESULTS_SELECTOR);

    if (isNoResults()) {
      return [];
    }

    var flights = [];
    var flightCards = document.querySelectorAll(FLIGHT_CARD_SELECTOR);

    var _iterator = _createForOfIteratorHelper(flightCards),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var flightCard = _step.value;

        if (shouldSkipCard(flightCard)) {
          continue;
        }

        var flight = yield (0,_getFlight__WEBPACK_IMPORTED_MODULE_2__.getFlight)(flightCard);
        setFlightId(flightCard, flight);
        flights.push(flight);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return flights;
  });

  return function getUnsentFlights() {
    return _ref.apply(this, arguments);
  };
}();

var isCaptcha = function isCaptcha() {
  return !!document.querySelector(CAPTCHA_SELECTOR);
};

var isNoResults = function isNoResults() {
  return !!document.querySelector(NO_RESULTS_SELECTOR);
};

var shouldSkipCard = function shouldSkipCard(flightCard) {
  var denyListTerms = ["sponsored"];
  return denyListTerms.some(function (term) {
    var _flightCard$textConte;

    return (_flightCard$textConte = flightCard.textContent) === null || _flightCard$textConte === void 0 ? void 0 : _flightCard$textConte.includes(term);
  });
};

var setFlightId = function setFlightId(flightCard, flight) {
  var departureId = getFlightDatasetId(flight.departureFlight);
  var returnId = getFlightDatasetId(flight.returnFlight);
  flightCard.dataset.fpid = "".concat(departureId, "-").concat(returnId);
};

var getFlightDatasetId = function getFlightDatasetId(flight) {
  return [flight.fromTime, flight.toTime, flight.marketingAirline].join("-");
};

/***/ }),

/***/ "./src/skyscanner/ui/closePopupModal.ts":
/*!**********************************************!*\
  !*** ./src/skyscanner/ui/closePopupModal.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closePopupModal": () => (/* binding */ closePopupModal)
/* harmony export */ });
var MODAL_SELECTOR = "button[class*='close-button']";
function closePopupModal() {
  var button = document.querySelector(MODAL_SELECTOR);

  if (button) {
    button.click();
  }
}

/***/ }),

/***/ "./src/skyscanner/ui/getMoreResults.ts":
/*!*********************************************!*\
  !*** ./src/skyscanner/ui/getMoreResults.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getMoreResults": () => (/* binding */ getMoreResults)
/* harmony export */ });
/* harmony import */ var _shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utilities/waitFor */ "./src/shared/utilities/waitFor.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


var UNPROCESSED_FLIGHTS_SELECTOR = "[class*='FlightsTicket_container'] [role='button']:not([data-visited='true'])";
var getMoreResults = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    var loadingTimeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 7500;
    yield useShowMoreResultsButton(loadingTimeout);
    window.scrollTo(window.scrollX, document.body.offsetHeight);
    yield (0,_shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_0__.waitForAppearance)(loadingTimeout, UNPROCESSED_FLIGHTS_SELECTOR);
  });

  return function getMoreResults() {
    return _ref.apply(this, arguments);
  };
}();

var useShowMoreResultsButton = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (loadingTimeout) {
    var button = getShowMoreResultsButton();

    if (!button) {
      return;
    }

    button.classList.add("fp-showMoreResults");
    button.click();
    yield (0,_shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_0__.waitForDisappearance)(loadingTimeout, ".fp-showMoreResults");
  });

  return function useShowMoreResultsButton(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var getShowMoreResultsButton = function getShowMoreResultsButton() {
  return Array.from(document.querySelectorAll("button")).find(function (element) {
    return element.textContent === "Show more results";
  });
};

/***/ }),

/***/ "./src/skyscanner/ui/handleCaptcha.ts":
/*!********************************************!*\
  !*** ./src/skyscanner/ui/handleCaptcha.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleCaptcha": () => (/* binding */ handleCaptcha)
/* harmony export */ });
/* harmony import */ var _shared_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/errors */ "./src/shared/errors.ts");
/* harmony import */ var _shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utilities/waitFor */ "./src/shared/utilities/waitFor.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var SEARCH_PAGE_SHELL_SELECTOR = "#pagewrap";
var handleCaptcha = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    var iframes = document.querySelectorAll("iframe");

    if (!iframes) {
      throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to locate iframes in captcha page");
    }

    for (var index = 0; index < iframes.length; index++) {
      var testWindow = window[index];
      testWindow.document.body.dispatchEvent(new Event("mousedown"));
    }

    yield (0,_shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_1__.waitForAppearance)(15000, SEARCH_PAGE_SHELL_SELECTOR);
  });

  return function handleCaptcha() {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/skyscanner/ui/highlightFlightCard.ts":
/*!**************************************************!*\
  !*** ./src/skyscanner/ui/highlightFlightCard.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "highlightFlightCard": () => (/* binding */ highlightFlightCard),
/* harmony export */   "scrollToFlightCard": () => (/* binding */ scrollToFlightCard),
/* harmony export */   "isHighlightActive": () => (/* binding */ isHighlightActive)
/* harmony export */ });
/* harmony import */ var _shared_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/errors */ "./src/shared/errors.ts");
/* harmony import */ var _shared_ui_manageSelectionHighlights__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/ui/manageSelectionHighlights */ "./src/shared/ui/manageSelectionHighlights.ts");
/* harmony import */ var _shared_utilities_findMatchingDOMNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/utilities/findMatchingDOMNode */ "./src/shared/utilities/findMatchingDOMNode.ts");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var FLIGHT_CARD_SELECTOR = "[class*='FlightsTicket_container'] [role='button']";
var SELECTED_SELECTOR = "[data-selected='true']";
var highlightFlightCard = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (selectedDepartureId, selectedReturnId) {
    clearExistingSelections();
    var flightCard = getFlightCard(selectedDepartureId, selectedReturnId);
    (0,_shared_ui_manageSelectionHighlights__WEBPACK_IMPORTED_MODULE_1__.highlightSelectedElement)(flightCard);
    scrollToFlightCard(flightCard);
  });

  return function highlightFlightCard(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var clearExistingSelections = function clearExistingSelections() {
  var previousDepSelection = document.querySelector(SELECTED_SELECTOR);

  if (previousDepSelection) {
    (0,_shared_ui_manageSelectionHighlights__WEBPACK_IMPORTED_MODULE_1__.clearHighlightFromElement)(previousDepSelection);
  }
};

var getFlightCard = function getFlightCard(selectedFlightId, selectedReturnId) {
  var flightCards = document.querySelectorAll(FLIGHT_CARD_SELECTOR);

  if (!flightCards) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.ParserError("Unable to find flights in highlighting");
  }

  var flightId = "".concat(selectedFlightId, "-").concat(selectedReturnId);
  var flightCard = (0,_shared_utilities_findMatchingDOMNode__WEBPACK_IMPORTED_MODULE_2__.findMatchingDOMNode)(_toConsumableArray(flightCards), flightId);

  if (!flightCard) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to find flight to highlight");
  }

  return flightCard;
};

var scrollToFlightCard = function scrollToFlightCard(flightCard) {
  var yPosition = window.pageYOffset + flightCard.getBoundingClientRect().top - window.innerHeight / 2;
  window.scroll({
    top: yPosition,
    behavior: "smooth"
  });
};
var isHighlightActive = function isHighlightActive() {
  return !!document.querySelector(SELECTED_SELECTOR);
};

/***/ }),

/***/ "./src/skyscanner/ui/manageLayoversIframe.ts":
/*!***************************************************!*\
  !*** ./src/skyscanner/ui/manageLayoversIframe.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createLayoversIframe": () => (/* binding */ createLayoversIframe),
/* harmony export */   "deleteLayoversIframe": () => (/* binding */ deleteLayoversIframe)
/* harmony export */ });
/* harmony import */ var _shared_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/errors */ "./src/shared/errors.ts");
/* harmony import */ var _shared_utilities_createInvisibleIframe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utilities/createInvisibleIframe */ "./src/shared/utilities/createInvisibleIframe.ts");
/* harmony import */ var _shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/utilities/waitFor */ "./src/shared/utilities/waitFor.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var IFRAME_CLASSNAME = "invisible_layovers";
var IFRAME_SELECTOR = ".".concat(IFRAME_CLASSNAME);
var LINK_SELECTOR = "a[class*='FlightsTicket_link']";
var IFRAME_LOADING_SELECTOR = "[class*='DetailsPanel_loading']";
var createLayoversIframe = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (flightCard) {
    var link = yield getLayoversLink(flightCard);
    var iframeDocument = yield (0,_shared_utilities_createInvisibleIframe__WEBPACK_IMPORTED_MODULE_1__.createInvisibleIframe)(flightCard, link, 15000, "", [IFRAME_CLASSNAME]);
    yield (0,_shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_2__.waitForDisappearance)(15000, IFRAME_LOADING_SELECTOR, iframeDocument);
    return iframeDocument;
  });

  return function createLayoversIframe(_x) {
    return _ref.apply(this, arguments);
  };
}();
var deleteLayoversIframe = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (flightCard) {
    var _iframe$parentElement;

    var iframe = flightCard.querySelector(IFRAME_SELECTOR);

    if (!iframe) {
      return;
    }

    (_iframe$parentElement = iframe.parentElement) === null || _iframe$parentElement === void 0 ? void 0 : _iframe$parentElement.removeChild(iframe);
    yield (0,_shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_2__.waitForDisappearance)(10000, IFRAME_SELECTOR);
  });

  return function deleteLayoversIframe(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getLayoversLink = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (flightCard) {
    var link = flightCard.closest(LINK_SELECTOR);

    if (!link) {
      throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to find layovers link");
    }

    return link.href;
  });

  return function getLayoversLink(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./node_modules/lodash.capitalize/index.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash.capitalize/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsComboSymbolsRange = '\\u20d0-\\u20f0',
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + ']');

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);

    var strSymbols = hasUnicode(string)
      ? stringToArray(string)
      : undefined;

    var chr = strSymbols
      ? strSymbols[0]
      : string.charAt(0);

    var trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('FRED');
 * // => 'Fred'
 */
function capitalize(string) {
  return upperFirst(toString(string).toLowerCase());
}

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst = createCaseFirst('toUpperCase');

module.exports = capitalize;


/***/ }),

/***/ "./node_modules/wait-for-the-element/wait-for-the-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/wait-for-the-element/wait-for-the-element.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "waitForTheElement": () => (/* binding */ a),
/* harmony export */   "waitForTheElementToDisappear": () => (/* binding */ l)
/* harmony export */ });
function t(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,u){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==r)return;var e,n,o=[],F=!0,i=!1;try{for(r=r.call(t);!(F=(e=r.next()).done)&&(o.push(e.value),!u||o.length!==u);F=!0);}catch(t){i=!0,n=t}finally{try{F||null==r.return||r.return()}finally{if(i)throw n}}return o}(t,r)||u(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(t,u){if(t){if("string"==typeof t)return r(t,u);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?r(t,u):void 0}}function r(t,u){(null==u||u>t.length)&&(u=t.length);for(var r=0,e=new Array(u);r<u;r++)e[r]=t[r];return e}var e=/\.(?:(?:[\x2D0-9A-Z_a-z\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])|\\(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))+/,n=/#(?:(?:[\x2D0-9A-Z_a-z\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])|\\(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))+/,o=/\[[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*((?:(?:\*|[\x2D0-9A-Z_a-z]*)\|)?(?:(?:[\x2D0-9A-Z_a-z\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+))/g,F={};function i(r){var i=F[r];if(i)return i;i=F[r]={attributes:!0,subtree:!0,childList:!0};var a,l=[],c=function(t,r){var e="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!e){if(Array.isArray(t)||(e=u(t))||r&&t&&"number"==typeof t.length){e&&(t=e);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var F,i=!0,a=!1;return{s:function(){e=e.call(t)},n:function(){var t=e.next();return i=t.done,t},e:function(t){a=!0,F=t},f:function(){try{i||null==e.return||e.return()}finally{if(a)throw F}}}}(r.matchAll(o));try{for(c.s();!(a=c.n()).done;){var D=t(a.value,2)[1];if(D.startsWith("*")||D.startsWith("|"))return i;l.push(D.replace("|",":"))}}catch(t){c.e(t)}finally{c.f()}return e.test(r)&&l.push("class"),n.test(r)&&l.push("id"),0===l.length?i.attributes=!1:i.attributeFilter=l,i}function a(t){var u=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=u.timeout,e=void 0===r?2500:r,n=u.scope,o=void 0===n?document:n;return new Promise((function(u){var r=o.querySelector(t);if(null===r){var n=null,F=new MutationObserver((function(){var r=o.querySelector(t);null!==r&&(clearTimeout(n),F.disconnect(),u(r))}));F.observe(o,i(t)),n=setTimeout((function(){F.disconnect(),u(null)}),e)}else u(r)}))}function l(t){var u=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=u.timeout,e=void 0===r?2500:r,n=u.scope,o=void 0===n?document:n;return new Promise((function(u){var r=null;if(null!==o.querySelector(t)){var n=new MutationObserver((function(){null===o.querySelector(t)&&(clearTimeout(r),n.disconnect(),u(!0))}));n.observe(o,i(t)),r=setTimeout((function(){n.disconnect(),u(!1)}),e)}else u(!0)}))}


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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*****************************************!*\
  !*** ./src/skyscanner/contentScript.js ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shared_ui_backToSearch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ui/backToSearch */ "./src/shared/ui/backToSearch.ts");
/* harmony import */ var _shared_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/events */ "./src/shared/events/index.ts");
/* harmony import */ var _parser_getUnsentFlights__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parser/getUnsentFlights */ "./src/skyscanner/parser/getUnsentFlights.ts");
/* harmony import */ var _ui_closePopupModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui/closePopupModal */ "./src/skyscanner/ui/closePopupModal.ts");
/* harmony import */ var _ui_getMoreResults__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui/getMoreResults */ "./src/skyscanner/ui/getMoreResults.ts");
/* harmony import */ var _ui_highlightFlightCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ui/highlightFlightCard */ "./src/skyscanner/ui/highlightFlightCard.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


window.Sentry.init({
  dsn: "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451"
});





var continueScraping = true;
chrome.runtime.onMessage.addListener( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (message) {
    switch (message.event) {
      case "BEGIN_PARSING":
        yield scrapeFlights();
        break;

      case "HIGHLIGHT_FLIGHT":
        continueScraping = false;
        (0,_ui_closePopupModal__WEBPACK_IMPORTED_MODULE_3__.closePopupModal)();
        yield (0,_ui_highlightFlightCard__WEBPACK_IMPORTED_MODULE_5__.highlightFlightCard)(message.selectedDepartureId, message.selectedReturnId);
        (0,_shared_ui_backToSearch__WEBPACK_IMPORTED_MODULE_0__.addBackToSearchButton)();
        break;

      default:
        break;
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

var scrapeFlights = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* () {
    var totalFlightCount = 0;
    var hasMoreFlights = true;

    try {
      while (totalFlightCount < 60 && hasMoreFlights && continueScraping) {
        (0,_ui_closePopupModal__WEBPACK_IMPORTED_MODULE_3__.closePopupModal)();
        var unsentFlights = yield (0,_parser_getUnsentFlights__WEBPACK_IMPORTED_MODULE_2__.getUnsentFlights)();

        if (unsentFlights) {
          (0,_shared_events__WEBPACK_IMPORTED_MODULE_1__.sendFlightsEvent)("skyscanner", unsentFlights);
          totalFlightCount += unsentFlights.length;
          yield (0,_ui_getMoreResults__WEBPACK_IMPORTED_MODULE_4__.getMoreResults)();
        } else if (totalFlightCount === 0) {
          (0,_shared_events__WEBPACK_IMPORTED_MODULE_1__.sendNoFlightsEvent)("skyscanner", "BOTH");
          hasMoreFlights = false;
        } else {
          hasMoreFlights = false;
        }
      }

      (0,_shared_events__WEBPACK_IMPORTED_MODULE_1__.sendScraperComplete)("skyscanner", "BOTH");
    } catch (error) {
      window.Sentry.captureException(error);

      if (!totalFlightCount) {
        (0,_shared_events__WEBPACK_IMPORTED_MODULE_1__.sendFailedScraper)("skyscanner", error, "BOTH");
      }
    }
  });

  return function scrapeFlights() {
    return _ref2.apply(this, arguments);
  };
}();
})();

/******/ })()
;