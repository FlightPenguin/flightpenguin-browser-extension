/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/shared/ui/backToSearch.ts
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
;// CONCATENATED MODULE: ./src/shared/errors.ts
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
;// CONCATENATED MODULE: ./src/shared/events/sendFailedScraper.ts
function sendFailedScraper(providerName, error) {
  chrome.runtime.sendMessage({
    event: "FAILED_SCRAPER",
    source: providerName,
    description: "".concat(error.name, " ").concat(error.message)
  });
}
;// CONCATENATED MODULE: ./src/shared/events/sendNoFlights.ts
function sendNoFlightsEvent(providerName) {
  chrome.runtime.sendMessage({
    event: "NO_FLIGHTS_FOUND",
    provider: providerName
  });
}
;// CONCATENATED MODULE: ./src/shared/pause.ts
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
;// CONCATENATED MODULE: ./src/shared/utilities/isVisible.ts
var isVisible = function isVisible(element) {
  return element.offsetWidth > 0 && element.offsetHeight > 0;
};
;// CONCATENATED MODULE: ./node_modules/wait-for-the-element/wait-for-the-element.js
function t(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,u){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==r)return;var e,n,o=[],F=!0,i=!1;try{for(r=r.call(t);!(F=(e=r.next()).done)&&(o.push(e.value),!u||o.length!==u);F=!0);}catch(t){i=!0,n=t}finally{try{F||null==r.return||r.return()}finally{if(i)throw n}}return o}(t,r)||u(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(t,u){if(t){if("string"==typeof t)return r(t,u);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?r(t,u):void 0}}function r(t,u){(null==u||u>t.length)&&(u=t.length);for(var r=0,e=new Array(u);r<u;r++)e[r]=t[r];return e}var e=/\.(?:(?:[\x2D0-9A-Z_a-z\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])|\\(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))+/,n=/#(?:(?:[\x2D0-9A-Z_a-z\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])|\\(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))+/,o=/\[[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*((?:(?:\*|[\x2D0-9A-Z_a-z]*)\|)?(?:(?:[\x2D0-9A-Z_a-z\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+))/g,F={};function i(r){var i=F[r];if(i)return i;i=F[r]={attributes:!0,subtree:!0,childList:!0};var a,l=[],c=function(t,r){var e="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!e){if(Array.isArray(t)||(e=u(t))||r&&t&&"number"==typeof t.length){e&&(t=e);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var F,i=!0,a=!1;return{s:function(){e=e.call(t)},n:function(){var t=e.next();return i=t.done,t},e:function(t){a=!0,F=t},f:function(){try{i||null==e.return||e.return()}finally{if(a)throw F}}}}(r.matchAll(o));try{for(c.s();!(a=c.n()).done;){var D=t(a.value,2)[1];if(D.startsWith("*")||D.startsWith("|"))return i;l.push(D.replace("|",":"))}}catch(t){c.e(t)}finally{c.f()}return e.test(r)&&l.push("class"),n.test(r)&&l.push("id"),0===l.length?i.attributes=!1:i.attributeFilter=l,i}function a(t){var u=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=u.timeout,e=void 0===r?2500:r,n=u.scope,o=void 0===n?document:n;return new Promise((function(u){var r=o.querySelector(t);if(null===r){var n=null,F=new MutationObserver((function(){var r=o.querySelector(t);null!==r&&(clearTimeout(n),F.disconnect(),u(r))}));F.observe(o,i(t)),n=setTimeout((function(){F.disconnect(),u(null)}),e)}else u(r)}))}function l(t){var u=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=u.timeout,e=void 0===r?2500:r,n=u.scope,o=void 0===n?document:n;return new Promise((function(u){var r=null;if(null!==o.querySelector(t)){var n=new MutationObserver((function(){null===o.querySelector(t)&&(clearTimeout(r),n.disconnect(),u(!0))}));n.observe(o,i(t)),r=setTimeout((function(){n.disconnect(),u(!1)}),e)}else u(!0)}))}

;// CONCATENATED MODULE: ./src/shared/utilities/waitFor.ts
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var waitForDisappearance = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (loadingTimeout, selector) {
    var doc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.document;

    if (doc.querySelector(selector)) {
      var loadingIndicator = yield l(selector, {
        timeout: loadingTimeout,
        scope: doc
      });

      if (!loadingIndicator) {
        throw new LoadingTimeoutParserError("Took longer than ".concat(loadingTimeout, " ms to make the loading indicator (").concat(selector, ") disappear"));
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
      container = yield a(selector, {
        timeout: loadingTimeout,
        scope: doc
      });

      if (!container) {
        throw new LoadingTimeoutParserError("Render of ".concat(selector, " failed to complete in ").concat(loadingTimeout));
      }
    }

    return container;
  });

  return function waitForAppearance() {
    return _ref2.apply(this, arguments);
  };
}();
;// CONCATENATED MODULE: ./src/skiplagged/ui/disableHiddenCitySearches.ts
var HIDDEN_CITY_SELECTOR = "input[data-name='hiddenCity']";
var disableHiddenCitySearches = function disableHiddenCitySearches() {
  var input = document.querySelector(HIDDEN_CITY_SELECTOR);

  if (input) {
    input.click();
  }
};
;// CONCATENATED MODULE: ./src/skiplagged/ui/scrollToFlightCard.ts
var scrollToFlightCard = function scrollToFlightCard(flightCard) {
  var yPosition = window.pageYOffset + flightCard.getBoundingClientRect().top - window.innerHeight / 2;
  window.scrollTo(0, yPosition);
};
;// CONCATENATED MODULE: ./src/shared/events/sendReturnFlights.ts
function sendReturnFlightsEvent(providerName, flights) {
  chrome.runtime.sendMessage({
    event: "RETURN_FLIGHTS_RECEIVED",
    flights: flights,
    provider: providerName
  });
}
;// CONCATENATED MODULE: ./src/shared/events/sendFlights.ts
function sendFlightsEvent(providerName, flights) {
  chrome.runtime.sendMessage({
    event: "FLIGHT_RESULTS_RECEIVED",
    flights: flights,
    provider: providerName
  });
}
;// CONCATENATED MODULE: ./src/shared/helpers.js
var standardizeTimeString = function standardizeTimeString(time) {
  return time.toLowerCase().replace(" ", "").trim();
};


