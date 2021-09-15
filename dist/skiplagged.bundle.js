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

/***/ "./src/shared/pause.ts":
/*!*****************************!*\
  !*** ./src/shared/pause.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pause": () => (/* binding */ pause)
/* harmony export */ });
function pause() {
  var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10000;
  var jitterMin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var jitterMax = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var jitter = 0;

  if (jitterMin && jitterMax) {
    jitter += getRandomInt(jitterMin, jitterMax);
  }

  return new Promise(function (resolve) {
    setTimeout(resolve, timeout + jitter);
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/***/ }),

/***/ "./src/shared/types/FlightDetails.ts":
/*!*******************************************!*\
  !*** ./src/shared/types/FlightDetails.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FlightDetails": () => (/* binding */ FlightDetails)
/* harmony export */ });
/* harmony import */ var _utilityFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilityFunctions */ "./src/utilityFunctions.js");
/* harmony import */ var _nameMaps_airlineMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../nameMaps/airlineMap */ "./src/shared/nameMaps/airlineMap.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var FlightDetails = /*#__PURE__*/function () {
  function FlightDetails(_ref) {
    var fromTime = _ref.fromTime,
        toTime = _ref.toTime,
        operatingAirline = _ref.operatingAirline,
        marketingAirline = _ref.marketingAirline,
        duration = _ref.duration,
        layovers = _ref.layovers;

    _classCallCheck(this, FlightDetails);

    this.fromTime = fromTime;
    this.fromTimeDetails = this.getTimeDetails(fromTime);
    this.toTime = toTime;
    this.toTimeDetails = this.getTimeDetails(toTime);
    this.duration = duration;
    this.operatingAirline = _nameMaps_airlineMap__WEBPACK_IMPORTED_MODULE_1__.default.getAirlineName(operatingAirline);
    this.operatingAirlineDetails = operatingAirline ? _nameMaps_airlineMap__WEBPACK_IMPORTED_MODULE_1__.default.getAirlineDetails(operatingAirline) : null;
    this.marketingAirline = _nameMaps_airlineMap__WEBPACK_IMPORTED_MODULE_1__.default.getAirlineName(marketingAirline);
    this.marketingAirlineDetails = marketingAirline ? _nameMaps_airlineMap__WEBPACK_IMPORTED_MODULE_1__.default.getAirlineDetails(marketingAirline) : null;
    this.layovers = layovers;
    this.timezoneOffset = this.getTimezoneOffset();
    this.id = this.getFlightPenguinId();
  }

  _createClass(FlightDetails, [{
    key: "getTimeDetails",
    value: function getTimeDetails(time) {
      var _convertTimeTo24HourC = (0,_utilityFunctions__WEBPACK_IMPORTED_MODULE_0__.convertTimeTo24HourClock)(time, true),
          hours = _convertTimeTo24HourC.hours,
          minutes = _convertTimeTo24HourC.minutes;

      var timeOfDay = time.toLowerCase().includes("pm") ? "pm" : "am";
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
  }, {
    key: "getFlightPenguinId",
    value: function getFlightPenguinId() {
      return "".concat(this.operatingAirline, "-").concat(this.fromTime, "-").concat(this.toTime);
    }
  }, {
    key: "getTimezoneOffset",
    value: function getTimezoneOffset() {
      return (0,_utilityFunctions__WEBPACK_IMPORTED_MODULE_0__.getTimezoneOffset)(this.fromTime, this.toTime, this.duration);
    }
  }]);

  return FlightDetails;
}();

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
/* harmony export */   "waitForAppearance": () => (/* binding */ waitForAppearance)
/* harmony export */ });
/* harmony import */ var wait_for_the_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wait-for-the-element */ "./node_modules/wait-for-the-element/wait-for-the-element.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errors */ "./src/shared/errors.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var waitForDisappearance = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (loadingTimeout, selector) {
    var doc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.document;

    if (doc.querySelector(selector)) {
      var loadingIndicator = yield (0,wait_for_the_element__WEBPACK_IMPORTED_MODULE_0__.waitForTheElementToDisappear)(selector, {
        timeout: loadingTimeout,
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

/***/ }),

/***/ "./src/skiplagged/parser/getAirlines.ts":
/*!**********************************************!*\
  !*** ./src/skiplagged/parser/getAirlines.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAirlines": () => (/* binding */ getAirlines)
/* harmony export */ });
/* harmony import */ var _shared_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/errors */ "./src/shared/errors.ts");

var TRIP_AIRLINES_SELECTOR = "span.airlines";
var getAirlines = function getAirlines(flightCard) {
  var _airlineTooltipContai;

  var airlineTooltipContainer = flightCard.querySelector(TRIP_AIRLINES_SELECTOR);

  if (!airlineTooltipContainer) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to find airline tooltip container");
  }

  var unparsedHtml = (_airlineTooltipContai = airlineTooltipContainer.dataset) === null || _airlineTooltipContai === void 0 ? void 0 : _airlineTooltipContai.originalTitle;

  if (!unparsedHtml) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingFieldParserError("Unable to find original title of tooltip");
  }

  var parser = new DOMParser();
  var parsedDocument = parser.parseFromString(unparsedHtml, "text/html");
  var airlineElements = parsedDocument.querySelectorAll("span");

  if (!airlineElements) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingFieldParserError("Unable to find span in tooltip");
  }

  return Array.from(airlineElements).map(function (span) {
    return span.textContent || "";
  });
};

/***/ }),

/***/ "./src/skiplagged/parser/getFlightContainer.ts":
/*!*****************************************************!*\
  !*** ./src/skiplagged/parser/getFlightContainer.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFlightContainer": () => (/* binding */ getFlightContainer)
/* harmony export */ });
/* harmony import */ var _shared_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/errors */ "./src/shared/errors.ts");
/* harmony import */ var _shared_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/events */ "./src/shared/events/index.ts");
/* harmony import */ var _shared_pause__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/pause */ "./src/shared/pause.ts");
/* harmony import */ var _shared_utilities_isVisible__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/utilities/isVisible */ "./src/shared/utilities/isVisible.ts");
/* harmony import */ var _shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/utilities/waitFor */ "./src/shared/utilities/waitFor.ts");
/* harmony import */ var _ui_disableHiddenCitySearches__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ui/disableHiddenCitySearches */ "./src/skiplagged/ui/disableHiddenCitySearches.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







