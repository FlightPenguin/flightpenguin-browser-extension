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
;// CONCATENATED MODULE: ./src/shared/events/sendNoFlights.ts
function sendNoFlightsEvent(providerName) {
  chrome.runtime.sendMessage({
    event: "NO_FLIGHTS_FOUND",
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
;// CONCATENATED MODULE: ./src/skyscanner/ui/handleCaptcha.ts
function handleCaptcha_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function handleCaptcha_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { handleCaptcha_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { handleCaptcha_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var SEARCH_PAGE_SHELL_SELECTOR = "#pagewrap";
var handleCaptcha = /*#__PURE__*/function () {
  var _ref = handleCaptcha_asyncToGenerator(function* () {
    var iframes = document.querySelectorAll("iframe");

    if (!iframes) {
      throw new MissingElementLookupError("Unable to locate iframes in captcha page");
    }

    for (var index = 0; index < iframes.length; index++) {
      var testWindow = window[index];
      testWindow.document.body.dispatchEvent(new Event("mousedown"));
    }

    yield waitForAppearance(15000, SEARCH_PAGE_SHELL_SELECTOR);
  });

  return function handleCaptcha() {
    return _ref.apply(this, arguments);
  };
}();
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
;// CONCATENATED MODULE: ./src/shared/utilities/createInvisibleIframe.ts
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function createInvisibleIframe_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function createInvisibleIframe_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { createInvisibleIframe_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { createInvisibleIframe_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var createInvisibleIframe = /*#__PURE__*/function () {
  var _ref = createInvisibleIframe_asyncToGenerator(function* (parentElement, link) {
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
    var iframe = yield waitForAppearance(timeout, selector);

    if (!iframe.contentDocument) {
      throw new ParserError("Unable to access content document of iframe");
    }

    return iframe.contentDocument;
  });

  return function createInvisibleIframe(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
;// CONCATENATED MODULE: ./src/skyscanner/ui/manageLayoversIframe.ts
function manageLayoversIframe_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function manageLayoversIframe_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { manageLayoversIframe_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { manageLayoversIframe_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var IFRAME_CLASSNAME = "invisible_layovers";
var IFRAME_SELECTOR = ".".concat(IFRAME_CLASSNAME);
var LINK_SELECTOR = "a[class*='FlightsTicket_link']";
var IFRAME_LOADING_SELECTOR = "[class*='DetailsPanel_loading']";
var createLayoversIframe = /*#__PURE__*/function () {
  var _ref = manageLayoversIframe_asyncToGenerator(function* (flightCard) {
    var link = yield getLayoversLink(flightCard);
    var iframeDocument = yield createInvisibleIframe(flightCard, link, 15000, "", [IFRAME_CLASSNAME]);
    yield waitForDisappearance(15000, IFRAME_LOADING_SELECTOR, iframeDocument);
    return iframeDocument;
  });

  return function createLayoversIframe(_x) {
    return _ref.apply(this, arguments);
  };
}();
var deleteLayoversIframe = /*#__PURE__*/function () {
  var _ref2 = manageLayoversIframe_asyncToGenerator(function* (flightCard) {
    var _iframe$parentElement;

    var iframe = flightCard.querySelector(IFRAME_SELECTOR);

    if (!iframe) {
      return;
    }

    (_iframe$parentElement = iframe.parentElement) === null || _iframe$parentElement === void 0 ? void 0 : _iframe$parentElement.removeChild(iframe);
    yield waitForDisappearance(10000, IFRAME_SELECTOR);
  });

  return function deleteLayoversIframe(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getLayoversLink = /*#__PURE__*/function () {
  var _ref3 = manageLayoversIframe_asyncToGenerator(function* (flightCard) {
    var link = flightCard.closest(LINK_SELECTOR);

    if (!link) {
      throw new MissingElementLookupError("Unable to find layovers link");
    }

    return link.href;
  });

  return function getLayoversLink(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
;// CONCATENATED MODULE: ./src/skyscanner/parser/getFlightLayovers.ts
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || getFlightLayovers_unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getFlightLayovers_createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = getFlightLayovers_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function getFlightLayovers_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return getFlightLayovers_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return getFlightLayovers_arrayLikeToArray(o, minLen); }

function getFlightLayovers_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var LEG_DETAILS_SELECTOR = "[class*='LegSegmentSummary_container']";
var LEG_INFORMATION_SELECTOR = "[class*='AirlineLogoTitle_container'],[class*='LegSegmentDetails_container']";
var TIMES_SELECTOR = "[class*='Times_segment']";
var AIRPORTS_SELECTOR = "[class*='Routes_route']";
var getFlightLayovers = function getFlightLayovers(legContainer) {
  var _legContainer$querySe;

  (_legContainer$querySe = legContainer.querySelector("button")) === null || _legContainer$querySe === void 0 ? void 0 : _legContainer$querySe.click();
  waitForAppearance(500, LEG_DETAILS_SELECTOR, legContainer);
  var layovers = [];
  var legDetailsContainers = legContainer.querySelectorAll(LEG_INFORMATION_SELECTOR);
  var previous = {};

  var _iterator = getFlightLayovers_createForOfIteratorHelper(legDetailsContainers),
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
        throw new ParserError("Unexpected case: ".concat(container.className));
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
    throw new MissingElementLookupError("Unable to find marketing airline container");
  }

  var marketingAirline = (_marketingAirlineCont = marketingAirlineContainer.textContent) === null || _marketingAirlineCont === void 0 ? void 0 : _marketingAirlineCont.trim();
  var operatingAirline = operatingAirlineContainer && (_operatingAirlineCont = operatingAirlineContainer.textContent) !== null && _operatingAirlineCont !== void 0 && _operatingAirlineCont.toLowerCase().includes("operated") ? operatingAirlineContainer.textContent.split("|")[1].trim() : marketingAirline;

  if (!marketingAirline) {
    throw new MissingFieldParserError("Unable to determine marketing airline");
  }

  if (!operatingAirline) {
    throw new MissingFieldParserError("Unable to determine operating airline");
  }

  return {
    marketingAirline: marketingAirline,
    operatingAirline: operatingAirline
  };
};

var getTimes = function getTimes(legDetailsContainer) {
  var timesContainer = legDetailsContainer.querySelector(TIMES_SELECTOR);

  if (!timesContainer) {
    throw new MissingElementLookupError("Unable to determine times of layover");
  }

  var _timesContainer$query = timesContainer.querySelectorAll("span"),
      _timesContainer$query2 = _slicedToArray(_timesContainer$query, 3),
      departureTimeSpan = _timesContainer$query2[0],
      durationSpan = _timesContainer$query2[1],
      arrivalTimeSpan = _timesContainer$query2[2];

  var departureTime = departureTimeSpan.textContent;

  if (!departureTimeSpan) {
    throw new MissingFieldParserError("Couldn't parse departure time of layover");
  }

  var duration = durationSpan.textContent;

  if (!duration) {
    throw new MissingFieldParserError("Couldn't parse duration of layover");
  }

  var arrivalTime = arrivalTimeSpan.textContent;

  if (!arrivalTime) {
    throw new MissingFieldParserError("Couldn't parse arrival time of layover");
  }

  return {
    departureTime: standardizeTimeString(departureTime),
    arrivalTime: standardizeTimeString(arrivalTime),
    duration: duration
  };
};

var getAirports = function getAirports(legDetailsContainer) {
  var _departureAirportSpan, _arrivalAirportSpan$t;

  var airportsContainer = legDetailsContainer.querySelector(AIRPORTS_SELECTOR);

  if (!airportsContainer) {
    throw new MissingElementLookupError("Unable to determine airports of layover");
  }

  var _airportsContainer$qu = airportsContainer.querySelectorAll("span"),
      _airportsContainer$qu2 = _slicedToArray(_airportsContainer$qu, 2),
      departureAirportSpan = _airportsContainer$qu2[0],
      arrivalAirportSpan = _airportsContainer$qu2[1];

  var departureAirport = (_departureAirportSpan = departureAirportSpan.textContent) === null || _departureAirportSpan === void 0 ? void 0 : _departureAirportSpan.split(/\s+/)[0].trim();

  if (!departureAirport) {
    throw new MissingFieldParserError("Couldn't parse departure airport of layover");
  }

  var arrivalAirport = (_arrivalAirportSpan$t = arrivalAirportSpan.textContent) === null || _arrivalAirportSpan$t === void 0 ? void 0 : _arrivalAirportSpan$t.split(/\s+/)[0].trim();

  if (!arrivalAirport) {
    throw new MissingFieldParserError("Couldn't parse arrival airport of layover");
  }

  return {
    arrivalAirport: arrivalAirport,
    departureAirport: departureAirport
  };
};
;// CONCATENATED MODULE: ./src/skyscanner/parser/getLayovers.ts
function getLayovers_slicedToArray(arr, i) { return getLayovers_arrayWithHoles(arr) || getLayovers_iterableToArrayLimit(arr, i) || getLayovers_unsupportedIterableToArray(arr, i) || getLayovers_nonIterableRest(); }

function getLayovers_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function getLayovers_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return getLayovers_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return getLayovers_arrayLikeToArray(o, minLen); }

function getLayovers_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getLayovers_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function getLayovers_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getLayovers_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function getLayovers_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { getLayovers_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { getLayovers_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var LEG_CONTAINER_SELECTOR = "[class*='Itinerary_leg']";
var getLayovers = /*#__PURE__*/function () {
  var _ref = getLayovers_asyncToGenerator(function* (flightCard) {
    var iframeDoc = yield openFlightDetails(flightCard);

    var _ref2 = iframeDoc.querySelectorAll(LEG_CONTAINER_SELECTOR),
        _ref3 = getLayovers_slicedToArray(_ref2, 2),
        departureLegContainer = _ref3[0],
        returnLegContainer = _ref3[1];

    var departureLayovers = getFlightLayovers(departureLegContainer);
    var returnLayovers = getFlightLayovers(returnLegContainer);
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
  var _ref4 = getLayovers_asyncToGenerator(function* (flightCard) {
    return yield createLayoversIframe(flightCard);
  });

  return function openFlightDetails(_x2) {
    return _ref4.apply(this, arguments);
  };
}();
var closeFlightDetails = /*#__PURE__*/function () {
  var _ref5 = getLayovers_asyncToGenerator(function* (flightCard) {
    yield deleteLayoversIframe(flightCard);
  });

  return function closeFlightDetails(_x3) {
    return _ref5.apply(this, arguments);
  };
}();
;// CONCATENATED MODULE: ./src/skyscanner/parser/getFlight.ts
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getFlight_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function getFlight_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { getFlight_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { getFlight_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var FARE_SELECTOR = "[class*='TotalPrice_totalPriceContainer'],[class*='Price_mainPriceContainer'],[class*='CardPrice_totalPrice']";
var DETAILS_SELECTOR = "[class*='UpperTicketBody_leg__']";
var MARKETING_AIRLINE_CONTAINER_SELECTOR = "[class*='LogoImage_container__']";
var OPERATING_AIRLINE_CONTAINER_SELECTOR = "[class*='Operators_operator']";
var TIME_CONTAINER_SELECTOR = "span[class*='LegInfo_routePartialTime__']";
var DURATION_CONTAINER_SELECTOR = "span[class*='Duration_duration']";
var STOP_REGEX = /\d{1,2} stop/;
var getFlight = /*#__PURE__*/function () {
  var _ref = getFlight_asyncToGenerator(function* (flightCard) {
    var fare = getFare(flightCard);

    var _ref2 = isNonstop(flightCard) ? {
      departureLayovers: [],
      returnLayovers: []
    } : yield getLayovers(flightCard),
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
    throw new MissingElementLookupError("Unable to find fare in card");
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
    throw new MissingElementLookupError("Unable to locate ".concat(type, " container"));
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
    throw new MissingElementLookupError("Unable to locate marketing airline container");
  }

  var rawAirlineName = (_airlineContainer$tex = airlineContainer.textContent) === null || _airlineContainer$tex === void 0 ? void 0 : _airlineContainer$tex.trim();

  if (!rawAirlineName) {
    var airlineLogo = airlineContainer.querySelector("img");

    if (airlineLogo.alt) {
      rawAirlineName = airlineLogo.alt;
    }

    if (!rawAirlineName) {
      throw new MissingFieldParserError("Unable to extract marketing airline name");
    }
  }

  return airlineMap.getAirlineName(rawAirlineName);
};

var getOperatingAirline = function getOperatingAirline(flightContainer) {
  var _airlineContainer$tex2;

  var airlineContainer = flightContainer.querySelector(OPERATING_AIRLINE_CONTAINER_SELECTOR);

  if (!airlineContainer) {
    var _flightContainer$text;

    if ((_flightContainer$text = flightContainer.textContent) !== null && _flightContainer$text !== void 0 && _flightContainer$text.toLowerCase().includes("operated by")) {
      throw new MissingElementLookupError("Unable to locate operating airline container");
    } else {
      return null;
    }
  }

  var rawAirlineName = (_airlineContainer$tex2 = airlineContainer.textContent) === null || _airlineContainer$tex2 === void 0 ? void 0 : _airlineContainer$tex2.trim();

  if (!rawAirlineName) {
    throw new MissingFieldParserError("Unable to extract operating airline name");
  }

  return airlineMap.getAirlineName(rawAirlineName);
};

var getFlightTime = function getFlightTime(flightContainer, type) {
  var _timeContainer$textCo;

  var index = type === "DEPARTURE" ? 0 : 1;
  var timeContainer = flightContainer.querySelectorAll(TIME_CONTAINER_SELECTOR)[index];

  if (!timeContainer) {
    throw new MissingElementLookupError("Unable to find ".concat(type, " time container"));
  }

  var timeText = (_timeContainer$textCo = timeContainer.textContent) === null || _timeContainer$textCo === void 0 ? void 0 : _timeContainer$textCo.trim();

  if (!timeText) {
    throw new MissingElementLookupError("Unable to determine ".concat(type, " time"));
  }

  return standardizeTimeString(timeText);
};

var getDurationTime = function getDurationTime(flightContainer) {
  var _timeContainer$textCo2;

  var timeContainer = flightContainer.querySelector(DURATION_CONTAINER_SELECTOR);

  if (!timeContainer) {
    throw new MissingElementLookupError("Unable to find duration time container");
  }

  var duration = (_timeContainer$textCo2 = timeContainer.textContent) === null || _timeContainer$textCo2 === void 0 ? void 0 : _timeContainer$textCo2.trim();

  if (!duration) {
    throw new MissingElementLookupError("Unable to determine duration time");
  }

  return duration;
};
;// CONCATENATED MODULE: ./src/skyscanner/parser/getUnsentFlights.ts
function getUnsentFlights_createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = getUnsentFlights_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function getUnsentFlights_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return getUnsentFlights_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return getUnsentFlights_arrayLikeToArray(o, minLen); }

function getUnsentFlights_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getUnsentFlights_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function getUnsentFlights_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { getUnsentFlights_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { getUnsentFlights_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var CAPTCHA_SELECTOR = "#px-captcha";
var NO_RESULTS_SELECTOR = "div[class*=FallbackNoResults_container]";
var RESULTS_SELECTOR = "span[class*=SummaryInfo_itineraryCountContainer]";
var FLIGHT_CARD_SELECTOR = "[class*='FlightsTicket_container'] [role='button']:not([data-visited='true'])";
var getUnsentFlights = /*#__PURE__*/function () {
  var _ref = getUnsentFlights_asyncToGenerator(function* () {
    var loadingTimeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30000;
    yield waitForAppearance(loadingTimeout, "body");

    if (isCaptcha()) {
      handleCaptcha();
    }

    yield waitForAppearance(loadingTimeout, RESULTS_SELECTOR);

    if (isNoResults()) {
      return [];
    }

    var flights = [];
    var flightCards = document.querySelectorAll(FLIGHT_CARD_SELECTOR);

    var _iterator = getUnsentFlights_createForOfIteratorHelper(flightCards),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var flightCard = _step.value;

        if (shouldSkipCard(flightCard)) {
          continue;
        }

        var flight = yield getFlight(flightCard);
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
;// CONCATENATED MODULE: ./src/skyscanner/ui/closePopupModal.ts
var MODAL_SELECTOR = "button[class*='close-button']";
function closePopupModal() {
  var button = document.querySelector(MODAL_SELECTOR);

  if (button) {
    button.click();
  }
}
;// CONCATENATED MODULE: ./src/skyscanner/ui/getMoreResults.ts
function getMoreResults_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function getMoreResults_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { getMoreResults_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { getMoreResults_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


var UNPROCESSED_FLIGHTS_SELECTOR = "[class*='FlightsTicket_container'] [role='button']:not([data-visited='true'])";
var getMoreResults = /*#__PURE__*/function () {
  var _ref = getMoreResults_asyncToGenerator(function* () {
    var loadingTimeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 7500;
    yield useShowMoreResultsButton(loadingTimeout);
    window.scrollTo(window.scrollX, document.body.offsetHeight);
    yield waitForAppearance(loadingTimeout, UNPROCESSED_FLIGHTS_SELECTOR);
  });

  return function getMoreResults() {
    return _ref.apply(this, arguments);
  };
}();

var useShowMoreResultsButton = /*#__PURE__*/function () {
  var _ref2 = getMoreResults_asyncToGenerator(function* (loadingTimeout) {
    var button = getShowMoreResultsButton();

    if (!button) {
      return;
    }

    button.classList.add("fp-showMoreResults");
    button.click();
    yield waitForDisappearance(loadingTimeout, ".fp-showMoreResults");
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
;// CONCATENATED MODULE: ./src/skyscanner/ui/highlightFlightCard.ts
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || highlightFlightCard_unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function highlightFlightCard_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return highlightFlightCard_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return highlightFlightCard_arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return highlightFlightCard_arrayLikeToArray(arr); }

function highlightFlightCard_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function highlightFlightCard_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function highlightFlightCard_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { highlightFlightCard_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { highlightFlightCard_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var highlightFlightCard_FLIGHT_CARD_SELECTOR = "[class*='FlightsTicket_container'] [role='button']";
var SELECTED_SELECTOR = "[data-selected='true']";
var highlightFlightCard = /*#__PURE__*/function () {
  var _ref = highlightFlightCard_asyncToGenerator(function* (selectedDepartureId, selectedReturnId) {
    clearExistingSelections();
    var flightCard = getFlightCard(selectedDepartureId, selectedReturnId);
    highlightSelectedElement(flightCard);
    scrollToFlightCard(flightCard);
  });

  return function highlightFlightCard(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var clearExistingSelections = function clearExistingSelections() {
  var previousDepSelection = document.querySelector(SELECTED_SELECTOR);

  if (previousDepSelection) {
    clearHighlightFromElement(previousDepSelection);
  }
};

var getFlightCard = function getFlightCard(selectedFlightId, selectedReturnId) {
  var flightCards = document.querySelectorAll(highlightFlightCard_FLIGHT_CARD_SELECTOR);

  if (!flightCards) {
    throw new ParserError("Unable to find flights in highlighting");
  }

  var flightId = "".concat(selectedFlightId, "-").concat(selectedReturnId);
  var flightCard = findMatchingDOMNode(_toConsumableArray(flightCards), flightId);

  if (!flightCard) {
    throw new MissingElementLookupError("Unable to find flight to highlight");
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
;// CONCATENATED MODULE: ./src/skyscanner/contentScript.js
function contentScript_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function contentScript_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { contentScript_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { contentScript_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


window.Sentry.init({
  dsn: "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451"
});





var continueScraping = true;
chrome.runtime.onMessage.addListener( /*#__PURE__*/function () {
  var _ref = contentScript_asyncToGenerator(function* (message) {
    switch (message.event) {
      case "BEGIN_PARSING":
        yield scrapeFlights();
        break;

      case "HIGHLIGHT_FLIGHT":
        continueScraping = false;
        closePopupModal();
        yield highlightFlightCard(message.selectedDepartureId, message.selectedReturnId);
        addBackToSearchButton();
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
  var _ref2 = contentScript_asyncToGenerator(function* () {
    var totalFlightCount = 0;
    var hasMoreFlights = true;

    try {
      while (totalFlightCount < 60 && hasMoreFlights && continueScraping) {
        closePopupModal();
        var unsentFlights = yield getUnsentFlights();

        if (unsentFlights) {
          sendFlightsEvent("skyscanner", unsentFlights);
          totalFlightCount += unsentFlights.length;
          yield getMoreResults();
        } else if (totalFlightCount === 0) {
          sendNoFlightsEvent("skyscanner");
          hasMoreFlights = false;
        } else {
          hasMoreFlights = false;
        }
      }
    } catch (error) {
      window.Sentry.captureException(error);

      if (!totalFlightCount) {
        sendFailedScraper("skyscanner", error);
      }
    }
  });

  return function scrapeFlights() {
    return _ref2.apply(this, arguments);
  };
}();
/******/ })()
;