;// CONCATENATED MODULE: ./src/skiplagged/parser/getAirlines.ts

var TRIP_AIRLINES_SELECTOR = "span.airlines";
var getAirlines = function getAirlines(flightCard) {
  var _airlineTooltipContai;

  var airlineTooltipContainer = flightCard.querySelector(TRIP_AIRLINES_SELECTOR);

  if (!airlineTooltipContainer) {
    throw new MissingElementLookupError("Unable to find airline tooltip container");
  }

  var unparsedHtml = (_airlineTooltipContai = airlineTooltipContainer.dataset) === null || _airlineTooltipContai === void 0 ? void 0 : _airlineTooltipContai.originalTitle;

  if (!unparsedHtml) {
    throw new MissingFieldParserError("Unable to find original title of tooltip");
  }

  var parser = new DOMParser();
  var parsedDocument = parser.parseFromString(unparsedHtml, "text/html");
  var airlineElements = parsedDocument.querySelectorAll("span");

  if (!airlineElements) {
    throw new MissingFieldParserError("Unable to find span in tooltip");
  }

  return Array.from(airlineElements).map(function (span) {
    return span.textContent || "";
  });
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
    },
    "Multiple airlines": {
      display: "Multiple",
      color: "#000000"
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
;// CONCATENATED MODULE: ./src/skiplagged/parser/getParsedAirlineName.ts
function getParsedAirlineName_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { getParsedAirlineName_typeof = function _typeof(obj) { return typeof obj; }; } else { getParsedAirlineName_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return getParsedAirlineName_typeof(obj); }

function _wrapRegExp(re, groups) { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, undefined, groups); }; var _RegExp = getParsedAirlineName_wrapNativeSuper(RegExp); var _super = RegExp.prototype; var _groups = new WeakMap(); function BabelRegExp(re, flags, groups) { var _this = _RegExp.call(this, re, flags); _groups.set(_this, groups || _groups.get(re)); return _this; } getParsedAirlineName_inherits(BabelRegExp, _RegExp); BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); if (result) result.groups = buildGroups(result, this); return result; }; BabelRegExp.prototype[Symbol.replace] = function (str, substitution) { if (typeof substitution === "string") { var groups = _groups.get(this); return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) { return "$" + groups[name]; })); } else if (typeof substitution === "function") { var _this = this; return _super[Symbol.replace].call(this, str, function () { var args = []; args.push.apply(args, arguments); if (getParsedAirlineName_typeof(args[args.length - 1]) !== "object") { args.push(buildGroups(args, _this)); } return substitution.apply(this, args); }); } else { return _super[Symbol.replace].call(this, str, substitution); } }; function buildGroups(result, re) { var g = _groups.get(re); return Object.keys(g).reduce(function (groups, name) { groups[name] = result[g[name]]; return groups; }, Object.create(null)); } return _wrapRegExp.apply(this, arguments); }