var CONTAINER_SHELL_SELECTOR = "section #trip-list-wrapper";
var SORT_BUTTON_SELECTOR = "[data-sort='cost']";
var NO_RESULTS_SELECTOR = ".trip-list-empty";
var FLIGHT_CARD_SELECTOR = "div[class='trip']";
var LOADING_SELECTOR = "div.spinner-title";
var FLIGHT_CARDS_CONTAINER_SELECTOR = ".trip-list";
var INFINITE_SCROLL_CONTAINER_SELECTOR = ".infinite-trip-list";
var RETURN_HEADER_SELECTOR = ".trip-return-header";
var getFlightContainer = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (selectedFlight) {
    /*
    skiplagged maintains an infinite scroll trip list.
    It does not contain all elements at run, despite them being pulled from a GQL endpoint.
    In fact, many updates occur as the best price is retrieved from different providers.
    It does delete the top as you scroll down, so care is needed to not duplicate.
    */
    yield waitForLoad(selectedFlight);
    var flightType = selectedFlight ? "RETURN" : "DEPARTURE";

    var _ref2 = document.querySelectorAll(FLIGHT_CARDS_CONTAINER_SELECTOR),
        _ref3 = _slicedToArray(_ref2, 2),
        departureContainer = _ref3[0],
        returnContainer = _ref3[1];

    var container = flightType === "DEPARTURE" ? departureContainer : returnContainer;

    if (!container) {
      throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to locate ".concat(flightType.toLowerCase(), " container"));
    }

    if (!(0,_shared_utilities_isVisible__WEBPACK_IMPORTED_MODULE_3__.isVisible)(container)) {
      throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.ParserError("Flight container is not visible");
    }

    var tripListElement = container.querySelector(INFINITE_SCROLL_CONTAINER_SELECTOR);

    if (!tripListElement) {
      throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to locate infinite scroll container for ".concat(flightType.toLowerCase()));
    }

    var tripListContainer = tripListElement.children[0];

    if (!tripListContainer) {
      throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to locate infinite scroll container child for ".concat(flightType.toLowerCase()));
    }

    (0,_shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_4__.waitForAppearance)(15000, FLIGHT_CARD_SELECTOR, container);
    return tripListContainer;
  });

  return function getFlightContainer(_x) {
    return _ref.apply(this, arguments);
  };
}();

var isNoResults = function isNoResults(returnFlight) {
  var noResultsDiv = document.querySelector(NO_RESULTS_SELECTOR);

  if (!noResultsDiv) {
    if (returnFlight) {
      return false;
    }

    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to find the no results container");
  }

  return (0,_shared_utilities_isVisible__WEBPACK_IMPORTED_MODULE_3__.isVisible)(noResultsDiv);
};

var waitForLoad = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (selectedFlight) {
    yield (0,_shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_4__.waitForAppearance)(3000, CONTAINER_SHELL_SELECTOR);
    yield (0,_shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_4__.waitForAppearance)(3000, FLIGHT_CARDS_CONTAINER_SELECTOR);
    yield (0,_shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_4__.waitForAppearance)(10000, SORT_BUTTON_SELECTOR);

    if (selectedFlight) {
      yield (0,_shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_4__.waitForAppearance)(3000, RETURN_HEADER_SELECTOR);
      yield (0,_shared_pause__WEBPACK_IMPORTED_MODULE_2__.pause)(500);
    }

    yield (0,_shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_4__.waitForDisappearance)(15000, LOADING_SELECTOR);
    yield (0,_shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_4__.waitForAppearance)(15000, FLIGHT_CARD_SELECTOR);
    (0,_ui_disableHiddenCitySearches__WEBPACK_IMPORTED_MODULE_5__.disableHiddenCitySearches)();

    if (isNoResults(selectedFlight)) {
      var searchType = selectedFlight ? "RETURN" : "DEPARTURE";
      (0,_shared_events__WEBPACK_IMPORTED_MODULE_1__.sendNoFlightsEvent)("skiplagged", searchType);
    }
  });

  return function waitForLoad(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/skiplagged/parser/getFlightDetails.ts":
/*!***************************************************!*\
  !*** ./src/skiplagged/parser/getFlightDetails.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFlightDetails": () => (/* binding */ getFlightDetails)
/* harmony export */ });
/* harmony import */ var _shared_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/errors */ "./src/shared/errors.ts");
/* harmony import */ var _shared_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/helpers */ "./src/shared/helpers.js");
/* harmony import */ var _shared_types_FlightDetails__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/types/FlightDetails */ "./src/shared/types/FlightDetails.ts");
/* harmony import */ var _shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/utilities/waitFor */ "./src/shared/utilities/waitFor.ts");
/* harmony import */ var _getAirlines__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getAirlines */ "./src/skiplagged/parser/getAirlines.ts");
/* harmony import */ var _getLayovers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getLayovers */ "./src/skiplagged/parser/getLayovers.ts");
/* harmony import */ var _getParsedAirlineName__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getParsedAirlineName */ "./src/skiplagged/parser/getParsedAirlineName.ts");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }








