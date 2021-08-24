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
;// CONCATENATED MODULE: ./src/shared/events/sendFlights.ts
function sendFlightsEvent(providerName, flights) {
  chrome.runtime.sendMessage({
    event: "FLIGHT_RESULTS_RECEIVED",
    flights: flights,
    provider: providerName
  });
}
;// CONCATENATED MODULE: ./src/shared/events/sendFailedScraper.ts
function sendFailedScraper(providerName, error) {
  chrome.runtime.sendMessage({
    event: "FAILED_SCRAPER",
    source: providerName,
    description: "".concat(error.name, " ").concat(error.message)
  });
}
;// CONCATENATED MODULE: ./src/shared/events/sendReturnFlights.ts
function sendReturnFlightsEvent(providerName, flights) {
  chrome.runtime.sendMessage({
    event: "RETURN_FLIGHTS_RECEIVED",
    flights: flights,
    provider: providerName
  });
}
;// CONCATENATED MODULE: ./node_modules/wait-for-the-element/wait-for-the-element.js
function t(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,u){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==r)return;var e,n,o=[],F=!0,i=!1;try{for(r=r.call(t);!(F=(e=r.next()).done)&&(o.push(e.value),!u||o.length!==u);F=!0);}catch(t){i=!0,n=t}finally{try{F||null==r.return||r.return()}finally{if(i)throw n}}return o}(t,r)||u(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(t,u){if(t){if("string"==typeof t)return r(t,u);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?r(t,u):void 0}}function r(t,u){(null==u||u>t.length)&&(u=t.length);for(var r=0,e=new Array(u);r<u;r++)e[r]=t[r];return e}var e=/\.(?:(?:[\x2D0-9A-Z_a-z\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])|\\(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))+/,n=/#(?:(?:[\x2D0-9A-Z_a-z\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])|\\(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))+/,o=/\[[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*((?:(?:\*|[\x2D0-9A-Z_a-z]*)\|)?(?:(?:[\x2D0-9A-Z_a-z\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+))/g,F={};function i(r){var i=F[r];if(i)return i;i=F[r]={attributes:!0,subtree:!0,childList:!0};var a,l=[],c=function(t,r){var e="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!e){if(Array.isArray(t)||(e=u(t))||r&&t&&"number"==typeof t.length){e&&(t=e);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var F,i=!0,a=!1;return{s:function(){e=e.call(t)},n:function(){var t=e.next();return i=t.done,t},e:function(t){a=!0,F=t},f:function(){try{i||null==e.return||e.return()}finally{if(a)throw F}}}}(r.matchAll(o));try{for(c.s();!(a=c.n()).done;){var D=t(a.value,2)[1];if(D.startsWith("*")||D.startsWith("|"))return i;l.push(D.replace("|",":"))}}catch(t){c.e(t)}finally{c.f()}return e.test(r)&&l.push("class"),n.test(r)&&l.push("id"),0===l.length?i.attributes=!1:i.attributeFilter=l,i}function a(t){var u=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=u.timeout,e=void 0===r?2500:r,n=u.scope,o=void 0===n?document:n;return new Promise((function(u){var r=o.querySelector(t);if(null===r){var n=null,F=new MutationObserver((function(){var r=o.querySelector(t);null!==r&&(clearTimeout(n),F.disconnect(),u(r))}));F.observe(o,i(t)),n=setTimeout((function(){F.disconnect(),u(null)}),e)}else u(r)}))}function l(t){var u=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=u.timeout,e=void 0===r?2500:r,n=u.scope,o=void 0===n?document:n;return new Promise((function(u){var r=null;if(null!==o.querySelector(t)){var n=new MutationObserver((function(){null===o.querySelector(t)&&(clearTimeout(r),n.disconnect(),u(!0))}));n.observe(o,i(t)),r=setTimeout((function(){n.disconnect(),u(!1)}),e)}else u(!0)}))}

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
;// CONCATENATED MODULE: ./src/expedia/ui/closeFlightDetailsModal.ts

var MODAL_CLOSE_SELECTOR = "button[data-icon='tool-close']";
var closeFlightDetailsModal = function closeFlightDetailsModal() {
  var modalCloseElement = document.querySelector(MODAL_CLOSE_SELECTOR);

  if (!modalCloseElement) {
    throw new MissingElementLookupError("Unable to find modal close element via ".concat(MODAL_CLOSE_SELECTOR));
  }

  modalCloseElement.click();
};
;// CONCATENATED MODULE: ./src/shared/helpers.js
var standardizeTimeString = function standardizeTimeString(time) {
  return time.toLowerCase().replace(" ", "").trim();
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
;// CONCATENATED MODULE: ./src/expedia/ui/openFlightDetailsModal.ts

var MODAL_SELECTOR = "[data-test-id='select-link']";
var openFlightDetailsModal = function openFlightDetailsModal(flightContainer) {
  var modalOpenElement = flightContainer.querySelector(MODAL_SELECTOR);

  if (!modalOpenElement) {
    throw new MissingElementLookupError("Unable to find modal open element via ".concat(MODAL_SELECTOR));
  }

  modalOpenElement.click();
};
;// CONCATENATED MODULE: ./src/expedia/ui/openLayoverDetailsCollapsible.ts
function openLayoverDetailsCollapsible_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function openLayoverDetailsCollapsible_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { openLayoverDetailsCollapsible_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { openLayoverDetailsCollapsible_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var COLLAPSIBLE_SELECTOR = "summary";
var openLayoverDetailsCollapsible = /*#__PURE__*/function () {
  var _ref = openLayoverDetailsCollapsible_asyncToGenerator(function* (modalContainer) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;
    var collapsibleController = yield a(COLLAPSIBLE_SELECTOR, {
      timeout: timeout
    });

    if (!collapsibleController) {
      throw new MissingElementLookupError("Unable to find collapsible open element via ".concat(COLLAPSIBLE_SELECTOR));
    }

    collapsibleController.click();
  });

  return function openLayoverDetailsCollapsible(_x) {
    return _ref.apply(this, arguments);
  };
}();
;// CONCATENATED MODULE: ./src/expedia/parser/getFlightDetailsModal.ts
function getFlightDetailsModal_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function getFlightDetailsModal_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { getFlightDetailsModal_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { getFlightDetailsModal_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var getFlightDetailsModal_MODAL_SELECTOR = "[data-test-id='details-and-fares']:not(:empty)";
var getFlightDetailsModal = /*#__PURE__*/function () {
  var _ref = getFlightDetailsModal_asyncToGenerator(function* () {
    var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 60000;
    var modal = yield a(getFlightDetailsModal_MODAL_SELECTOR, {
      timeout: timeout
    });

    if (!modal) {
      throw new MissingElementLookupError("Unable to locate modal after ".concat(timeout, " ms"));
    }

    return modal;
  });

  return function getFlightDetailsModal() {
    return _ref.apply(this, arguments);
  };
}();
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


;// CONCATENATED MODULE: ./src/expedia/parser/getLegDetails.ts
function getLegDetails_slicedToArray(arr, i) { return getLegDetails_arrayWithHoles(arr) || getLegDetails_iterableToArrayLimit(arr, i) || getLegDetails_unsupportedIterableToArray(arr, i) || getLegDetails_nonIterableRest(); }

function getLegDetails_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function getLegDetails_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return getLegDetails_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return getLegDetails_arrayLikeToArray(o, minLen); }

function getLegDetails_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getLegDetails_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function getLegDetails_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var getLegDetails = function getLegDetails(leg, legIndex, previousLegDetails) {
  var _leg$children = getLegDetails_slicedToArray(leg.children, 3),
      departure = _leg$children[0],
      details = _leg$children[1],
      arrival = _leg$children[2];

  var departureTime = getDepartureTime(departure);
  var arrivalTime = getArrivalTime(arrival);

  if (legIndex > 0 && isOvernight(previousLegDetails === null || previousLegDetails === void 0 ? void 0 : previousLegDetails.toTime, departureTime)) {
    departureTime += "+1"; // layover went to the next day
  } else if (isOvernight(departureTime, arrivalTime)) {
    arrivalTime += "+1"; // overnight flight
  }

  return {
    fromTime: departureTime,
    toTime: arrivalTime,
    from: getDepartureAirport(departure),
    to: getArrivalAirport(arrival),
    operatingAirline: getOperatingAirline(details === null || details === void 0 ? void 0 : details.children[1]),
    duration: getDuration(details === null || details === void 0 ? void 0 : details.children[0])
  };
};

var getArrivalTime = function getArrivalTime(arrival) {
  var _arrival$textContent;

  var time = (_arrival$textContent = arrival.textContent) === null || _arrival$textContent === void 0 ? void 0 : _arrival$textContent.split(" - ")[0].toLowerCase().replace("arrival", "");

  if (!time) {
    throw new MissingFieldParserError("Unable to determine arrival time for layover");
  }

  return standardizeTimeString(time);
};

var getDepartureTime = function getDepartureTime(departure) {
  var _departure$textConten;

  var time = (_departure$textConten = departure.textContent) === null || _departure$textConten === void 0 ? void 0 : _departure$textConten.split(" - ")[0].toLowerCase().replace("departure", "");

  if (!time) {
    throw new MissingFieldParserError("Unable to determine departure time for layover");
  }

  return standardizeTimeString(time);
};

var getArrivalAirport = function getArrivalAirport(arrival) {
  var _arrival$textContent2, _arrival$textContent3, _arrival$textContent4, _airportCode;

  var airportCode = (_arrival$textContent2 = arrival.textContent) === null || _arrival$textContent2 === void 0 ? void 0 : _arrival$textContent2.slice(((_arrival$textContent3 = arrival.textContent) === null || _arrival$textContent3 === void 0 ? void 0 : _arrival$textContent3.indexOf("(")) + 1, (_arrival$textContent4 = arrival.textContent) === null || _arrival$textContent4 === void 0 ? void 0 : _arrival$textContent4.indexOf(")"));

  if (((_airportCode = airportCode) === null || _airportCode === void 0 ? void 0 : _airportCode.length) !== 3) {
    var _arrival$textContent5;

    airportCode = (_arrival$textContent5 = arrival.textContent) === null || _arrival$textContent5 === void 0 ? void 0 : _arrival$textContent5.split("-")[1]; // no airport, just listing the city
  }

  if (!airportCode) {
    throw new MissingFieldParserError("Unable to determine departure airport for layover");
  }

  return airportCode;
};

var getDepartureAirport = function getDepartureAirport(departure) {
  var _departure$textConten2, _departure$textConten3, _departure$textConten4, _airportCode2;

  var airportCode = (_departure$textConten2 = departure.textContent) === null || _departure$textConten2 === void 0 ? void 0 : _departure$textConten2.slice(((_departure$textConten3 = departure.textContent) === null || _departure$textConten3 === void 0 ? void 0 : _departure$textConten3.indexOf("(")) + 1, (_departure$textConten4 = departure.textContent) === null || _departure$textConten4 === void 0 ? void 0 : _departure$textConten4.indexOf(")"));

  if (((_airportCode2 = airportCode) === null || _airportCode2 === void 0 ? void 0 : _airportCode2.length) !== 3) {
    var _departure$textConten5;

    airportCode = (_departure$textConten5 = departure.textContent) === null || _departure$textConten5 === void 0 ? void 0 : _departure$textConten5.split("-")[1]; // no airport, just listing the city
  }

  if (!airportCode) {
    throw new MissingFieldParserError("Unable to determine departure airport for layover");
  }

  return airportCode;
};

var getDuration = function getDuration(element) {
  var _element$textContent;

  var duration = element === null || element === void 0 ? void 0 : (_element$textContent = element.textContent) === null || _element$textContent === void 0 ? void 0 : _element$textContent.replace("flight", "");

  if (!duration) {
    throw new MissingFieldParserError("Unable to determine duration time for layover");
  }

  return duration;
};

var getOperatingAirline = function getOperatingAirline(element) {
  var _element$textContent2, _element$textContent3;

  // for operating might have to find index of first digit, then consider string before it if extra string after flight num
  var airline = element === null || element === void 0 ? void 0 : (_element$textContent2 = element.textContent) === null || _element$textContent2 === void 0 ? void 0 : (_element$textContent3 = _element$textContent2.match(/[A-z]*/g)) === null || _element$textContent3 === void 0 ? void 0 : _element$textContent3.join(" ").trim();

  if (!airline) {
    throw new MissingFieldParserError("Unable to determine operating airline for layover");
  }

  return airline;
};
;// CONCATENATED MODULE: ./src/expedia/parser/getLayovers.ts
function getLayovers_slicedToArray(arr, i) { return getLayovers_arrayWithHoles(arr) || getLayovers_iterableToArrayLimit(arr, i) || getLayovers_unsupportedIterableToArray(arr, i) || getLayovers_nonIterableRest(); }

function getLayovers_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function getLayovers_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function getLayovers_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = getLayovers_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function getLayovers_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return getLayovers_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return getLayovers_arrayLikeToArray(o, minLen); }

function getLayovers_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getLayovers_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function getLayovers_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { getLayovers_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { getLayovers_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var LEG_SELECTOR = "[data-test-id^='journey-section']";
var getLayovers = /*#__PURE__*/function () {
  var _ref = getLayovers_asyncToGenerator(function* (modal) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
    var firstLeg = yield a(LEG_SELECTOR, {
      timeout: timeout
    });

    if (!firstLeg) {
      throw new MissingElementLookupError("Could not find ".concat(LEG_SELECTOR, " in modal after ").concat(timeout, " ms"));
    }

    var legs = modal.querySelectorAll(LEG_SELECTOR);

    if (!legs) {
      throw new MissingElementLookupError("Could not find legs in modal");
    }

    var layovers = [];

    var _iterator = _createForOfIteratorHelper(legs.entries()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = getLayovers_slicedToArray(_step.value, 2),
            index = _step$value[0],
            leg = _step$value[1];

        var details = getLegDetails(leg, index, layovers[layovers.length - 1]);
        layovers.push(details);
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
  });

  return function getLayovers(_x) {
    return _ref.apply(this, arguments);
  };
}();
;// CONCATENATED MODULE: ./src/expedia/parser/getFlight.ts
function getFlight_slicedToArray(arr, i) { return getFlight_arrayWithHoles(arr) || getFlight_iterableToArrayLimit(arr, i) || getFlight_unsupportedIterableToArray(arr, i) || getFlight_nonIterableRest(); }

function getFlight_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function getFlight_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return getFlight_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return getFlight_arrayLikeToArray(o, minLen); }

function getFlight_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getFlight_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function getFlight_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getFlight_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function getFlight_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { getFlight_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { getFlight_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }








var AIRLINE_SELECTOR = "[data-test-id='flight-operated']";
var ARRIVAL_TIME_SELECTOR = "[data-test-id='arrival-time']";
var DURATION_SELECTOR = "[data-test-id='journey-duration']";
var getFlight = /*#__PURE__*/function () {
  var _ref = getFlight_asyncToGenerator(function* (element) {
    var _getAirlines = getAirlines(element),
        marketingAirline = _getAirlines.marketingAirline,
        operatingAirline = _getAirlines.operatingAirline;

    var _getFlightTimes = getFlightTimes(element),
        departureTime = _getFlightTimes.departureTime,
        arrivalTime = _getFlightTimes.arrivalTime;

    var _getDurationDetails = getDurationDetails(element),
        duration = _getDurationDetails.duration,
        hasStops = _getDurationDetails.hasStops;

    openFlightDetailsModal(element);
    var modal = yield getFlightDetailsModal();
    yield openLayoverDetailsCollapsible(modal);
    var layovers = hasStops ? yield getLayovers(modal) : [];
    return {
      marketingAirline: marketingAirline,
      operatingAirline: operatingAirline,
      fromTime: departureTime,
      toTime: arrivalTime,
      duration: duration,
      layovers: layovers
    };
  });

  return function getFlight(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getAirlines = function getAirlines(element) {
  var _operatingAirlineCont;

  var airlineContainer = element.querySelector(AIRLINE_SELECTOR);

  if (!airlineContainer) {
    throw new MissingElementLookupError("Unable to lookup marketing airline");
  }

  var marketingAirlineContainer;
  var operatingAirlineContainer;

  if (airlineContainer.childNodes.length > 1) {
    // "Delta"
    // "• Delta 4164 operated by Skywest DBA Delta Connection"
    marketingAirlineContainer = airlineContainer.childNodes[0];
    operatingAirlineContainer = airlineContainer.childNodes[1];
  } else {
    marketingAirlineContainer = airlineContainer;
    operatingAirlineContainer = null;
  }

  var marketingAirlineName = airlineMap.getAirlineName(marketingAirlineContainer.textContent);
  var operatingAirlineName = operatingAirlineContainer ? (_operatingAirlineCont = operatingAirlineContainer.textContent) === null || _operatingAirlineCont === void 0 ? void 0 : _operatingAirlineCont.split(/\s+operated\s+by\s+/)[1] : null;
  return {
    marketingAirline: marketingAirlineName,
    operatingAirline: operatingAirlineName
  };
};

var getFlightTimes = function getFlightTimes(flightContainer) {
  var _element$textContent;

  var element = flightContainer.querySelector(ARRIVAL_TIME_SELECTOR);

  if (!element) {
    throw new MissingElementLookupError("Unable to lookup flight arrival time");
  }

  var _ref2 = ((_element$textContent = element.textContent) === null || _element$textContent === void 0 ? void 0 : _element$textContent.split(" - ")) || [null, null],
      _ref3 = getFlight_slicedToArray(_ref2, 2),
      departureTime = _ref3[0],
      arrivalTime = _ref3[1];

  if (!departureTime) {
    throw new MissingFieldParserError("Unable to determine departure time for flight");
  }

  if (!arrivalTime) {
    throw new MissingFieldParserError("Unable to determine arrival time for flight");
  }

  return {
    arrivalTime: standardizeTimeString(arrivalTime),
    departureTime: standardizeTimeString(departureTime)
  };
};

var getDurationDetails = function getDurationDetails(flightContainer) {
  var _element$textContent2, _element$textContent3;

  var element = flightContainer.querySelector(DURATION_SELECTOR);

  if (!element) {
    throw new MissingElementLookupError("Unable to lookup flight duration time");
  }

  var duration = (_element$textContent2 = element.textContent) === null || _element$textContent2 === void 0 ? void 0 : _element$textContent2.split("(")[0].trim();
  var hasStops = !((_element$textContent3 = element.textContent) !== null && _element$textContent3 !== void 0 && _element$textContent3.includes("Nonstop") || false);

  if (!duration) {
    throw new MissingFieldParserError("Unable to determine duration time for flight");
  }

  return {
    duration: duration,
    hasStops: hasStops
  };
};
;// CONCATENATED MODULE: ./src/expedia/parser/getFlights.ts
function getFlights_createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = getFlights_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function getFlights_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return getFlights_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return getFlights_arrayLikeToArray(o, minLen); }

function getFlights_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getFlights_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function getFlights_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { getFlights_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { getFlights_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







var CONTAINER_SHELL_SELECTOR = "[data-test-id='search-results']";
var LOADING_BAR_SELECTOR = ".uitk-loading-bar-current";
var RETURN_FLIGHT_LINK_SELECTOR = ".uitk-progress-indicator-step-details-wrapper > a";
var INITIAL_LOADING_ANIMATION_SELECTOR = "[data-test-id='loading-animation']";
var SECOND_LOADING_ANIMATION_SELECTOR = "[data-test-id='loading-more-flights']";
var NO_RESULTS_SELECTOR = ".uitk-empty-state";
var SHOW_MORE_BUTTON_SELECTOR = "[name='showMoreButton']";
var FLIGHT_CARD_SELECTOR = "[data-test-id='offer-listing']";
var MODAL_FARE_SELECTOR = "[data-test-id='fare-types-carousel'] .uitk-lockup-price";
var LIST_CARD_FARE_SELECTOR = ".uitk-price-subtext";
var getFlights = /*#__PURE__*/function () {
  var _ref = getFlights_asyncToGenerator(function* () {
    var selectedFlight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var loadingTimeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30000;
    // beware - make sure you're on the right page before waiting for elements to go away...
    yield waitForAppearance(3000, CONTAINER_SHELL_SELECTOR);

    if (selectedFlight) {
      yield waitForAppearance(3000, RETURN_FLIGHT_LINK_SELECTOR);
    } // to all our horror, expedia has a very large number of loading components that fire sequentially...


    yield waitForDisappearance(loadingTimeout, LOADING_BAR_SELECTOR);
    yield waitForDisappearance(loadingTimeout, INITIAL_LOADING_ANIMATION_SELECTOR);
    yield waitForDisappearance(loadingTimeout, SECOND_LOADING_ANIMATION_SELECTOR);

    if (isNoResults()) {
      return [];
    }

    yield showMoreFlights();
    var flights = [];
    var flightCards = document.querySelectorAll(FLIGHT_CARD_SELECTOR);

    var _iterator = getFlights_createForOfIteratorHelper(flightCards),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var flightCard = _step.value;

        if (shouldSkipCard(flightCard)) {
          continue;
        }

        var flight = yield getFlight(flightCard);
        var departureFlight = null;
        var returnFlight = null;
        var fare = null;

        if (selectedFlight) {
          departureFlight = selectedFlight;
          returnFlight = flight;
          fare = yield getListFare(flightCard);
        } else {
          departureFlight = flight;
          fare = yield getModalFare();
        }

        flightCard.dataset.fpid = getFlightDatasetId(flight);
        flights.push({
          departureFlight: departureFlight,
          returnFlight: returnFlight,
          fare: fare
        });
        closeFlightDetailsModal();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return flights;
  });

  return function getFlights() {
    return _ref.apply(this, arguments);
  };
}();

var isNoResults = function isNoResults() {
  return !!document.querySelector(NO_RESULTS_SELECTOR);
};

var showMoreFlights = /*#__PURE__*/function () {
  var _ref2 = getFlights_asyncToGenerator(function* () {
    var loadingTimeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30000;
    var showMoreButton = document.querySelector(SHOW_MORE_BUTTON_SELECTOR);

    if (showMoreButton) {
      showMoreButton.click();
      var loadingIndicator = yield l(SHOW_MORE_BUTTON_SELECTOR, {
        timeout: loadingTimeout
      });

      if (!loadingIndicator) {
        throw new LoadingTimeoutParserError("Took longer than ${loadingTimeout} ms to load the show more flight results");
      }
    }
  });

  return function showMoreFlights() {
    return _ref2.apply(this, arguments);
  };
}();

var getModalFare = /*#__PURE__*/function () {
  var _ref3 = getFlights_asyncToGenerator(function* () {
    var modal = yield getFlightDetailsModal();
    var fare = modal.querySelector(MODAL_FARE_SELECTOR);

    if (!fare) {
      throw new MissingElementLookupError("Unable to find fare in modal");
    }

    return fare.textContent;
  });

  return function getModalFare() {
    return _ref3.apply(this, arguments);
  };
}();

var getListFare = /*#__PURE__*/function () {
  var _ref4 = getFlights_asyncToGenerator(function* (flightCard) {
    var fare = flightCard.querySelector(LIST_CARD_FARE_SELECTOR);

    if (!fare) {
      throw new MissingElementLookupError("Unable to find fare in card");
    }

    return fare.textContent;
  });

  return function getListFare(_x) {
    return _ref4.apply(this, arguments);
  };
}();

var shouldSkipCard = function shouldSkipCard(flightCard) {
  var denyListTerms = ["bargain fare", "special fare", "after booking"];
  return denyListTerms.some(function (term) {
    var _flightCard$textConte;

    return (_flightCard$textConte = flightCard.textContent) === null || _flightCard$textConte === void 0 ? void 0 : _flightCard$textConte.includes(term);
  });
};

var getFlightDatasetId = function getFlightDatasetId(flight) {
  return [flight.fromTime, flight.toTime, flight.marketingAirline].join("-");
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
;// CONCATENATED MODULE: ./src/shared/utilities/findMatchingDOMNode.ts
var findMatchingDOMNode = function findMatchingDOMNode(list, id) {
  return list.find(function (item) {
    return item.dataset.fpid === id;
  });
};
;// CONCATENATED MODULE: ./src/expedia/ui/highlightFlightCard.ts
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || highlightFlightCard_unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function highlightFlightCard_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return highlightFlightCard_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return highlightFlightCard_arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return highlightFlightCard_arrayLikeToArray(arr); }

function highlightFlightCard_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function highlightFlightCard_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function highlightFlightCard_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { highlightFlightCard_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { highlightFlightCard_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var highlightFlightCard_FLIGHT_CARD_SELECTOR = "[data-test-id='offer-listing']";
var highlightFlightCard = /*#__PURE__*/function () {
  var _ref = highlightFlightCard_asyncToGenerator(function* (selectedDepartureId, selectedReturnId) {
    clearExistingSelections();
    var flightCard = selectedReturnId ? getFlightCard(selectedReturnId) : getFlightCard(selectedDepartureId);
    highlightSelectedElement(flightCard);
    scrollToFlightCard(flightCard);
  });

  return function highlightFlightCard(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var clearExistingSelections = function clearExistingSelections() {
  var previousDepSelection = document.querySelector("[data-selected='true']");

  if (previousDepSelection) {
    clearHighlightFromElement(previousDepSelection);
  }
};

var getFlightCard = function getFlightCard(selectedReturnId) {
  var flightCards = document.querySelectorAll(highlightFlightCard_FLIGHT_CARD_SELECTOR);

  if (!flightCards) {
    throw new ParserError("Unable to find flights in highlighting");
  }

  var flightCard = findMatchingDOMNode(_toConsumableArray(flightCards), selectedReturnId);

  if (!flightCard) {
    throw new MissingElementLookupError("Unable to find flight to highlight");
  }

  return flightCard;
};

var scrollToFlightCard = function scrollToFlightCard(flightCard) {
  var yPosition = window.pageYOffset + flightCard.getBoundingClientRect().top - window.innerHeight / 2;
  window.scrollTo({
    top: yPosition,
    behavior: "smooth"
  });
};
;// CONCATENATED MODULE: ./src/expedia/ui/selectReturnFlight.ts
function selectReturnFlight_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function selectReturnFlight_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { selectReturnFlight_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { selectReturnFlight_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var FLIGHT_SELECTION_BUTTON_SELECTOR = "[data-test-id='select-button']";
var selectReturnFlight = /*#__PURE__*/function () {
  var _ref = selectReturnFlight_asyncToGenerator(function* (departure) {
    var departureCard = document.querySelector("[data-fpid='".concat(departure.id, "']"));

    if (!departureCard) {
      // may have re-rendered because we are changing departure selection after viewing returns
      // re-render wipes dataset.id
      yield getFlights();
      departureCard = document.querySelector("[data-fpid='".concat(departure.id, "']"));

      if (!departureCard) {
        throw new MissingElementLookupError("Unable to lookup departure flight");
      }
    }

    openFlightDetailsModal(departureCard);
    var modal = yield getFlightDetailsModal();
    clickSelectionConfirmation(modal);
  });

  return function selectReturnFlight(_x) {
    return _ref.apply(this, arguments);
  };
}();

var clickSelectionConfirmation = function clickSelectionConfirmation(modal) {
  var selectButton = modal.querySelector(FLIGHT_SELECTION_BUTTON_SELECTOR);

  if (!selectButton) {
    throw new MissingElementLookupError("Unable to find select button");
  }

  selectButton.click();
};
;// CONCATENATED MODULE: ./src/expedia/contentScript.js
function contentScript_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function contentScript_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { contentScript_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { contentScript_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


window.Sentry.init({
  dsn: "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451"
});




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
        yield highlightFlightCard(message.selectedDepartureId, message.selectedReturnId);
        addBackToSearchButton();
        break;

      case "CLEAR_SELECTION":
        history.back();
        chrome.runtime.sendMessage({
          event: "PROVIDER_READY",
          provider: "expedia"
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
      var flights = yield getFlights(null);
      sendFlightsEvent("expedia", flights);
    } catch (error) {
      window.Sentry.captureException(error);
      sendFailedScraper("expedia", error);
    }
  });

  return function scrapeDepartureFlights() {
    return _ref2.apply(this, arguments);
  };
}();

var scrapeReturnFlights = /*#__PURE__*/function () {
  var _ref3 = contentScript_asyncToGenerator(function* (departure) {
    yield selectReturnFlight(departure);

    try {
      var flights = yield getFlights(departure);
      sendReturnFlightsEvent("expedia", flights);
    } catch (error) {
      window.Sentry.captureException(error);
      sendFailedScraper("expedia", error);
    }
  });

  return function scrapeReturnFlights(_x2) {
    return _ref3.apply(this, arguments);
  };
}();
/******/ })()
;