function getParsedAirlineName_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) getParsedAirlineName_setPrototypeOf(subClass, superClass); }

function getParsedAirlineName_possibleConstructorReturn(self, call) { if (call && (getParsedAirlineName_typeof(call) === "object" || typeof call === "function")) { return call; } return getParsedAirlineName_assertThisInitialized(self); }

function getParsedAirlineName_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function getParsedAirlineName_wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; getParsedAirlineName_wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !getParsedAirlineName_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return getParsedAirlineName_construct(Class, arguments, getParsedAirlineName_getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return getParsedAirlineName_setPrototypeOf(Wrapper, Class); }; return getParsedAirlineName_wrapNativeSuper(Class); }

function getParsedAirlineName_construct(Parent, args, Class) { if (getParsedAirlineName_isNativeReflectConstruct()) { getParsedAirlineName_construct = Reflect.construct; } else { getParsedAirlineName_construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) getParsedAirlineName_setPrototypeOf(instance, Class.prototype); return instance; }; } return getParsedAirlineName_construct.apply(null, arguments); }

function getParsedAirlineName_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function getParsedAirlineName_isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function getParsedAirlineName_setPrototypeOf(o, p) { getParsedAirlineName_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return getParsedAirlineName_setPrototypeOf(o, p); }

function getParsedAirlineName_getPrototypeOf(o) { getParsedAirlineName_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return getParsedAirlineName_getPrototypeOf(o); }




var AIRLINE_NAME_REGEX = /*#__PURE__*/_wrapRegExp(/^([ A-Za-z]*)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([Ff]light)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([0-9]*)$/, {
  Airline: 1,
  Flight: 2,
  Number: 3
});

var getParsedAirlineName = function getParsedAirlineName(flightName) {
  var _flightName$match, _flightName$match$gro, _flightName$match$gro2;

  var result = (_flightName$match = flightName.match(AIRLINE_NAME_REGEX)) === null || _flightName$match === void 0 ? void 0 : (_flightName$match$gro = _flightName$match.groups) === null || _flightName$match$gro === void 0 ? void 0 : (_flightName$match$gro2 = _flightName$match$gro.Airline) === null || _flightName$match$gro2 === void 0 ? void 0 : _flightName$match$gro2.trim();

  if (!result) {
    throw new ParserError("Unable to extract airline name from ".concat(flightName));
  }

  var fullName = airlineMap.getAirlineName(result);

  if (!fullName) {
    throw new ParserError("Unable to extract airline name from airline map");
  }

  return fullName;
};
;// CONCATENATED MODULE: ./src/skiplagged/parser/getLayovers.ts
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
    throw new MissingElementLookupError("Unable to lookup trip container");
  }

  var tripComponents = tripContainer.querySelectorAll(TRIP_COMPONENT_SELECTOR);

  if (!tripComponents) {
    throw new MissingElementLookupError("Unable to lookup trip components");
  }

  var airlines = getAirlines(flightCard);
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
          incomplete.operatingAirline = getParsedAirlineName(airlines[layovers.length]);
          break;

        default:
          throw new ParserError("Unknown case option ".concat(component.getAttribute("class")));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (!layovers) {
    throw new ParserError("Unable to identify layovers");
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
    throw new MissingElementLookupError("Unable to determine waypoint time");
  }

  var time = timeElement.textContent;

  if (!time) {
    throw new MissingFieldParserError("Unable to extract time");
  }

  var dateDelta = parseInt(((_timeElement$dataset = timeElement.dataset) === null || _timeElement$dataset === void 0 ? void 0 : _timeElement$dataset.diffDays) || "0");

  if (dateDelta && dateDelta > previousDayDifference) {
    time += "+".concat(dateDelta - previousDayDifference);
  }

  return {
    time: standardizeTimeString(time),
    dateDifference: dateDelta
  };
};