var CONTAINER_SHELL_SELECTOR = "section #trip-list-wrapper";
var SORT_BUTTON_SELECTOR = "[data-sort='cost']";
var DURATION_SELECTOR = "span.trip-path-duration";
var TRIP_TIME_SELECTOR = "div[class*='trip-path-point-time']";
var HAS_STOP_REGEX = /\d{1,2} stops?/i;
var getFlightDetails = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (flightCard) {
    yield (0,_shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_3__.waitForAppearance)(3000, CONTAINER_SHELL_SELECTOR);
    yield (0,_shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_3__.waitForAppearance)(10000, SORT_BUTTON_SELECTOR);
    var marketingAirline = getAirlineName(flightCard);
    var fromTime = getDepartureTime(flightCard);
    var toTime = getArrivalTime(flightCard);

    var _getDurationDetails = getDurationDetails(flightCard),
        duration = _getDurationDetails.duration,
        hasStops = _getDurationDetails.hasStops;

    var layovers = (0,_getLayovers__WEBPACK_IMPORTED_MODULE_5__.getLayovers)(flightCard);

    if (!hasStops) {
      layovers = [];
    }

    return new _shared_types_FlightDetails__WEBPACK_IMPORTED_MODULE_2__.FlightDetails({
      marketingAirline: marketingAirline,
      operatingAirline: null,
      layovers: layovers,
      duration: duration,
      fromTime: fromTime,
      toTime: toTime
    });
  });

  return function getFlightDetails(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getDurationDetails = function getDurationDetails(flightCard) {
  var _durationContainer$te, _durationContainer$te2;

  var durationContainer = flightCard.querySelector(DURATION_SELECTOR);

  if (!durationContainer) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to lookup flight duration time");
  }

  var duration = (_durationContainer$te = durationContainer.textContent) === null || _durationContainer$te === void 0 ? void 0 : _durationContainer$te.split("|")[0].trim();
  var hasStops = HAS_STOP_REGEX.test(((_durationContainer$te2 = durationContainer.textContent) === null || _durationContainer$te2 === void 0 ? void 0 : _durationContainer$te2.split("|")[1].trim()) || "");

  if (!duration) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingFieldParserError("Unable to determine duration time for flight");
  }

  return {
    duration: duration,
    hasStops: hasStops
  };
};

var getAirlineName = function getAirlineName(flightCard) {
  var airlineNames = new Set();
  var flightNames = (0,_getAirlines__WEBPACK_IMPORTED_MODULE_4__.getAirlines)(flightCard);

  var _iterator = _createForOfIteratorHelper(flightNames),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var flightName = _step.value;
      var airlineName = (0,_getParsedAirlineName__WEBPACK_IMPORTED_MODULE_6__.getParsedAirlineName)(flightName);
      airlineNames.add(airlineName);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return airlineNames.size === 1 ? _toConsumableArray(airlineNames)[0] : "Multiple airlines";
};

var getDepartureTime = function getDepartureTime(flightCard) {
  var _timeElement$dataset;

  var timeElement = flightCard.querySelector(TRIP_TIME_SELECTOR);

  if (!timeElement) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to determine departure time");
  }

  var time = timeElement.textContent;

  if (!time) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingFieldParserError("Unable to extract departure time");
  }

  var dayDifference = parseInt(((_timeElement$dataset = timeElement.dataset) === null || _timeElement$dataset === void 0 ? void 0 : _timeElement$dataset.diffDays) || "0");

  if (dayDifference) {
    time += "+".concat(dayDifference);
  }

  return (0,_shared_helpers__WEBPACK_IMPORTED_MODULE_1__.standardizeTimeString)(time);
};

var getArrivalTime = function getArrivalTime(flightCard) {
  var _timeElement$dataset2;

  var timeElements = flightCard.querySelectorAll(TRIP_TIME_SELECTOR);

  if (!timeElements) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to find time elements");
  }

  var timeElement = Array.from(timeElements).slice(-1)[0];

  if (!timeElement) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to find arrival time");
  }

  var time = timeElement.textContent;

  if (!time) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingFieldParserError("Unable to extract arrival time");
  }

  var dayDifference = parseInt(((_timeElement$dataset2 = timeElement.dataset) === null || _timeElement$dataset2 === void 0 ? void 0 : _timeElement$dataset2.diffDays) || "0");

  if (dayDifference) {
    time += "+".concat(dayDifference);
  }

  return (0,_shared_helpers__WEBPACK_IMPORTED_MODULE_1__.standardizeTimeString)(time);
};

/***/ }),

/***/ "./src/skiplagged/parser/getLayovers.ts":
/*!**********************************************!*\
  !*** ./src/skiplagged/parser/getLayovers.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLayovers": () => (/* binding */ getLayovers)
/* harmony export */ });
/* harmony import */ var _shared_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/errors */ "./src/shared/errors.ts");
/* harmony import */ var _shared_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/helpers */ "./src/shared/helpers.js");
/* harmony import */ var _getAirlines__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getAirlines */ "./src/skiplagged/parser/getAirlines.ts");
/* harmony import */ var _getParsedAirlineName__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParsedAirlineName */ "./src/skiplagged/parser/getParsedAirlineName.ts");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





var TRIP_OVERVIEW_SELECTOR = "div.trip-path";
var TRIP_COMPONENT_SELECTOR = ".trip-path-point, .trip-path-spacer";
var TRIP_TIME_SELECTOR = "div[class*='trip-path-point-time']";
var TRIP_AIRPORT_SELECTOR = "span[class='airport-code']";
var TRIP_DURATION_SELECTOR = ".trip-path-spacer-label";
var TRIP_WAYPOINT_CLASSNAME_REGEX = /trip-path-point\b/;
var TRIP_SPACER_CLASSNAME_REGEX = /trip-path-spacer\b/;
var getLayovers = function getLayovers(flightCard) {
  var tripContainer = flightCard.querySelector(TRIP_OVERVIEW_SELECTOR);

  if (!tripContainer) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to lookup trip container");
  }

  var tripComponents = tripContainer.querySelectorAll(TRIP_COMPONENT_SELECTOR);

  if (!tripComponents) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to lookup trip components");
  }

  var airlines = (0,_getAirlines__WEBPACK_IMPORTED_MODULE_2__.getAirlines)(flightCard);
  var layovers = [];
  var incomplete = {};
  var previousDayDifference = 0;
  var skipNext = false;

  var _iterator = _createForOfIteratorHelper(tripComponents),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var component = _step.value;

      if (skipNext) {
        skipNext = false;
        continue;
      }

      var className = component.getAttribute("class") || "";

      switch (true) {
        case TRIP_WAYPOINT_CLASSNAME_REGEX.test(className):
          if (incomplete.from) {
            incomplete.to = getWaypointAirport(component);

            var _getWaypointTime = getWaypointTime(component, previousDayDifference),
                time = _getWaypointTime.time,
                delta = _getWaypointTime.dateDifference;

            incomplete.toTime = time;
            previousDayDifference = delta;
            layovers.push(incomplete);
            incomplete = {};
            skipNext = true;
          } else {
            incomplete.from = getWaypointAirport(component);

            var _getWaypointTime2 = getWaypointTime(component, previousDayDifference),
                _time = _getWaypointTime2.time,
                _delta = _getWaypointTime2.dateDifference;

            incomplete.fromTime = _time;
            previousDayDifference = _delta;
          }

          break;

        case TRIP_SPACER_CLASSNAME_REGEX.test(className):
          incomplete.duration = getDuration(component);
          incomplete.operatingAirline = (0,_getParsedAirlineName__WEBPACK_IMPORTED_MODULE_3__.getParsedAirlineName)(airlines[layovers.length]);
          break;

        default:
          throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.ParserError("Unknown case option ".concat(component.getAttribute("class")));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (!layovers) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.ParserError("Unable to identify layovers");
  }

  return layovers;
};

var getWaypointTime = function getWaypointTime(waypointContainer, previousDayDifference) {
  var _timeElement$dataset;

  /*
     Skiplagged sanely displays the +1 above each date.
     Our date system expects the +n to only occur on the actual transition for the difference between the two times.
     So, we have to keep track of previous date diffs to make our dates happy.  Whrgrbl!
  */
  var timeElement = waypointContainer.querySelector(TRIP_TIME_SELECTOR);

  if (!timeElement) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to determine waypoint time");
  }

  var time = timeElement.textContent;

  if (!time) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingFieldParserError("Unable to extract time");
  }

  var dateDelta = parseInt(((_timeElement$dataset = timeElement.dataset) === null || _timeElement$dataset === void 0 ? void 0 : _timeElement$dataset.diffDays) || "0");

  if (dateDelta && dateDelta > previousDayDifference) {
    time += "+".concat(dateDelta - previousDayDifference);
  }

  return {
    time: (0,_shared_helpers__WEBPACK_IMPORTED_MODULE_1__.standardizeTimeString)(time),
    dateDifference: dateDelta
  };
};

var getWaypointAirport = function getWaypointAirport(waypointContainer) {
  var airportElement = waypointContainer.querySelector(TRIP_AIRPORT_SELECTOR);

  if (!airportElement) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to determine waypoint airport");
  }

  var airportCode = airportElement.textContent;

  if (!airportCode) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingFieldParserError("Unable to extract airport code");
  }

  return airportCode;
};

var getDuration = function getDuration(spacerContainer) {
  var durationElement = spacerContainer.querySelector(TRIP_DURATION_SELECTOR);

  if (!durationElement) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to determine spacer duration");
  }

  var duration = durationElement.textContent;

  if (!duration) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingFieldParserError("Unable to extract duration");
  }

  return duration.trim();
};

/***/ }),

/***/ "./src/skiplagged/parser/getParsedAirlineName.ts":
/*!*******************************************************!*\
  !*** ./src/skiplagged/parser/getParsedAirlineName.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getParsedAirlineName": () => (/* binding */ getParsedAirlineName)
/* harmony export */ });
/* harmony import */ var _shared_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/errors */ "./src/shared/errors.ts");
/* harmony import */ var _shared_nameMaps_airlineMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/nameMaps/airlineMap.js */ "./src/shared/nameMaps/airlineMap.js");
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




var AIRLINE_NAME_REGEX = /*#__PURE__*/_wrapRegExp(/^([ A-Za-z]*)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([Ff]light)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([0-9]*)$/, {
  Airline: 1,
  Flight: 2,
  Number: 3
});

var getParsedAirlineName = function getParsedAirlineName(flightName) {
  var _flightName$match, _flightName$match$gro, _flightName$match$gro2;

  var result = (_flightName$match = flightName.match(AIRLINE_NAME_REGEX)) === null || _flightName$match === void 0 ? void 0 : (_flightName$match$gro = _flightName$match.groups) === null || _flightName$match$gro === void 0 ? void 0 : (_flightName$match$gro2 = _flightName$match$gro.Airline) === null || _flightName$match$gro2 === void 0 ? void 0 : _flightName$match$gro2.trim();

  if (!result) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.ParserError("Unable to extract airline name from ".concat(flightName));
  }

  var fullName = _shared_nameMaps_airlineMap_js__WEBPACK_IMPORTED_MODULE_1__.default.getAirlineName(result);

  if (!fullName) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.ParserError("Unable to extract airline name from airline map");
  }

  return fullName;
};

/***/ }),

/***/ "./src/skiplagged/parser/observer.ts":
/*!*******************************************!*\
  !*** ./src/skiplagged/parser/observer.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FlightObserver": () => (/* binding */ FlightObserver)
/* harmony export */ });
/* harmony import */ var _sendFlights__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sendFlights */ "./src/skiplagged/parser/sendFlights.ts");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var FlightObserver = /*#__PURE__*/function () {
  function FlightObserver() {
    var selectedFlight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, FlightObserver);

    this.flightMap = {}; // eslint-disable-next-line @typescript-eslint/no-this-alias

    var that = this;
    this.observer = new MutationObserver( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (mutations) {
        var flightCards = [];

        var _iterator = _createForOfIteratorHelper(mutations),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var mutation = _step.value;
            flightCards = flightCards.concat(Array.from(mutation.addedNodes));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        var newFlightMaps = yield (0,_sendFlights__WEBPACK_IMPORTED_MODULE_0__.sendFlights)(flightCards, that.flightMap, selectedFlight);
        that.addNewFlightsToMap(newFlightMaps);
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  _createClass(FlightObserver, [{
    key: "addNewFlightsToMap",
    value: function addNewFlightsToMap(mappings) {
      for (var flightPenguinId in mappings) {
        var _mappings$flightPengu = mappings[flightPenguinId],
            skiplaggedId = _mappings$flightPengu.skiplaggedId,
            lastUpdatedAt = _mappings$flightPengu.lastUpdatedAt;
        var currentRecord = this.flightMap[flightPenguinId];

        if (currentRecord) {
          if (currentRecord.skiplaggedId !== skiplaggedId && lastUpdatedAt > currentRecord.lastUpdatedAt) {
            this.flightMap[flightPenguinId] = {
              skiplaggedId: skiplaggedId,
              lastUpdatedAt: lastUpdatedAt
            };
          }
        } else {
          this.flightMap[flightPenguinId] = {
            skiplaggedId: skiplaggedId,
            lastUpdatedAt: lastUpdatedAt
          };
        }
      }
    }
  }, {
    key: "getSkiplaggedId",
    value: function getSkiplaggedId(flightPenguinId) {
      return this.flightMap[flightPenguinId]["skiplaggedId"];
    }
  }, {
    key: "beginObservation",
    value: function beginObservation(flightContainer) {
      this.observer.observe(flightContainer, {
        childList: true
      });
    }
  }, {
    key: "endObservation",
    value: function endObservation() {
      this.observer.disconnect();
    }
  }]);

  return FlightObserver;
}();

/***/ }),