var getWaypointAirport = function getWaypointAirport(waypointContainer) {
  var airportElement = waypointContainer.querySelector(TRIP_AIRPORT_SELECTOR);

  if (!airportElement) {
    throw new MissingElementLookupError("Unable to determine waypoint airport");
  }

  var airportCode = airportElement.textContent;

  if (!airportCode) {
    throw new MissingFieldParserError("Unable to extract airport code");
  }

  return airportCode;
};

var getDuration = function getDuration(spacerContainer) {
  var durationElement = spacerContainer.querySelector(TRIP_DURATION_SELECTOR);

  if (!durationElement) {
    throw new MissingElementLookupError("Unable to determine spacer duration");
  }

  var duration = durationElement.textContent;

  if (!duration) {
    throw new MissingFieldParserError("Unable to extract duration");
  }

  return duration.trim();
};
;// CONCATENATED MODULE: ./src/skiplagged/parser/getFlightDetails.ts
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || getFlightDetails_unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return getFlightDetails_arrayLikeToArray(arr); }

function getFlightDetails_createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = getFlightDetails_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function getFlightDetails_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return getFlightDetails_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return getFlightDetails_arrayLikeToArray(o, minLen); }

function getFlightDetails_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getFlightDetails_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function getFlightDetails_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { getFlightDetails_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { getFlightDetails_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







var CONTAINER_SHELL_SELECTOR = "section #trip-list-wrapper";
var SORT_BUTTON_SELECTOR = "[data-sort='cost']";
var DURATION_SELECTOR = "span.trip-path-duration";
var getFlightDetails_TRIP_TIME_SELECTOR = "div[class*='trip-path-point-time']";
var HAS_STOP_REGEX = /\d{1,2} stops?/i;
var getFlightDetails = /*#__PURE__*/function () {
  var _ref = getFlightDetails_asyncToGenerator(function* (flightCard) {
    yield waitForAppearance(3000, CONTAINER_SHELL_SELECTOR);
    yield waitForAppearance(10000, SORT_BUTTON_SELECTOR);
    var marketingAirline = getAirlineName(flightCard);
    var fromTime = getDepartureTime(flightCard);
    var toTime = getArrivalTime(flightCard);

    var _getDurationDetails = getDurationDetails(flightCard),
        duration = _getDurationDetails.duration,
        hasStops = _getDurationDetails.hasStops;

    var layovers = getLayovers(flightCard);

    if (!hasStops) {
      layovers = [];
    }

    return {
      marketingAirline: marketingAirline,
      operatingAirline: null,
      layovers: layovers,
      duration: duration,
      fromTime: fromTime,
      toTime: toTime
    };
  });

  return function getFlightDetails(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getDurationDetails = function getDurationDetails(flightCard) {
  var _durationContainer$te, _durationContainer$te2;

  var durationContainer = flightCard.querySelector(DURATION_SELECTOR);

  if (!durationContainer) {
    throw new MissingElementLookupError("Unable to lookup flight duration time");
  }

  var duration = (_durationContainer$te = durationContainer.textContent) === null || _durationContainer$te === void 0 ? void 0 : _durationContainer$te.split("|")[0].trim();
  var hasStops = HAS_STOP_REGEX.test(((_durationContainer$te2 = durationContainer.textContent) === null || _durationContainer$te2 === void 0 ? void 0 : _durationContainer$te2.split("|")[1].trim()) || "");

  if (!duration) {
    throw new MissingFieldParserError("Unable to determine duration time for flight");
  }

  return {
    duration: duration,
    hasStops: hasStops
  };
};

var getAirlineName = function getAirlineName(flightCard) {
  // TODO: Nope, no 'multiple airlines'.
  var airlineNames = new Set();
  var flightNames = getAirlines(flightCard);

  var _iterator = getFlightDetails_createForOfIteratorHelper(flightNames),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var flightName = _step.value;
      var airlineName = getParsedAirlineName(flightName);
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

  var timeElement = flightCard.querySelector(getFlightDetails_TRIP_TIME_SELECTOR);

  if (!timeElement) {
    throw new MissingElementLookupError("Unable to determine departure time");
  }

  var time = timeElement.textContent;

  if (!time) {
    throw new MissingFieldParserError("Unable to extract departure time");
  }

  var dayDifference = parseInt(((_timeElement$dataset = timeElement.dataset) === null || _timeElement$dataset === void 0 ? void 0 : _timeElement$dataset.diffDays) || "0");

  if (dayDifference) {
    time += "+".concat(dayDifference);
  }

  return standardizeTimeString(time);
};

var getArrivalTime = function getArrivalTime(flightCard) {
  var _timeElement$dataset2;

  var timeElements = flightCard.querySelectorAll(getFlightDetails_TRIP_TIME_SELECTOR);

  if (!timeElements) {
    throw new MissingElementLookupError("Unable to find time elements");
  }

  var timeElement = Array.from(timeElements).slice(-1)[0];

  if (!timeElement) {
    throw new MissingElementLookupError("Unable to find arrival time");
  }

  var time = timeElement.textContent;

  if (!time) {
    throw new MissingFieldParserError("Unable to extract arrival time");
  }

  var dayDifference = parseInt(((_timeElement$dataset2 = timeElement.dataset) === null || _timeElement$dataset2 === void 0 ? void 0 : _timeElement$dataset2.diffDays) || "0");

  if (dayDifference) {
    time += "+".concat(dayDifference);
  }

  return standardizeTimeString(time);
};
;// CONCATENATED MODULE: ./src/skiplagged/parser/sendFlights.ts
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || sendFlights_unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function sendFlights_createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = sendFlights_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function sendFlights_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return sendFlights_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return sendFlights_arrayLikeToArray(o, minLen); }

function sendFlights_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function sendFlights_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function sendFlights_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { sendFlights_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { sendFlights_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var FARE_PARENT_CONTAINER_SELECTOR = "div.trip-cost";
var sendFlights = /*#__PURE__*/function () {
  var _ref = sendFlights_asyncToGenerator(function* (flightCards, visitedFlightCardIds) {
    var selectedFlight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var flights = [];
    var newlyVisitedIds = {};

    var _iterator = sendFlights_createForOfIteratorHelper(flightCards),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var node = _step.value;
        var flightCard = node;

        if (shouldSkipCard(flightCard, visitedFlightCardIds)) {
          continue;
        }

        var flightDetails = yield getFlightDetails(flightCard);

        var _ref2 = selectedFlight ? [selectedFlight, flightDetails] : [flightDetails, null],
            _ref3 = _slicedToArray(_ref2, 2),
            departureFlight = _ref3[0],
            returnFlight = _ref3[1];

        var fare = getFare(flightCard);
        var flightPenguinId = getFlightDatasetId(flightDetails);
        flightCard.dataset.fpid = flightPenguinId;
        flightCard.dataset.visited = "true";
        flights.push({
          departureFlight: departureFlight,
          returnFlight: returnFlight,
          fare: fare
        });
        newlyVisitedIds[flightPenguinId] = flightCard.id.split("|")[0].trim(); // todo: use trip name from ua1234

        if (selectedFlight) {
          sendReturnFlightsEvent("skiplagged", flights);
        } else {
          sendFlightsEvent("skiplagged", flights);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return newlyVisitedIds;
  });

  return function sendFlights(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var shouldSkipCard = function shouldSkipCard(flightCard, visitedCardIds) {
  var denyListTerms = ["bargain fare", "special fare", "after booking"];
  return denyListTerms.some(function (term) {
    var _flightCard$textConte;

    return (_flightCard$textConte = flightCard.textContent) === null || _flightCard$textConte === void 0 ? void 0 : _flightCard$textConte.includes(term);
  }) || visitedCardIds.includes(flightCard.id);
};

var getFlightDatasetId = function getFlightDatasetId(flight) {
  return [flight.fromTime, flight.toTime, flight.marketingAirline].join("-");
};

var getFare = function getFare(flightCard) {
  var fareWrapper = flightCard.querySelector(FARE_PARENT_CONTAINER_SELECTOR);

  if (!fareWrapper) {
    throw new MissingElementLookupError("Unable to find fare wrapper");
  }

  var fareContainer = fareWrapper.querySelector("p");

  if (!fareContainer) {
    throw new MissingElementLookupError("Unable to find fare container");
  }

  return fareContainer.textContent;
};
;// CONCATENATED MODULE: ./src/skiplagged/parser/getFlights.ts
function getFlights_createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = getFlights_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function getFlights_slicedToArray(arr, i) { return getFlights_arrayWithHoles(arr) || getFlights_iterableToArrayLimit(arr, i) || getFlights_unsupportedIterableToArray(arr, i) || getFlights_nonIterableRest(); }

function getFlights_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function getFlights_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return getFlights_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return getFlights_arrayLikeToArray(o, minLen); }

function getFlights_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getFlights_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function getFlights_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getFlights_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function getFlights_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { getFlights_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { getFlights_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }









var getFlights_CONTAINER_SHELL_SELECTOR = "section #trip-list-wrapper";
var getFlights_SORT_BUTTON_SELECTOR = "[data-sort='cost']";
var NO_RESULTS_SELECTOR = ".trip-list-empty";
var FLIGHT_CARD_SELECTOR = "div[class='trip']";
var PROGRESS_SELECTOR = ".ui-mprogress";
var FLIGHT_CARDS_CONTAINER_SELECTOR = ".trip-list";
var INFINITE_SCROLL_CONTAINER_SELECTOR = ".infinite-trip-list";
var RETURN_HEADER_SELECTOR = ".trip-return-header";
var getFlights = /*#__PURE__*/function () {
  var _ref = getFlights_asyncToGenerator(function* () {
    var selectedFlight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    /*
    skiplagged maintains an infinite scroll trip list.
    It does not contain all elements at run, despite them being pulled from a GQL endpoint.
    In fact, many updates occur as the best price is retrieved from different providers.
    It does delete the top as you scroll down, so care is needed to not duplicate.
     */
    yield waitForAppearance(3000, getFlights_CONTAINER_SHELL_SELECTOR);
    yield waitForAppearance(3000, FLIGHT_CARDS_CONTAINER_SELECTOR);
    yield waitForAppearance(10000, getFlights_SORT_BUTTON_SELECTOR);

    if (selectedFlight) {
      yield waitForAppearance(3000, RETURN_HEADER_SELECTOR);
    }

    yield waitForAppearance(15000, FLIGHT_CARD_SELECTOR);
    disableHiddenCitySearches();

    if (isNoResults()) {
      sendNoFlightsEvent("skiplagged");
    }

    var flightContainer = getFlightContainer(selectedFlight ? "RETURN" : "DEPARTURE");
    var visitedFlights = {};
    var visitedFlightsVersion = 0;
    var mutationObserver = new MutationObserver( /*#__PURE__*/function () {
      var _mutationDriver = getFlights_asyncToGenerator(function* (mutations) {
        var _yield$mutationCallba = yield mutationCallback(mutations, visitedFlights, visitedFlightsVersion, selectedFlight),
            newMapEntries = _yield$mutationCallba.flightMap,
            runtimeVersion = _yield$mutationCallba.version;

        if (runtimeVersion === visitedFlightsVersion) {
          visitedFlightsVersion += 1;

          for (var _i = 0, _Object$entries = Object.entries(newMapEntries); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = getFlights_slicedToArray(_Object$entries[_i], 2),
                fpId = _Object$entries$_i[0],
                skipId = _Object$entries$_i[1];

            visitedFlights[fpId] = skipId;
          }
        } else {
          yield pause(100, 10, 50);
          mutationDriver(mutations);
        }
      });

      function mutationDriver(_x) {
        return _mutationDriver.apply(this, arguments);
      }

      return mutationDriver;
    }());
    mutationObserver.observe(flightContainer, {
      childList: true
    });
    yield waitForDisappearance(45000, PROGRESS_SELECTOR);
    var startTime = new Date().getTime();

    while (getTimeSinceStart(startTime) < 60000) {
      yield progressiveScrollingOnce(flightContainer);
      yield pause(200, 100, 200);
    }

    mutationObserver.disconnect();
    return visitedFlights;
  });

  return function getFlights() {
    return _ref.apply(this, arguments);
  };
}();

var isNoResults = function isNoResults() {
  var noResultsDiv = document.querySelector(NO_RESULTS_SELECTOR);

  if (!noResultsDiv) {
    throw new MissingElementLookupError("Unable to find the no results container");
  }

  return isVisible(noResultsDiv);
};

var getFlightContainer = function getFlightContainer(type) {
  var _document$querySelect = document.querySelectorAll(FLIGHT_CARDS_CONTAINER_SELECTOR),
      _document$querySelect2 = getFlights_slicedToArray(_document$querySelect, 2),
      departureContainer = _document$querySelect2[0],
      returnContainer = _document$querySelect2[1];

  var container = type === "DEPARTURE" ? departureContainer : returnContainer;

  if (!container) {
    throw new MissingElementLookupError("Unable to locate ".concat(type.toLowerCase(), " container"));
  }

  var tripListElement = document.querySelector(INFINITE_SCROLL_CONTAINER_SELECTOR);

  if (!tripListElement) {
    throw new MissingElementLookupError("Unable to locate infinite scroll container for ".concat(type.toLowerCase()));
  }

  var tripListContainer = tripListElement.children[0];

  if (!tripListContainer) {
    throw new MissingElementLookupError("Unable to locate infinite scroll container child for ".concat(type.toLowerCase()));
  }

  return tripListContainer;
};

var progressiveScrollingOnce = /*#__PURE__*/function () {
  var _ref2 = getFlights_asyncToGenerator(function* (flightContainer) {
    window.scrollTo(0, 0);
    pause(300, 100, 200);
    var lastFlightCard = null;
    var batchLastFlightCard = null;

    while (lastFlightCard === null || lastFlightCard !== batchLastFlightCard) {
      lastFlightCard = batchLastFlightCard;
      var flightCards = flightContainer.querySelectorAll(FLIGHT_CARD_SELECTOR);
      batchLastFlightCard = Array.from(flightCards).slice(-1)[0];
      scrollToFlightCard(batchLastFlightCard);
    }
  });

  return function progressiveScrollingOnce(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var mutationCallback = /*#__PURE__*/function () {
  var _ref3 = getFlights_asyncToGenerator(function* (mutations, flightMap, flightMapVersion, selectedFlight) {
    var flightCards = [];

    var _iterator = getFlights_createForOfIteratorHelper(mutations),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var mutation = _step.value;

        if (mutation.addedNodes) {
          flightCards = flightCards.concat(Array.from(mutation.addedNodes));
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var sentFlightMaps = yield sendFlights(flightCards, Object.values(flightMap), selectedFlight);
    return {
      flightMap: sentFlightMaps,
      version: flightMapVersion
    };
  });

  return function mutationCallback(_x3, _x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var getTimeSinceStart = function getTimeSinceStart(startTime) {
  var currentTime = new Date().getTime();
  return currentTime - startTime;
};
;// CONCATENATED MODULE: ./src/shared/ui/manageSelectionHighlights.ts
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
;// CONCATENATED MODULE: ./src/skiplagged/ui/findFlightCard.ts
function findFlightCard_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function findFlightCard_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { findFlightCard_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { findFlightCard_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var findFlightCard_FLIGHT_CARD_SELECTOR = "div[class='trip']";
var findFlightCard = /*#__PURE__*/function () {
  var _ref = findFlightCard_asyncToGenerator(function* (flightId) {
    window.scrollTo(0, 0);
    yield waitForAppearance(5000, "".concat(findFlightCard_FLIGHT_CARD_SELECTOR, ":not([data-visited='true'])"));
    var foundFlight = null;
    var endOfSearch = false;
    var flightSelector = "[id^='".concat(flightId, "|']");
    var searchFlightSelector = "".concat(findFlightCard_FLIGHT_CARD_SELECTOR, ":not([data-searched-").concat(flightId, "='true'])");

    while (!foundFlight && !endOfSearch) {
      foundFlight = document.querySelector(flightSelector);

      if (!foundFlight) {
        var flightCards = Array.from(document.querySelectorAll(searchFlightSelector));
        flightCards.forEach(function (flightCard) {
          flightCard.dataset["searched_".concat(flightId)] = "true";
        });
        endOfSearch = yield scrollToBottomCard(flightCards.slice(-1)[0], searchFlightSelector);
      }
    }

    if (!foundFlight) {
      throw new MissingElementLookupError("Unable to find a flight card with id ".concat(flightId));
    }

    return foundFlight;
  });

  return function findFlightCard(_x) {
    return _ref.apply(this, arguments);
  };
}();

var scrollToBottomCard = /*#__PURE__*/function () {
  var _ref2 = findFlightCard_asyncToGenerator(function* (flightCard, unsearchedSelector) {
    var hasMoreFlights = true;
    scrollToFlightCard(flightCard);

    try {
      yield waitForAppearance(5000, unsearchedSelector);
    } catch (_unused) {
      hasMoreFlights = false;
    }

    return hasMoreFlights;
  });

  return function scrollToBottomCard(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
;// CONCATENATED MODULE: ./src/skiplagged/ui/highlightFlightCard.ts
function highlightFlightCard_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function highlightFlightCard_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { highlightFlightCard_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { highlightFlightCard_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var highlightFlightCard = /*#__PURE__*/function () {
  var _ref = highlightFlightCard_asyncToGenerator(function* (selectedReturnId) {
    clearExistingSelections();
    var flightCard = yield findFlightCard(selectedReturnId);
    highlightSelectedElement(flightCard);
    scrollToFlightCard(flightCard);
  });

  return function highlightFlightCard(_x) {
    return _ref.apply(this, arguments);
  };
}();

var clearExistingSelections = function clearExistingSelections() {
  var previousDepSelection = document.querySelector("[data-selected='true']");

  if (previousDepSelection) {
    clearHighlightFromElement(previousDepSelection);
  }
};
;// CONCATENATED MODULE: ./src/skiplagged/ui/selectFlightCard.ts
function selectFlightCard_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function selectFlightCard_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { selectFlightCard_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { selectFlightCard_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


var selectFlightCard = /*#__PURE__*/function () {
  var _ref = selectFlightCard_asyncToGenerator(function* (skiplaggedId) {
    var flightCard = yield findFlightCard(skiplaggedId);
    flightCard.click();
  });

  return function selectFlightCard(_x) {
    return _ref.apply(this, arguments);
  };
}();
;// CONCATENATED MODULE: ./src/skiplagged/contentScript.ts
function contentScript_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function contentScript_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { contentScript_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { contentScript_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


window.Sentry.init({
  dsn: "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451"
});





var flightMaps = {
  departureFlightMap: {},
  returnFlightMap: {}
}; // todo: track and protect by disconnecting observer!

chrome.runtime.onMessage.addListener( /*#__PURE__*/function () {
  var _ref = contentScript_asyncToGenerator(function* (message) {
    switch (message.event) {
      case "BEGIN_PARSING":
        yield scrapeDepartureFlights();
        break;

      case "GET_RETURN_FLIGHTS":
        yield scrapeReturnFlights(message.departure);
        break;

      case "HIGHLIGHT_FLIGHT":
        yield highlightFlight(message.selectedReturnId);
        break;

      case "CLEAR_SELECTION":
        debugger;
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

var scrapeDepartureFlights = /*#__PURE__*/function () {
  var _ref2 = contentScript_asyncToGenerator(function* () {
    try {
      flightMaps.departureFlightMap = yield getFlights(null);
    } catch (error) {
      window.Sentry.captureException(error);
      sendFailedScraper("skiplagged", error);
    }
  });

  return function scrapeDepartureFlights() {
    return _ref2.apply(this, arguments);
  };
}();

var scrapeReturnFlights = /*#__PURE__*/function () {
  var _ref3 = contentScript_asyncToGenerator(function* (departure) {
    try {
      var departureId = getDepartureId(departure.id);
      yield selectFlightCard(departureId);
      flightMaps.returnFlightMap = yield getFlights(departure);
    } catch (error) {
      window.Sentry.captureException(error);
      sendFailedScraper("skiplagged", error);
    }
  });

  return function scrapeReturnFlights(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var highlightFlight = /*#__PURE__*/function () {
  var _ref4 = contentScript_asyncToGenerator(function* (flightPenguinReturnId) {
    try {
      var returnId = getReturnId(flightPenguinReturnId);
      yield highlightFlightCard(returnId);
      addBackToSearchButton();
    } catch (error) {
      window.Sentry.captureException(error);
      sendFailedScraper("skiplagged", error);
    }
  });

  return function highlightFlight(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

var getDepartureId = function getDepartureId(flightPenguinDepartureId) {
  var skiplaggedId = flightMaps.departureFlightMap[flightPenguinDepartureId];

  if (!skiplaggedId) {
    throw new ParserError("Unable to find mapped flight for ".concat(flightPenguinDepartureId));
  }

  return skiplaggedId;
};

var getReturnId = function getReturnId(flightPenguinReturnId) {
  var skiplaggedId = flightMaps.returnFlightMap[flightPenguinReturnId];

  if (!skiplaggedId) {
    throw new ParserError("Unable to find mapped flight for ".concat(flightPenguinReturnId));
  }

  return skiplaggedId;
};
/******/ })()
;