/***/ "./src/skiplagged/parser/sendFlights.ts":
/*!**********************************************!*\
  !*** ./src/skiplagged/parser/sendFlights.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sendFlights": () => (/* binding */ sendFlights)
/* harmony export */ });
/* harmony import */ var _shared_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/errors */ "./src/shared/errors.ts");
/* harmony import */ var _shared_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/events */ "./src/shared/events/index.ts");
/* harmony import */ var _getFlightDetails__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getFlightDetails */ "./src/skiplagged/parser/getFlightDetails.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var FARE_PARENT_CONTAINER_SELECTOR = "div.trip-cost";
var sendFlights = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (flightCards, flightMap) {
    var selectedFlight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var flights = [];
    var newlyVisitedIds = {};

    var _iterator = _createForOfIteratorHelper(flightCards),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var node = _step.value;
        var flightCard = node;

        if (shouldSkipCard(flightCard)) {
          continue;
        }

        var flightDetails = yield (0,_getFlightDetails__WEBPACK_IMPORTED_MODULE_2__.getFlightDetails)(flightCard);

        var _ref2 = selectedFlight ? [selectedFlight, flightDetails] : [flightDetails, null],
            _ref3 = _slicedToArray(_ref2, 2),
            departureFlight = _ref3[0],
            returnFlight = _ref3[1];

        var fare = getFare(flightCard);
        var flightPenguinId = getFlightDatasetId(flightDetails);
        var skiplaggedShortId = getFlightCardShortId(flightCard);
        flightCard.dataset.fpid = flightPenguinId;
        flightCard.dataset.visited = "true";

        if (!shouldSkipFlight(flightPenguinId, skiplaggedShortId, flightMap)) {
          flights.push({
            departureFlight: departureFlight,
            returnFlight: returnFlight,
            fare: fare
          });
          newlyVisitedIds[flightPenguinId] = {
            skiplaggedId: skiplaggedShortId,
            lastUpdatedAt: new Date()
          };
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var sendFlightsFunc = selectedFlight ? _shared_events__WEBPACK_IMPORTED_MODULE_1__.sendReturnFlightsEvent : _shared_events__WEBPACK_IMPORTED_MODULE_1__.sendFlightsEvent;

    if (flights.length) {
      sendFlightsFunc("skiplagged", flights);
    }

    return newlyVisitedIds;
  });

  return function sendFlights(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var shouldSkipCard = function shouldSkipCard(flightCard) {
  var denyListTerms = ["bargain fare", "special fare", "after booking"];
  return denyListTerms.some(function (term) {
    var _flightCard$textConte;

    return (_flightCard$textConte = flightCard.textContent) === null || _flightCard$textConte === void 0 ? void 0 : _flightCard$textConte.includes(term);
  });
};

var shouldSkipFlight = function shouldSkipFlight(flightPenguinId, skiplaggedShortId, map) {
  var currentlyKnownId = map[flightPenguinId];

  if (currentlyKnownId && currentlyKnownId["skiplaggedId"] === skiplaggedShortId) {
    return true;
  }

  return false;
};

var getFlightDatasetId = function getFlightDatasetId(flight) {
  return [flight.fromTime, flight.toTime, flight.marketingAirline].join("-");
};

var getFare = function getFare(flightCard) {
  var fareWrapper = flightCard.querySelector(FARE_PARENT_CONTAINER_SELECTOR);

  if (!fareWrapper) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to find fare wrapper");
  }

  var fareContainer = fareWrapper.querySelector("p");

  if (!fareContainer) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to find fare container");
  }

  return fareContainer.textContent;
};

var getFlightCardShortId = function getFlightCardShortId(flightCard) {
  return flightCard.id.split('"key":')[1].split(",")[0].replace(/\W/g, "").trim();
};

/***/ }),

/***/ "./src/skiplagged/ui/clearSelection.ts":
/*!*********************************************!*\
  !*** ./src/skiplagged/ui/clearSelection.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearSelection": () => (/* binding */ clearSelection)
/* harmony export */ });
/* harmony import */ var _shared_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/errors */ "./src/shared/errors.ts");
/* harmony import */ var _shared_pause__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/pause */ "./src/shared/pause.ts");
/* harmony import */ var _shared_utilities_isVisible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/utilities/isVisible */ "./src/shared/utilities/isVisible.ts");
/* harmony import */ var _highlightFlightCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./highlightFlightCard */ "./src/skiplagged/ui/highlightFlightCard.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var RETURN_HEADER_SELECTOR = ".trip-return-header";
var SELECTED_FLIGHT_CARD_SELECTOR = ".selected-trip";
var clearSelection = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    (0,_highlightFlightCard__WEBPACK_IMPORTED_MODULE_3__.clearExistingSelections)();

    if (!isSelectingReturnFlight()) {
      return;
    }

    var flightCard = getSelectedFlightCard();
    flightCard.click();
    yield waitForLoad();
  });

  return function clearSelection() {
    return _ref.apply(this, arguments);
  };
}();

var isSelectingReturnFlight = function isSelectingReturnFlight() {
  var returnHeader = document.querySelector(RETURN_HEADER_SELECTOR);

  if (!returnHeader) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to locate return header");
  }

  return (0,_shared_utilities_isVisible__WEBPACK_IMPORTED_MODULE_2__.isVisible)(returnHeader);
};

var getSelectedFlightCard = function getSelectedFlightCard() {
  var flightCard = document.querySelector(SELECTED_FLIGHT_CARD_SELECTOR);

  if (!flightCard) {
    throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.MissingElementLookupError("Unable to selected departure flight card");
  }

  return flightCard;
};

var waitForLoad = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* () {
    // not much in the way of appearance/disappearance...
    yield (0,_shared_pause__WEBPACK_IMPORTED_MODULE_1__.pause)(500);
  });

  return function waitForLoad() {
    return _ref2.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/skiplagged/ui/disableHiddenCitySearches.ts":
/*!********************************************************!*\
  !*** ./src/skiplagged/ui/disableHiddenCitySearches.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "disableHiddenCitySearches": () => (/* binding */ disableHiddenCitySearches)
/* harmony export */ });
var STANDARD_SELECTOR = "input[data-name='standard']";
var disableHiddenCitySearches = function disableHiddenCitySearches() {
  var input = document.querySelector(STANDARD_SELECTOR);

  if (input) {
    var _input$parentElement;

    var only = (_input$parentElement = input.parentElement) === null || _input$parentElement === void 0 ? void 0 : _input$parentElement.querySelector(".only");

    if (only) {
      only.click();
    }
  }
};

/***/ }),

/***/ "./src/skiplagged/ui/findFlightCard.ts":
/*!*********************************************!*\
  !*** ./src/skiplagged/ui/findFlightCard.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findFlightCard": () => (/* binding */ findFlightCard)
/* harmony export */ });
/* harmony import */ var _shared_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/errors */ "./src/shared/errors.ts");
/* harmony import */ var _shared_pause__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/pause */ "./src/shared/pause.ts");
/* harmony import */ var _scrollThroughContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scrollThroughContainer */ "./src/skiplagged/ui/scrollThroughContainer.ts");
/* harmony import */ var _scrollToFlightCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scrollToFlightCard */ "./src/skiplagged/ui/scrollToFlightCard.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var FLIGHT_CARD_SELECTOR = "div[class='trip']";
var findFlightCard = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (skiplaggedFlightId) {
    (0,_scrollThroughContainer__WEBPACK_IMPORTED_MODULE_2__.stopScrollingNow)();
    yield (0,_shared_pause__WEBPACK_IMPORTED_MODULE_1__.pause)(300);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    yield (0,_shared_pause__WEBPACK_IMPORTED_MODULE_1__.pause)(1000);
    var flightSelector = "div[id*='\"key\":\"".concat(skiplaggedFlightId, "\"']");
    var flightCard = null;
    var lastFlightCard = (0,_scrollThroughContainer__WEBPACK_IMPORTED_MODULE_2__.getLastFlightCard)(document);
    var batchLastFlightCard = null;

    while (lastFlightCard !== batchLastFlightCard) {
      flightCard = document.querySelector(flightSelector);

      if (flightCard) {
        break;
      }

      var flightCards = document.querySelectorAll(FLIGHT_CARD_SELECTOR);
      batchLastFlightCard = Array.from(flightCards).slice(-1)[0];
      (0,_scrollToFlightCard__WEBPACK_IMPORTED_MODULE_3__.scrollToFlightCard)(batchLastFlightCard);
      yield (0,_shared_pause__WEBPACK_IMPORTED_MODULE_1__.pause)(300, 50, 100);
      lastFlightCard = (0,_scrollThroughContainer__WEBPACK_IMPORTED_MODULE_2__.getLastFlightCard)(document);
    }

    if (flightCard) {
      return flightCard;
    } else {
      throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.ParserError("Could not find flight card");
    }
  });

  return function findFlightCard(_x) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/skiplagged/ui/highlightFlightCard.ts":
/*!**************************************************!*\
  !*** ./src/skiplagged/ui/highlightFlightCard.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "highlightFlightCard": () => (/* binding */ highlightFlightCard),
/* harmony export */   "clearExistingSelections": () => (/* binding */ clearExistingSelections)
/* harmony export */ });
/* harmony import */ var _shared_ui_manageSelectionHighlights__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/ui/manageSelectionHighlights */ "./src/shared/ui/manageSelectionHighlights.ts");
/* harmony import */ var _findFlightCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./findFlightCard */ "./src/skiplagged/ui/findFlightCard.ts");
/* harmony import */ var _scrollToFlightCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scrollToFlightCard */ "./src/skiplagged/ui/scrollToFlightCard.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var highlightFlightCard = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (selectedFlightId) {
    clearExistingSelections();
    var flightCard = yield (0,_findFlightCard__WEBPACK_IMPORTED_MODULE_1__.findFlightCard)(selectedFlightId);
    (0,_shared_ui_manageSelectionHighlights__WEBPACK_IMPORTED_MODULE_0__.highlightSelectedElement)(flightCard);
    (0,_scrollToFlightCard__WEBPACK_IMPORTED_MODULE_2__.scrollToFlightCard)(flightCard);
  });

  return function highlightFlightCard(_x) {
    return _ref.apply(this, arguments);
  };
}();
var clearExistingSelections = function clearExistingSelections() {
  var previousDepSelection = document.querySelector("[data-selected='true']");

  if (previousDepSelection) {
    (0,_shared_ui_manageSelectionHighlights__WEBPACK_IMPORTED_MODULE_0__.clearHighlightFromElement)(previousDepSelection);
  }
};

/***/ }),

/***/ "./src/skiplagged/ui/scrollThroughContainer.ts":
/*!*****************************************************!*\
  !*** ./src/skiplagged/ui/scrollThroughContainer.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scrollThroughContainer": () => (/* binding */ scrollThroughContainer),
/* harmony export */   "stopScrollingNow": () => (/* binding */ stopScrollingNow),
/* harmony export */   "removeScrollingCheck": () => (/* binding */ removeScrollingCheck),
/* harmony export */   "getLastFlightCard": () => (/* binding */ getLastFlightCard)
/* harmony export */ });
/* harmony import */ var _shared_pause__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/pause */ "./src/shared/pause.ts");
/* harmony import */ var _shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utilities/waitFor */ "./src/shared/utilities/waitFor.ts");
/* harmony import */ var _scrollToFlightCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scrollToFlightCard */ "./src/skiplagged/ui/scrollToFlightCard.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var FLIGHT_CARD_SELECTOR = "div[class='trip']";
var PROGRESS_SELECTOR = ".ui-mprogress";
var STOP_SCROLLING_ID = "stop-scrolling";
var STOP_SCROLLING_SELECTOR = "div#".concat(STOP_SCROLLING_ID);
var scrollThroughContainer = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (container) {
    yield (0,_shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_1__.waitForDisappearance)(45000, PROGRESS_SELECTOR);
    yield (0,_shared_utilities_waitFor__WEBPACK_IMPORTED_MODULE_1__.waitForAppearance)(45000, FLIGHT_CARD_SELECTOR, container);
    removeScrollingCheck(null);
    var startTime = new Date().getTime();

    while (getTimeSinceStart(startTime) < 60000) {
      if (stopScrollingCheck(true)) {
        break;
      }

      yield progressiveScrollingOnce(container);
      yield (0,_shared_pause__WEBPACK_IMPORTED_MODULE_0__.pause)(300, 100, 200);
    }
  });

  return function scrollThroughContainer(_x) {
    return _ref.apply(this, arguments);
  };
}();

var progressiveScrollingOnce = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (flightContainer) {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    yield (0,_shared_pause__WEBPACK_IMPORTED_MODULE_0__.pause)(1000, 100, 200);
    var lastFlightCard = getLastFlightCard(flightContainer);
    var batchLastFlightCard = null;

    while (lastFlightCard !== batchLastFlightCard) {
      if (stopScrollingCheck(false)) {
        break;
      }

      var flightCards = flightContainer.querySelectorAll(FLIGHT_CARD_SELECTOR);
      batchLastFlightCard = Array.from(flightCards).slice(-1)[0];
      (0,_scrollToFlightCard__WEBPACK_IMPORTED_MODULE_2__.scrollToFlightCard)(batchLastFlightCard);

      if (stopScrollingCheck(false)) {
        break;
      }

      yield (0,_shared_pause__WEBPACK_IMPORTED_MODULE_0__.pause)(300, 50, 100);
      lastFlightCard = getLastFlightCard(flightContainer);
    }
  });

  return function progressiveScrollingOnce(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getTimeSinceStart = function getTimeSinceStart(startTime) {
  var currentTime = new Date().getTime();
  return currentTime - startTime;
};

var stopScrollingCheck = function stopScrollingCheck(remove) {
  var div = document.querySelector(STOP_SCROLLING_SELECTOR);
  var stopScrolling = !!div;

  if (stopScrolling && remove) {
    removeScrollingCheck(div);
  }

  return stopScrolling;
};

var stopScrollingNow = function stopScrollingNow() {
  var div = document.createElement("div");
  div.id = STOP_SCROLLING_ID;
  document.body.appendChild(div);
};
var removeScrollingCheck = function removeScrollingCheck(div) {
  var element = div ? div : document.querySelector(STOP_SCROLLING_SELECTOR);

  if (element) {
    element.remove();
  }
};
var getLastFlightCard = function getLastFlightCard(container) {
  return Array.from(container.querySelectorAll(FLIGHT_CARD_SELECTOR)).slice(-1)[0];
};

/***/ }),

/***/ "./src/skiplagged/ui/scrollToFlightCard.ts":
/*!*************************************************!*\
  !*** ./src/skiplagged/ui/scrollToFlightCard.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scrollToFlightCard": () => (/* binding */ scrollToFlightCard)
/* harmony export */ });
var scrollToFlightCard = function scrollToFlightCard(flightCard) {
  var yPosition = window.pageYOffset + flightCard.getBoundingClientRect().top - window.innerHeight / 2;
  window.scrollTo({
    top: yPosition,
    behavior: "smooth"
  });
};

/***/ }),

/***/ "./src/skiplagged/ui/selectFlightCard.ts":
/*!***********************************************!*\
  !*** ./src/skiplagged/ui/selectFlightCard.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "selectFlightCard": () => (/* binding */ selectFlightCard)
/* harmony export */ });
/* harmony import */ var _findFlightCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./findFlightCard */ "./src/skiplagged/ui/findFlightCard.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


var selectFlightCard = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (skiplaggedId) {
    var flightCard = yield (0,_findFlightCard__WEBPACK_IMPORTED_MODULE_0__.findFlightCard)(skiplaggedId);
    flightCard.click();
  });

  return function selectFlightCard(_x) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/utilityFunctions.js":
/*!*********************************!*\
  !*** ./src/utilityFunctions.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertTimeTo24HourClock": () => (/* binding */ convertTimeTo24HourClock),
/* harmony export */   "convertMinutesTo12HourClock": () => (/* binding */ convertMinutesTo12HourClock),
/* harmony export */   "convert12HourTimeToMinutes": () => (/* binding */ convert12HourTimeToMinutes),
/* harmony export */   "getTimezoneOffset": () => (/* binding */ getTimezoneOffset),
/* harmony export */   "convertDurationToMinutes": () => (/* binding */ convertDurationToMinutes),
/* harmony export */   "getTimeDetails": () => (/* binding */ getTimeDetails),
/* harmony export */   "addTimezoneOffset": () => (/* binding */ addTimezoneOffset),
/* harmony export */   "isOvernight": () => (/* binding */ isOvernight)
/* harmony export */ });
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
  return Number(durationMinutes) + Number(durationHours) * 60;
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

  return fromTime.toLowerCase().includes("pm") && toTime.toLowerCase().includes("am");
}



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
  !*** ./src/skiplagged/contentScript.ts ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shared_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/errors */ "./src/shared/errors.ts");
/* harmony import */ var _shared_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/events */ "./src/shared/events/index.ts");
/* harmony import */ var _shared_ui_backToSearch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/ui/backToSearch */ "./src/shared/ui/backToSearch.ts");
/* harmony import */ var _parser_getFlightContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parser/getFlightContainer */ "./src/skiplagged/parser/getFlightContainer.ts");
/* harmony import */ var _parser_observer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parser/observer */ "./src/skiplagged/parser/observer.ts");
/* harmony import */ var _ui_clearSelection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ui/clearSelection */ "./src/skiplagged/ui/clearSelection.ts");
/* harmony import */ var _ui_highlightFlightCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui/highlightFlightCard */ "./src/skiplagged/ui/highlightFlightCard.ts");
/* harmony import */ var _ui_scrollThroughContainer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ui/scrollThroughContainer */ "./src/skiplagged/ui/scrollThroughContainer.ts");
/* harmony import */ var _ui_selectFlightCard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ui/selectFlightCard */ "./src/skiplagged/ui/selectFlightCard.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


window.Sentry.init({
  dsn: "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451"
});








var departureFlightContainer;
var departureObserver = null;
var returnFlightContainer;
var returnObserver = null;
chrome.runtime.onMessage.addListener( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (message) {
    var _departureObserver, _departureObserver2, _returnObserver, _departureObserver3, _returnObserver2;

    switch (message.event) {
      case "BEGIN_PARSING":
        departureObserver = new _parser_observer__WEBPACK_IMPORTED_MODULE_4__.FlightObserver(null);
        departureFlightContainer = yield attachObserver(departureObserver, null);

        if (departureFlightContainer) {
          yield (0,_ui_scrollThroughContainer__WEBPACK_IMPORTED_MODULE_7__.scrollThroughContainer)(departureFlightContainer);
        }

        (0,_shared_events__WEBPACK_IMPORTED_MODULE_1__.sendScraperComplete)("skiplagged", "DEPARTURE");
        departureObserver.endObservation();
        break;

      case "GET_RETURN_FLIGHTS":
        (_departureObserver = departureObserver) === null || _departureObserver === void 0 ? void 0 : _departureObserver.endObservation();
        (0,_ui_scrollThroughContainer__WEBPACK_IMPORTED_MODULE_7__.stopScrollingNow)();
        returnObserver = new _parser_observer__WEBPACK_IMPORTED_MODULE_4__.FlightObserver(message.departure);
        returnFlightContainer = yield attachObserver(returnObserver, getSkiplaggedDepartureId(departureObserver, message.departure.id));

        if (returnFlightContainer) {
          yield (0,_ui_scrollThroughContainer__WEBPACK_IMPORTED_MODULE_7__.scrollThroughContainer)(returnFlightContainer);
        }

        (0,_shared_events__WEBPACK_IMPORTED_MODULE_1__.sendScraperComplete)("skiplagged", "RETURN");
        break;

      case "HIGHLIGHT_FLIGHT":
        (0,_ui_scrollThroughContainer__WEBPACK_IMPORTED_MODULE_7__.stopScrollingNow)();
        (_departureObserver2 = departureObserver) === null || _departureObserver2 === void 0 ? void 0 : _departureObserver2.endObservation();
        (_returnObserver = returnObserver) === null || _returnObserver === void 0 ? void 0 : _returnObserver.endObservation();
        yield highlightFlight(message.selectedDepartureId, departureObserver, message.selectedReturnId, returnObserver);
        break;

      case "CLEAR_SELECTION":
        (_departureObserver3 = departureObserver) === null || _departureObserver3 === void 0 ? void 0 : _departureObserver3.endObservation();
        (_returnObserver2 = returnObserver) === null || _returnObserver2 === void 0 ? void 0 : _returnObserver2.endObservation();
        (0,_ui_scrollThroughContainer__WEBPACK_IMPORTED_MODULE_7__.stopScrollingNow)();
        yield (0,_ui_clearSelection__WEBPACK_IMPORTED_MODULE_5__.clearSelection)();
        chrome.runtime.sendMessage({
          event: "PROVIDER_READY",
          provider: "skiplagged"
        });
        break;

      default:
        break;
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

var attachObserver = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (observer, skiplaggedFlightId) {
    try {
      if (skiplaggedFlightId) {
        yield (0,_ui_selectFlightCard__WEBPACK_IMPORTED_MODULE_8__.selectFlightCard)(skiplaggedFlightId);
      }

      var flightContainer = yield (0,_parser_getFlightContainer__WEBPACK_IMPORTED_MODULE_3__.getFlightContainer)(!!skiplaggedFlightId);
      observer.beginObservation(flightContainer);
      return flightContainer;
    } catch (error) {
      window.Sentry.captureException(error);
      var flightType = skiplaggedFlightId ? "RETURN" : "DEPARTURE";
      (0,_shared_events__WEBPACK_IMPORTED_MODULE_1__.sendFailedScraper)("skiplagged", error, flightType);
      return null;
    }
  });

  return function attachObserver(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var highlightFlight = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (flightPenguinDepartureId, departureObserver, flightPenguinReturnId, returnObserver) {
    (0,_shared_ui_backToSearch__WEBPACK_IMPORTED_MODULE_2__.addBackToSearchButton)();

    try {
      var flightId;

      if (flightPenguinReturnId) {
        flightId = returnObserver === null || returnObserver === void 0 ? void 0 : returnObserver.getSkiplaggedId(flightPenguinReturnId);
      } else if (flightPenguinDepartureId) {
        flightId = departureObserver === null || departureObserver === void 0 ? void 0 : departureObserver.getSkiplaggedId(flightPenguinDepartureId);
      } else {
        throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.ParserError("highlighting without a flight...");
      }

      yield (0,_ui_highlightFlightCard__WEBPACK_IMPORTED_MODULE_6__.highlightFlightCard)(flightId || "");
    } catch (error) {
      window.Sentry.captureException(error);
      var flightType = flightPenguinReturnId ? "RETURN" : "DEPARTURE";
      (0,_shared_events__WEBPACK_IMPORTED_MODULE_1__.sendFailedScraper)("skiplagged", error, flightType);
    }
  });

  return function highlightFlight(_x4, _x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var getSkiplaggedDepartureId = function getSkiplaggedDepartureId(departureObserver, flightPenguinId) {
  if (departureObserver) {
    return departureObserver.getSkiplaggedId(flightPenguinId);
  }

  throw new _shared_errors__WEBPACK_IMPORTED_MODULE_0__.ParserError("Departure observer not initialized...");
};
})();

/******/ })()
;