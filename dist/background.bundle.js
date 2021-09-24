/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/auth/getSubscriptionValidity.js":
/*!*********************************************!*\
  !*** ./src/auth/getSubscriptionValidity.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSubscriptionValidity": () => (/* binding */ getSubscriptionValidity)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.js");

function getSubscriptionValidity(accessToken) {
  return fetch("".concat(_config__WEBPACK_IMPORTED_MODULE_0__.default, "/api/subscription/status"), {
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

/***/ }),

/***/ "./src/auth/getUserInfo.js":
/*!*********************************!*\
  !*** ./src/auth/getUserInfo.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUserInfo": () => (/* binding */ getUserInfo)
/* harmony export */ });
function getUserInfo(accessToken) {
  return fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
    method: "GET",
    headers: new Headers({
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

/***/ }),

/***/ "./src/auth/index.js":
/*!***************************!*\
  !*** ./src/auth/index.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUserInfo": () => (/* reexport safe */ _getUserInfo__WEBPACK_IMPORTED_MODULE_0__.getUserInfo),
/* harmony export */   "getSubscriptionValidity": () => (/* reexport safe */ _getSubscriptionValidity__WEBPACK_IMPORTED_MODULE_1__.getSubscriptionValidity)
/* harmony export */ });
/* harmony import */ var _getUserInfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getUserInfo */ "./src/auth/getUserInfo.js");
/* harmony import */ var _getSubscriptionValidity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getSubscriptionValidity */ "./src/auth/getSubscriptionValidity.js");



/***/ }),

/***/ "./src/background/ProviderManager.ts":
/*!*******************************************!*\
  !*** ./src/background/ProviderManager.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProviderManager": () => (/* binding */ ProviderManager)
/* harmony export */ });
/* harmony import */ var _expedia_mappings_getUrl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../expedia/mappings/getUrl */ "./src/expedia/mappings/getUrl.ts");
/* harmony import */ var _kiwi_mappings_getUrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../kiwi/mappings/getUrl */ "./src/kiwi/mappings/getUrl.ts");
/* harmony import */ var _shared_pause__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/pause */ "./src/shared/pause.ts");
/* harmony import */ var _skyscanner_mappings_getUrl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../skyscanner/mappings/getUrl */ "./src/skyscanner/mappings/getUrl.ts");
/* harmony import */ var _southwest_mappings_getUrl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../southwest/mappings/getUrl */ "./src/southwest/mappings/getUrl.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants */ "./src/background/constants.ts");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./state */ "./src/background/state/index.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }








var terminalStates = ["FAILED", "SUCCESS"];
var successStates = ["SUCCESS"];
var providerURLBaseMap = {
  southwest: _southwest_mappings_getUrl__WEBPACK_IMPORTED_MODULE_4__.getUrl,
  skyscanner: _skyscanner_mappings_getUrl__WEBPACK_IMPORTED_MODULE_3__.getUrl,
  expedia: _expedia_mappings_getUrl__WEBPACK_IMPORTED_MODULE_0__.getUrl,
  kiwi: _kiwi_mappings_getUrl__WEBPACK_IMPORTED_MODULE_1__.getUrl
};
var ProviderManager = /*#__PURE__*/function () {
  function ProviderManager() {
    _classCallCheck(this, ProviderManager);

    this.knownProviders = [];
    this.state = {};
    this.itineraries = {};
    this.itinerariesVersion = 0;
    this.departures = {};
    this.returns = [];
    this.selectedProviders = [];
    this.formData = null;
    this.primaryTab = null;
    this.setPrimaryTab();
    this.setupClosePrimaryTabListener();
  }

  _createClass(ProviderManager, [{
    key: "setupClosePrimaryTabListener",
    value: function setupClosePrimaryTabListener() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      var that = this;
      chrome.tabs.onRemoved.addListener(function (tabId) {
        if (tabId === that.getPrimaryTabId()) {
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
      this.knownProviders = this.formData.searchByPoints ? _constants__WEBPACK_IMPORTED_MODULE_5__.PROVIDERS_SUPPORTING_POINTS_SEARCH : _constants__WEBPACK_IMPORTED_MODULE_5__.SUPPORTED_PROVIDERS;
      this.setDefault();
    }
  }, {
    key: "getFormData",
    value: function getFormData() {
      return this.formData;
    }
  }, {
    key: "setSelectedProviders",
    value: function setSelectedProviders(providerNames) {
      this.selectedProviders = providerNames;
    }
  }, {
    key: "setStatus",
    value: function setStatus(providerName, status, searchType) {
      if (searchType === "DEPARTURE") {
        this.state[providerName]["departureStatus"] = status;
      } else if (searchType === "RETURN") {
        this.state[providerName]["returnStatus"] = status;
      } else {
        this.state[providerName]["departureStatus"] = status;
        this.state[providerName]["returnStatus"] = status;
      }
    }
  }, {
    key: "setPending",
    value: function setPending(providerName, searchType) {
      this.setStatus(providerName, "PENDING", searchType);
    }
  }, {
    key: "setFailed",
    value: function setFailed(providerName, searchType) {
      this.setStatus(providerName, "FAILED", searchType);
    }
  }, {
    key: "setSuccessful",
    value: function setSuccessful(providerName, searchType) {
      this.setStatus(providerName, "SUCCESS", searchType);
    }
  }, {
    key: "setPartialReturn",
    value: function setPartialReturn(providerName, searchType) {
      var status;

      if (searchType === "BOTH") {
        status = this.getStatus(providerName, "DEPARTURE") && this.getStatus(providerName, "RETURN");
      } else {
        status = this.getStatus(providerName, searchType);
      }

      if (!status || !terminalStates.includes(status)) {
        this.setStatus(providerName, "PARTIAL_RETURN_CONTINUING", searchType);
      }
    }
  }, {
    key: "getStatus",
    value: function getStatus(providerName, searchType) {
      return searchType === "DEPARTURE" ? this.getDepartureStatus(providerName) : this.getReturnStatus(providerName);
    }
  }, {
    key: "getDepartureStatus",
    value: function getDepartureStatus(providerName) {
      return this.state[providerName]["departureStatus"];
    }
  }, {
    key: "getReturnStatus",
    value: function getReturnStatus(providerName) {
      return this.state[providerName]["returnStatus"];
    }
  }, {
    key: "isProviderDepartureComplete",
    value: function isProviderDepartureComplete(providerName) {
      var status = this.getDepartureStatus(providerName);
      return status ? terminalStates.includes(status) : false;
    }
  }, {
    key: "isProviderReturnComplete",
    value: function isProviderReturnComplete(providerName) {
      var status = this.getReturnStatus(providerName);
      return status ? terminalStates.includes(status) : false;
    }
  }, {
    key: "isDepartureComplete",
    value: function isDepartureComplete() {
      var _this = this;

      return this.knownProviders.every(function (providerName) {
        return _this.isProviderDepartureComplete(providerName);
      });
    }
  }, {
    key: "isReturnComplete",
    value: function isReturnComplete() {
      var _this2 = this;

      var providers = this.selectedProviders.length ? this.selectedProviders : this.knownProviders;
      return providers.every(function (providerName) {
        return _this2.isProviderReturnComplete(providerName);
      });
    }
  }, {
    key: "isComplete",
    value: function isComplete(searchType) {
      var status;

      if (searchType === "BOTH") {
        status = this.isDepartureComplete() && this.isReturnComplete();
      } else if (searchType === "DEPARTURE") {
        status = this.isDepartureComplete();
      } else {
        status = this.isReturnComplete();
      }

      return status;
    }
  }, {
    key: "isProviderDepartureSuccessful",
    value: function isProviderDepartureSuccessful(providerName) {
      var status = this.getDepartureStatus(providerName);
      return status ? successStates.includes(status) : false;
    }
  }, {
    key: "isProviderReturnSuccessful",
    value: function isProviderReturnSuccessful(providerName) {
      var status = this.getReturnStatus(providerName);
      return status ? successStates.includes(status) : false;
    }
  }, {
    key: "isDepartureSuccessful",
    value: function isDepartureSuccessful() {
      var _this3 = this;

      return this.knownProviders.every(function (providerName) {
        _this3.isProviderDepartureSuccessful(providerName);
      });
    }
  }, {
    key: "isReturnSuccessful",
    value: function isReturnSuccessful() {
      var _this4 = this;

      return this.knownProviders.every(function (providerName) {
        _this4.isProviderReturnSuccessful(providerName);
      });
    }
  }, {
    key: "getItineraries",
    value: function getItineraries() {
      return {
        itineraries: this.itineraries,
        version: this.itinerariesVersion
      };
    }
  }, {
    key: "setItineraries",
    value: function setItineraries(itineraries, version) {
      if (version === this.itinerariesVersion) {
        this.itineraries = itineraries;
        this.itinerariesVersion += 1;
        return true;
      } else {
        return false;
      }
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
      this.returns = this.returns.concat(returns).sort(function (a, b) {
        return a.pain - b.pain;
      });
    }
  }, {
    key: "setReturns",
    value: function setReturns(returns) {
      this.returns = returns;
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
      var _this5 = this;

      this.knownProviders.forEach(function (providerName) {
        _this5.state[providerName] = {
          departureStatus: "PENDING",
          returnStatus: "PENDING",
          ready: true,
          onReady: _constants__WEBPACK_IMPORTED_MODULE_5__.DEFAULT_ON_READY_FUNCTION,
          timer: null
        };
      });
      this.itineraries = {};
      this.itinerariesVersion = 0;
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
      var _this6 = this;

      (0,_state__WEBPACK_IMPORTED_MODULE_6__.isExtensionOpen)({
        extensionOpenCallback: function extensionOpenCallback(tab) {
          _this6.primaryTab = tab;
        },
        extensionClosedCallback: function extensionClosedCallback() {
          // Simpler than polling for status...
          (0,_shared_pause__WEBPACK_IMPORTED_MODULE_2__.pause)(500).then(function () {
            _this6.setPrimaryTab();
          });
        }
      });
    }
  }, {
    key: "createWindow",
    value: function createWindow(url, provider, windowConfig, message) {
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
            var _that$primaryTab, _that$primaryTab2;

            if (window && window.tabs && ((_that$primaryTab = that.primaryTab) === null || _that$primaryTab === void 0 ? void 0 : _that$primaryTab.windowId) !== null && ((_that$primaryTab2 = that.primaryTab) === null || _that$primaryTab2 === void 0 ? void 0 : _that$primaryTab2.windowId) !== undefined) {
              // update again for chrome on windows, to move results window to foreground
              chrome.windows.update(that.primaryTab.windowId, {
                focused: true
              });
              that.setTab(provider, window.tabs[0]);
              that.setWindow(provider, window);
              chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
                if (info.status === "complete" && tabId === that.getTabId(provider)) {
                  chrome.tabs.onUpdated.removeListener(listener);
                  chrome.tabs.sendMessage(tabId, message);
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

      if (windowId !== null && windowId !== undefined) {
        chrome.windows.remove(windowId);
      }
    }
  }, {
    key: "closeWindows",
    value: function closeWindows() {
      var _this7 = this;

      this.knownProviders.forEach(function (providerName) {
        _this7.closeWindow(providerName);
      });
    }
  }, {
    key: "searchForResults",
    value: function searchForResults(formData, windowConfig) {
      var _this$primaryTab4,
          _this8 = this;

      this.setFormData(formData);
      var primaryWindowId = this === null || this === void 0 ? void 0 : (_this$primaryTab4 = this.primaryTab) === null || _this$primaryTab4 === void 0 ? void 0 : _this$primaryTab4.windowId;
      var message = {
        event: "BEGIN_PARSING",
        formData: formData
      };

      if (primaryWindowId !== undefined && primaryWindowId !== null) {
        var promises = this.knownProviders.map(function (provider) {
          var url = providerURLBaseMap[provider](formData); // Open url in a new window.
          // Not a new tab because we can't read results from inactive tabs (browser powers down inactive tabs).

          return _this8.createWindow(url, provider, windowConfig, message);
        });
        Promise.all(promises).then(function () {
          // update again for chrome on windows, to move results window to foreground
          chrome.windows.update(primaryWindowId, {
            focused: true
          });
        });
      }
    }
  }, {
    key: "sendMessageToIndexPage",
    value: function sendMessageToIndexPage(message) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var primaryTabId = this.getPrimaryTabId();

      if (primaryTabId !== null && primaryTabId !== undefined) {
        setTimeout(function () {
          chrome.tabs.sendMessage(primaryTabId, message);
        }, delay);
      }
    }
  }]);

  return ProviderManager;
}();

/***/ }),

/***/ "./src/background/constants.ts":
/*!*************************************!*\
  !*** ./src/background/constants.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PROVIDERS_NEEDING_RETURNS": () => (/* binding */ PROVIDERS_NEEDING_RETURNS),
/* harmony export */   "PROVIDERS_SUPPORTING_POINTS_SEARCH": () => (/* binding */ PROVIDERS_SUPPORTING_POINTS_SEARCH),
/* harmony export */   "SUPPORTED_PROVIDERS": () => (/* binding */ SUPPORTED_PROVIDERS),
/* harmony export */   "DEFAULT_ON_READY_FUNCTION": () => (/* binding */ DEFAULT_ON_READY_FUNCTION),
/* harmony export */   "CabinMap": () => (/* binding */ CabinMap)
/* harmony export */ });
var PROVIDERS_NEEDING_RETURNS = [// force expansion
  // "expedia",
];
var PROVIDERS_SUPPORTING_POINTS_SEARCH = ["expedia"];
var SUPPORTED_PROVIDERS = [// force expansion
// "expedia",
"kiwi" // "skyscanner",
// "southwest",
]; // eslint-disable-next-line @typescript-eslint/no-empty-function

var DEFAULT_ON_READY_FUNCTION = function DEFAULT_ON_READY_FUNCTION() {};
var CabinMap = {
  econ: "Economy",
  prem_econ: "Premium Economy",
  business: "Business",
  first: "First"
};

/***/ }),

/***/ "./src/background/eventHandlers/clearSelections.ts":
/*!*********************************************************!*\
  !*** ./src/background/eventHandlers/clearSelections.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleClearSelections": () => (/* binding */ handleClearSelections)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/background/constants.ts");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


var handleClearSelections = function handleClearSelections(providerManager) {
  providerManager.setReturns([]);

  var _iterator = _createForOfIteratorHelper(_constants__WEBPACK_IMPORTED_MODULE_0__.PROVIDERS_NEEDING_RETURNS),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var providerName = _step.value;
      providerManager.setReady(providerName, false);
      providerManager.setOnReady(providerName, _constants__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_ON_READY_FUNCTION);
      var tabId = providerManager.getTabId(providerName);

      if (tabId !== null && tabId !== undefined) {
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

/***/ }),

/***/ "./src/background/eventHandlers/departureSelected.ts":
/*!***********************************************************!*\
  !*** ./src/background/eventHandlers/departureSelected.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleDepartureSelected": () => (/* binding */ handleDepartureSelected)
/* harmony export */ });
/* harmony import */ var _dataModels__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dataModels */ "./src/dataModels.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./src/background/constants.ts");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



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

  var _providerManager$getI = providerManager.getItineraries(),
      itineraries = _providerManager$getI.itineraries;

  var departureItineraries = departure.itinIds.flatMap(function (itinId) {
    return itineraries[itinId];
  });
  var departureProviders = departureItineraries.map(function (itinerary) {
    return itinerary.provider;
  });
  providerManager.setSelectedProviders(departureProviders);

  if (hasReturnProviders(departureProviders)) {
    requestNoRoundtripProviderReturns(departure, providerManager, departureProviders, departureItineraries);
  } else {
    getRoundtripProviderReturns(departure, providerManager);
  }
};

var hasReturnProviders = function hasReturnProviders(departureProviders) {
  return _constants__WEBPACK_IMPORTED_MODULE_1__.PROVIDERS_NEEDING_RETURNS.some(function (providerName) {
    return departureProviders.includes(providerName);
  });
};

var requestNoRoundtripProviderReturns = function requestNoRoundtripProviderReturns(departure, providerManager, departureProviders, departureItineraries) {
  var _iterator = _createForOfIteratorHelper(departureProviders),
      _step;

  try {
    var _loop = function _loop() {
      var providerName = _step.value;
      var tabId = providerManager.getTabId(providerName);

      if (tabId !== null && tabId !== undefined) {
        var getReturns = function getReturns() {
          chrome.tabs.sendMessage(tabId, {
            event: "GET_RETURN_FLIGHTS",
            departure: departure,
            itin: departureItineraries[departureProviders.indexOf(providerName)]
          });
          providerManager.setTimer(providerName, 10000, function () {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
  var _providerManager$getI2 = providerManager.getItineraries(),
      itineraries = _providerManager$getI2.itineraries;

  var returnList = (0,_dataModels__WEBPACK_IMPORTED_MODULE_0__.sortFlights)((0,_dataModels__WEBPACK_IMPORTED_MODULE_0__.findReturnFlights)(departure, itineraries), itineraries);
  providerManager.addReturns(returnList);
  var message = {
    event: "RETURN_FLIGHTS_FOR_CLIENT",
    flights: {
      departureList: (0,_dataModels__WEBPACK_IMPORTED_MODULE_0__.sortFlights)(providerManager.getDepartures(), itineraries),
      returnList: providerManager.getReturns(),
      itins: itineraries,
      updatedAt: new Date()
    },
    formData: providerManager.getFormData()
  };
  providerManager.sendMessageToIndexPage(message);
  providerManager.sendMessageToIndexPage({
    event: "SCRAPING_COMPLETED",
    searchType: "RETURN"
  }, 3000);
};

/***/ }),

/***/ "./src/background/eventHandlers/dispatchBeginParsing.ts":
/*!**************************************************************!*\
  !*** ./src/background/eventHandlers/dispatchBeginParsing.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleDispatchBeginParsing": () => (/* binding */ handleDispatchBeginParsing)
/* harmony export */ });
var handleDispatchBeginParsing = function handleDispatchBeginParsing(providerManager, providerName, timeout) {
  providerManager.setPending(providerName, "BOTH"); // de facto begin parsing resets both...

  var tabId = providerManager.getTabId(providerName);

  if (tabId !== null && tabId !== undefined) {
    setTimeout(function () {
      chrome.tabs.sendMessage(tabId, {
        event: "BEGIN_PARSING",
        formData: providerManager.getFormData()
      });
    }, timeout);
  }
};

/***/ }),

/***/ "./src/background/eventHandlers/flightResultsReceived.ts":
/*!***************************************************************!*\
  !*** ./src/background/eventHandlers/flightResultsReceived.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleFlightResultsReceived": () => (/* binding */ handleFlightResultsReceived)
/* harmony export */ });
/* harmony import */ var _dataModels__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dataModels */ "./src/dataModels.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var handleFlightResultsReceived = function handleFlightResultsReceived(providerManager, flights, providerName) {
  if (flights.length === 0) {
    console.debug("Received flight results... but the list was empty");
    return; // TODO: Enhance
  }

  var windowId = providerManager.getWindowId(providerName);
  var tabId = providerManager.getTabId(providerName);

  if (windowId === null || windowId === undefined || tabId === null || tabId === undefined) {
    console.debug("No windows available in flight results");
    return; // TODO: Better handle
  }

  var _providerManager$getI = providerManager.getItineraries(),
      existingItineraries = _providerManager$getI.itineraries,
      existingItinerariesVersion = _providerManager$getI.version;

  var existingDepartures = providerManager.getDepartures(); // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore

  var _makeItins = (0,_dataModels__WEBPACK_IMPORTED_MODULE_0__.makeItins)(flights, existingDepartures, existingItineraries, providerName, windowId, tabId),
      departures = _makeItins.departures,
      itineraries = _makeItins.itins;

  var setSuccessful = providerManager.setItineraries(_objectSpread({}, itineraries), existingItinerariesVersion);

  if (setSuccessful) {
    providerManager.setPartialReturn(providerName, "DEPARTURE");
    providerManager.setDepartures(_objectSpread({}, departures));
    var updatedDepartures = providerManager.getDepartures();

    var _providerManager$getI2 = providerManager.getItineraries(),
        updatedItineraries = _providerManager$getI2.itineraries;

    var departuresToSend = (0,_dataModels__WEBPACK_IMPORTED_MODULE_0__.sortFlights)(updatedDepartures, updatedItineraries);
    var nextMessage = {
      event: "FLIGHT_RESULTS_FOR_CLIENT",
      flights: {
        departureList: departuresToSend,
        itins: updatedItineraries,
        returnList: (0,_dataModels__WEBPACK_IMPORTED_MODULE_0__.sortFlights)(providerManager.getReturns(), updatedItineraries),
        updatedAt: new Date()
      },
      formData: providerManager.getFormData()
    };
    providerManager.sendMessageToIndexPage(nextMessage);
  } else {
    console.debug("Retrying processing of received flight results...");
    return handleFlightResultsReceived(providerManager, flights, providerName);
  }
};

/***/ }),

/***/ "./src/background/eventHandlers/flightReturnResultsReceived.ts":
/*!*********************************************************************!*\
  !*** ./src/background/eventHandlers/flightReturnResultsReceived.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleFlightReturnResultsReceived": () => (/* binding */ handleFlightReturnResultsReceived)
/* harmony export */ });
/* harmony import */ var _dataModels__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dataModels */ "./src/dataModels.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var handleFlightReturnResultsReceived = function handleFlightReturnResultsReceived(providerManager, flights, providerName) {
  // for providers that show returns separate from departures,
  // and only once you select a departure.
  if (flights.length === 0) {
    return; // TODO: Enhance
  }

  var windowId = providerManager.getWindowId(providerName);
  var tabId = providerManager.getTabId(providerName);

  if (windowId === null || windowId === undefined || tabId === null || tabId === undefined) {
    // TODO: Better handle
    return;
  }

  var _providerManager$getI = providerManager.getItineraries(),
      existingItineraries = _providerManager$getI.itineraries,
      existingItinerariesVersion = _providerManager$getI.version;

  var existingDepartures = providerManager.getDepartures(); // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore

  var _makeItins = (0,_dataModels__WEBPACK_IMPORTED_MODULE_0__.makeItins)(flights, existingDepartures, existingItineraries, providerName, windowId, tabId, true),
      returns = _makeItins.returns,
      itineraries = _makeItins.itins;

  var allItins = _objectSpread(_objectSpread({}, existingItineraries), itineraries);

  var setSuccessful = providerManager.setItineraries(allItins, existingItinerariesVersion);

  if (setSuccessful) {
    providerManager.setPartialReturn(providerName, "RETURN");
    var returnList = (0,_dataModels__WEBPACK_IMPORTED_MODULE_0__.sortFlights)(Object.values(returns), allItins); // TODO dedup returns

    providerManager.addReturns(returnList);
    var nextMessage = {
      event: "RETURN_FLIGHTS_FOR_CLIENT",
      flights: {
        departureList: (0,_dataModels__WEBPACK_IMPORTED_MODULE_0__.sortFlights)(providerManager.getDepartures(), allItins),
        returnList: providerManager.getReturns(),
        itins: itineraries,
        updatedAt: new Date()
      },
      formData: providerManager.getFormData()
    };
    providerManager.sendMessageToIndexPage(nextMessage);
  } else {
    return handleFlightReturnResultsReceived(providerManager, flights, providerName);
  }
};

/***/ }),

/***/ "./src/background/eventHandlers/focusWebpage.ts":
/*!******************************************************!*\
  !*** ./src/background/eventHandlers/focusWebpage.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleFocusWebpage": () => (/* binding */ handleFocusWebpage)
/* harmony export */ });
/* harmony import */ var _shared_focusTab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/focusTab */ "./src/shared/focusTab.ts");

var handleFocusWebpage = function handleFocusWebpage(providerManager) {
  providerManager.sendMessageToIndexPage({
    event: "FOCUS_WEBPAGE_CLIENT"
  });
  var windowId = providerManager.getPrimaryWindowId();
  var tabId = providerManager.getPrimaryTabId();

  if (windowId !== null && windowId !== undefined && tabId !== null && tabId !== undefined) {
    (0,_shared_focusTab__WEBPACK_IMPORTED_MODULE_0__.focusTab)(windowId, tabId);
  }
};

/***/ }),

/***/ "./src/background/eventHandlers/formDataReceived.ts":
/*!**********************************************************!*\
  !*** ./src/background/eventHandlers/formDataReceived.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleFormDataReceived": () => (/* binding */ handleFormDataReceived)
/* harmony export */ });
var handleFormDataReceived = function handleFormDataReceived(providerManager, formData, windowConfig) {
  providerManager.closeWindows();
  providerManager.searchForResults(formData, windowConfig);
};

/***/ }),

/***/ "./src/background/eventHandlers/highlightTab.ts":
/*!******************************************************!*\
  !*** ./src/background/eventHandlers/highlightTab.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleHighlightTab": () => (/* binding */ handleHighlightTab)
/* harmony export */ });
var handleHighlightTab = function handleHighlightTab(providerManager, departureId, returnId) {
  var key = departureId;

  if (returnId) {
    key += "-".concat(returnId);
  }

  var _providerManager$getI = providerManager.getItineraries(),
      itineraries = _providerManager$getI.itineraries;

  var itinerary = itineraries[key];
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

/***/ }),

/***/ "./src/background/eventHandlers/index.ts":
/*!***********************************************!*\
  !*** ./src/background/eventHandlers/index.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleClearSelections": () => (/* reexport safe */ _clearSelections__WEBPACK_IMPORTED_MODULE_0__.handleClearSelections),
/* harmony export */   "handleDepartureSelected": () => (/* reexport safe */ _departureSelected__WEBPACK_IMPORTED_MODULE_1__.handleDepartureSelected),
/* harmony export */   "handleDispatchBeginParsing": () => (/* reexport safe */ _dispatchBeginParsing__WEBPACK_IMPORTED_MODULE_2__.handleDispatchBeginParsing),
/* harmony export */   "handleFlightResultsReceived": () => (/* reexport safe */ _flightResultsReceived__WEBPACK_IMPORTED_MODULE_3__.handleFlightResultsReceived),
/* harmony export */   "handleFlightReturnResultsReceived": () => (/* reexport safe */ _flightReturnResultsReceived__WEBPACK_IMPORTED_MODULE_4__.handleFlightReturnResultsReceived),
/* harmony export */   "handleFocusWebpage": () => (/* reexport safe */ _focusWebpage__WEBPACK_IMPORTED_MODULE_5__.handleFocusWebpage),
/* harmony export */   "handleFormDataReceived": () => (/* reexport safe */ _formDataReceived__WEBPACK_IMPORTED_MODULE_6__.handleFormDataReceived),
/* harmony export */   "handleHighlightTab": () => (/* reexport safe */ _highlightTab__WEBPACK_IMPORTED_MODULE_7__.handleHighlightTab),
/* harmony export */   "handleIndexUnloaded": () => (/* reexport safe */ _indexUnloaded__WEBPACK_IMPORTED_MODULE_8__.handleIndexUnloaded),
/* harmony export */   "handleNoFlightsFound": () => (/* reexport safe */ _noFlightsFound__WEBPACK_IMPORTED_MODULE_9__.handleNoFlightsFound),
/* harmony export */   "handleProviderReady": () => (/* reexport safe */ _providerReady__WEBPACK_IMPORTED_MODULE_10__.handleProviderReady),
/* harmony export */   "handleScraperFailed": () => (/* reexport safe */ _scraperFailed__WEBPACK_IMPORTED_MODULE_11__.handleScraperFailed),
/* harmony export */   "handleScraperSuccess": () => (/* reexport safe */ _scraperSuccess__WEBPACK_IMPORTED_MODULE_12__.handleScraperSuccess)
/* harmony export */ });
/* harmony import */ var _clearSelections__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clearSelections */ "./src/background/eventHandlers/clearSelections.ts");
/* harmony import */ var _departureSelected__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./departureSelected */ "./src/background/eventHandlers/departureSelected.ts");
/* harmony import */ var _dispatchBeginParsing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dispatchBeginParsing */ "./src/background/eventHandlers/dispatchBeginParsing.ts");
/* harmony import */ var _flightResultsReceived__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./flightResultsReceived */ "./src/background/eventHandlers/flightResultsReceived.ts");
/* harmony import */ var _flightReturnResultsReceived__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./flightReturnResultsReceived */ "./src/background/eventHandlers/flightReturnResultsReceived.ts");
/* harmony import */ var _focusWebpage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./focusWebpage */ "./src/background/eventHandlers/focusWebpage.ts");
/* harmony import */ var _formDataReceived__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./formDataReceived */ "./src/background/eventHandlers/formDataReceived.ts");
/* harmony import */ var _highlightTab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./highlightTab */ "./src/background/eventHandlers/highlightTab.ts");
/* harmony import */ var _indexUnloaded__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./indexUnloaded */ "./src/background/eventHandlers/indexUnloaded.ts");
/* harmony import */ var _noFlightsFound__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./noFlightsFound */ "./src/background/eventHandlers/noFlightsFound.ts");
/* harmony import */ var _providerReady__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./providerReady */ "./src/background/eventHandlers/providerReady.ts");
/* harmony import */ var _scraperFailed__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./scraperFailed */ "./src/background/eventHandlers/scraperFailed.ts");
/* harmony import */ var _scraperSuccess__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./scraperSuccess */ "./src/background/eventHandlers/scraperSuccess.ts");














/***/ }),

/***/ "./src/background/eventHandlers/indexUnloaded.ts":
/*!*******************************************************!*\
  !*** ./src/background/eventHandlers/indexUnloaded.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleIndexUnloaded": () => (/* binding */ handleIndexUnloaded)
/* harmony export */ });
var handleIndexUnloaded = function handleIndexUnloaded(providerManager) {
  if (providerManager.getFormData()) {
    providerManager.closeWindows();
  }
};

/***/ }),

/***/ "./src/background/eventHandlers/noFlightsFound.ts":
/*!********************************************************!*\
  !*** ./src/background/eventHandlers/noFlightsFound.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleNoFlightsFound": () => (/* binding */ handleNoFlightsFound)
/* harmony export */ });
var handleNoFlightsFound = function handleNoFlightsFound(providerManager, providerName, searchType) {
  providerManager.setSuccessful(providerName, searchType);

  if (providerManager.isComplete(searchType)) {
    providerManager.sendMessageToIndexPage({
      event: "NO_FLIGHTS_FOUND_CLIENT"
    });
    providerManager.closeWindows();
  }
};

/***/ }),

/***/ "./src/background/eventHandlers/providerReady.ts":
/*!*******************************************************!*\
  !*** ./src/background/eventHandlers/providerReady.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleProviderReady": () => (/* binding */ handleProviderReady)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/background/constants.ts");

var handleProviderReady = function handleProviderReady(providerManager, providerName) {
  providerManager.setReady(providerName, true);
  var onReadyFunction = providerManager.getOnReady(providerName);
  onReadyFunction();
  providerManager.setOnReady(providerName, _constants__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_ON_READY_FUNCTION);
};

/***/ }),

/***/ "./src/background/eventHandlers/scraperFailed.ts":
/*!*******************************************************!*\
  !*** ./src/background/eventHandlers/scraperFailed.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleScraperFailed": () => (/* binding */ handleScraperFailed)
/* harmony export */ });
var handleScraperFailed = function handleScraperFailed(providerManager, providerName, errorDescription, searchType) {
  providerManager.setFailed(providerName, searchType);
  providerManager.sendMessageToIndexPage({
    event: "SCRAPER_COMPLETE",
    providerName: providerName,
    status: "FAILED"
  });
  providerManager.closeWindow(providerName);

  if (providerManager.isComplete(searchType)) {
    var flightType = searchType === "BOTH" ? "DEPARTURE" : searchType;
    providerManager.sendMessageToIndexPage({
      event: "SCRAPING_COMPLETED",
      searchType: flightType
    }, 3000);
  } // @ts-ignore


  window.Sentry.captureException(new Error("Scraper (".concat(searchType, ") failed for ").concat(providerName)), {
    extra: providerManager.getFormData(),
    details: errorDescription
  });
};

/***/ }),

/***/ "./src/background/eventHandlers/scraperSuccess.ts":
/*!********************************************************!*\
  !*** ./src/background/eventHandlers/scraperSuccess.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleScraperSuccess": () => (/* binding */ handleScraperSuccess)
/* harmony export */ });
var handleScraperSuccess = function handleScraperSuccess(providerManager, providerName, searchType) {
  providerManager.setSuccessful(providerName, searchType);
  providerManager.sendMessageToIndexPage({
    event: "SCRAPER_COMPLETE",
    providerName: providerName,
    status: "SUCCESS"
  });

  if (providerManager.isComplete(searchType)) {
    var flightType = searchType === "BOTH" ? "DEPARTURE" : searchType;
    providerManager.sendMessageToIndexPage({
      event: "SCRAPING_COMPLETED",
      searchType: flightType
    }, 3000);
  }
};

/***/ }),

/***/ "./src/background/state/ExtensionInstalledHandler.ts":
/*!***********************************************************!*\
  !*** ./src/background/state/ExtensionInstalledHandler.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExtensionInstalledHandler": () => (/* binding */ ExtensionInstalledHandler)
/* harmony export */ });
var ExtensionInstalledHandler = function ExtensionInstalledHandler() {
  chrome.runtime.onInstalled.addListener(function () {
    console.log("Is this thing on?");
  });
};

/***/ }),

/***/ "./src/background/state/ExtensionOpenedHandler.ts":
/*!********************************************************!*\
  !*** ./src/background/state/ExtensionOpenedHandler.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExtensionOpenedHandler": () => (/* binding */ ExtensionOpenedHandler)
/* harmony export */ });
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth */ "./src/auth/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config */ "./src/config.js");
/* harmony import */ var _isExtensionOpen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isExtensionOpen */ "./src/background/state/isExtensionOpen.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var ExtensionOpenedHandler = function ExtensionOpenedHandler() {
  chrome.browserAction.onClicked.addListener(function () {
    disableExtension();
    chrome.identity.getAuthToken({
      interactive: true
    }, /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (token) {
        try {
          var _yield$getSubscriptio = yield (0,_auth__WEBPACK_IMPORTED_MODULE_0__.getSubscriptionValidity)(token),
              status = _yield$getSubscriptio.status;

          if (status) {
            (0,_isExtensionOpen__WEBPACK_IMPORTED_MODULE_2__.isExtensionOpen)({
              extensionOpenCallback: handleExtensionOpen,
              extensionClosedCallback: handleExtensionNotOpen
            });
          } else {
            chrome.tabs.create({
              url: _config__WEBPACK_IMPORTED_MODULE_1__.default
            });
          }
        } catch (_unused) {
          chrome.tabs.create({
            url: _config__WEBPACK_IMPORTED_MODULE_1__.default
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

/***/ }),

/***/ "./src/background/state/ExtensionUninstalledHandler.ts":
/*!*************************************************************!*\
  !*** ./src/background/state/ExtensionUninstalledHandler.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExtensionUninstalledHandler": () => (/* binding */ ExtensionUninstalledHandler)
/* harmony export */ });
var ExtensionUninstalledHandler = function ExtensionUninstalledHandler() {
  chrome.runtime.setUninstallURL("https://forms.gle/s1BfyyBQb5qtXr7H6", function () {
    console.log("Bye");
  });
};

/***/ }),

/***/ "./src/background/state/index.ts":
/*!***************************************!*\
  !*** ./src/background/state/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExtensionInstalledHandler": () => (/* reexport safe */ _ExtensionInstalledHandler__WEBPACK_IMPORTED_MODULE_0__.ExtensionInstalledHandler),
/* harmony export */   "ExtensionOpenedHandler": () => (/* reexport safe */ _ExtensionOpenedHandler__WEBPACK_IMPORTED_MODULE_1__.ExtensionOpenedHandler),
/* harmony export */   "ExtensionUninstalledHandler": () => (/* reexport safe */ _ExtensionUninstalledHandler__WEBPACK_IMPORTED_MODULE_2__.ExtensionUninstalledHandler),
/* harmony export */   "isExtensionOpen": () => (/* reexport safe */ _isExtensionOpen__WEBPACK_IMPORTED_MODULE_3__.isExtensionOpen)
/* harmony export */ });
/* harmony import */ var _ExtensionInstalledHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ExtensionInstalledHandler */ "./src/background/state/ExtensionInstalledHandler.ts");
/* harmony import */ var _ExtensionOpenedHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ExtensionOpenedHandler */ "./src/background/state/ExtensionOpenedHandler.ts");
/* harmony import */ var _ExtensionUninstalledHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ExtensionUninstalledHandler */ "./src/background/state/ExtensionUninstalledHandler.ts");
/* harmony import */ var _isExtensionOpen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isExtensionOpen */ "./src/background/state/isExtensionOpen.ts");





/***/ }),

/***/ "./src/background/state/isExtensionOpen.ts":
/*!*************************************************!*\
  !*** ./src/background/state/isExtensionOpen.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isExtensionOpen": () => (/* binding */ isExtensionOpen)
/* harmony export */ });
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

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// const dev_origin = "http://localhost:4242"
// production origin
var ORIGIN = "https://subscribe.flightpenguin.com";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ORIGIN);

/***/ }),

/***/ "./src/dataModels.js":
/*!***************************!*\
  !*** ./src/dataModels.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeItins": () => (/* binding */ makeItins),
/* harmony export */   "sortFlights": () => (/* binding */ sortFlights),
/* harmony export */   "findReturnFlights": () => (/* binding */ findReturnFlights)
/* harmony export */ });
/* harmony import */ var _shared_nameMaps_airlineMap_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/nameMaps/airlineMap.js */ "./src/shared/nameMaps/airlineMap.js");
/* harmony import */ var _shared_nameMaps_regionalAirlines_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/nameMaps/regionalAirlines.js */ "./src/shared/nameMaps/regionalAirlines.js");
/* harmony import */ var _utilityFunctions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilityFunctions.js */ "./src/utilityFunctions.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
  this.fromTimeDetails = (0,_utilityFunctions_js__WEBPACK_IMPORTED_MODULE_2__.getTimeDetails)(fromTime);
  this.toTimeDetails = (0,_utilityFunctions_js__WEBPACK_IMPORTED_MODULE_2__.getTimeDetails)(toTime);
  var opAirline = operatingAirline ? operatingAirline.replace("Operated by", "").replace("Partially operated by", "") : operatingAirline;
  opAirline = _shared_nameMaps_airlineMap_js__WEBPACK_IMPORTED_MODULE_0__.default.getAirlineName(opAirline);
  var markAirline = _shared_nameMaps_airlineMap_js__WEBPACK_IMPORTED_MODULE_0__.default.getAirlineName(marketingAirline); // operating airline is what is primarily displayed
  // marketing airline is used to create the id

  if (opAirline) {
    var isPartiallyOperated = operatingAirline.includes("Partially operated by");

    if ((0,_shared_nameMaps_regionalAirlines_js__WEBPACK_IMPORTED_MODULE_1__.default)(opAirline) || isPartiallyOperated) {
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
  this.durationMinutes = (0,_utilityFunctions_js__WEBPACK_IMPORTED_MODULE_2__.convertDurationToMinutes)(duration);
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
      return _shared_nameMaps_airlineMap_js__WEBPACK_IMPORTED_MODULE_0__.default.getAirlineName(airline.replace("  ", " "));
    }).join(", ");
  }

  return _shared_nameMaps_airlineMap_js__WEBPACK_IMPORTED_MODULE_0__.default.getAirlineDetails(shortAirlineName.replace("  ", " "));
}

Flight.prototype.calculateTimezoneOffset = function () {
  var _this = this;

  var totalTimezoneOffset = 0;

  if (!this.layovers.length) {
    totalTimezoneOffset = (0,_utilityFunctions_js__WEBPACK_IMPORTED_MODULE_2__.getTimezoneOffset)(this.fromTime, this.toTime, this.duration);
  } else {
    var layovers = this.layovers.map(function (_ref, idx) {
      var fromTime = _ref.fromTime,
          toTime = _ref.toTime,
          duration = _ref.duration,
          operatingAirline = _ref.operatingAirline;
      totalTimezoneOffset += (0,_utilityFunctions_js__WEBPACK_IMPORTED_MODULE_2__.getTimezoneOffset)(fromTime, toTime, duration);
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
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
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



/***/ }),

/***/ "./src/expedia/mappings/cabin.ts":
/*!***************************************!*\
  !*** ./src/expedia/mappings/cabin.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cabinMap": () => (/* binding */ cabinMap)
/* harmony export */ });
var cabinMap = {
  econ: "economy",
  prem_econ: "premium_economy",
  business: "business",
  first: "first"
};

/***/ }),

/***/ "./src/expedia/mappings/getUrl.ts":
/*!****************************************!*\
  !*** ./src/expedia/mappings/getUrl.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUrl": () => (/* binding */ getUrl)
/* harmony export */ });
/* harmony import */ var _cabin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cabin */ "./src/expedia/mappings/cabin.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


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
  url += "cabinclass:".concat(_cabin__WEBPACK_IMPORTED_MODULE_0__.cabinMap[cabin || "econ"], ",");
  url += "maxhops:1,nopenalty:N&pageId=0";
  return url;
};

var formatDate = function formatDate(dateString) {
  var _dateString$split = dateString.split("-"),
      _dateString$split2 = _slicedToArray(_dateString$split, 3),
      year = _dateString$split2[0],
      month = _dateString$split2[1],
      day = _dateString$split2[2];

  return [month, day, year].join("/");
};

/***/ }),

/***/ "./src/kiwi/mappings/cabin.ts":
/*!************************************!*\
  !*** ./src/kiwi/mappings/cabin.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cabinMap": () => (/* binding */ cabinMap)
/* harmony export */ });
var cabinMap = {
  econ: "ECONOMY",
  prem_econ: "PREMIUM_ECONOMY",
  business: "BUSINESS",
  first: "FIRST_CLASS"
};

/***/ }),

/***/ "./src/kiwi/mappings/getUrl.ts":
/*!*************************************!*\
  !*** ./src/kiwi/mappings/getUrl.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUrl": () => (/* binding */ getUrl)
/* harmony export */ });
/* harmony import */ var _cabin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cabin */ "./src/kiwi/mappings/cabin.ts");

var getUrl = function getUrl(formData) {
  var from = formData.from,
      to = formData.to,
      fromDate = formData.fromDate,
      toDate = formData.toDate,
      numPax = formData.numPax,
      cabin = formData.cabin,
      roundtrip = formData.roundtrip;
  var returnDate = roundtrip ? toDate : "no-return";
  var cabinValue = _cabin__WEBPACK_IMPORTED_MODULE_0__.cabinMap[formData.cabin || "econ"];
  return "https://www.kiwi.com/us/search/results/".concat(from, "/").concat(to, "/").concat(fromDate, "/").concat(returnDate, "?adults=").concat(numPax, "&cabinClass=").concat(cabinValue, "-false&returnFromDifferentAirport=false&returnToDifferentAirport=false");
};

/***/ }),

/***/ "./src/shared/focusTab.ts":
/*!********************************!*\
  !*** ./src/shared/focusTab.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "focusTab": () => (/* binding */ focusTab)
/* harmony export */ });
var focusTab = function focusTab(windowId, tabId) {
  chrome.windows.update(windowId, {
    focused: true
  }, function (win) {
    chrome.tabs.update(tabId, {
      selected: true
    });
  });
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

/***/ "./src/shared/nameMaps/regionalAirlines.js":
/*!*************************************************!*\
  !*** ./src/shared/nameMaps/regionalAirlines.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var regionalAirlines = ["Aer Lingus Regional", "Aeromexico Connect", "SkyWest", "Alaska Horizon", "Horizon Air", "Alitalia CityLiner", "Air Canada Express", "Air New Zealand Link", "American Eagle", "Delta Connection", "Fiji Link", "HOP!", "Iberia Regional", "KLM Cityhopper", "Lufthansa Regional", "Moçambique Expresso", "Ohana by Hawaiian", "PAL Express", "QantasLink", "South African Express", "TAP Express", "Tunisair Express", "United Express", "Virgin Australia Regional Airlines", "WestJet Encore", "WestJet Link"];

function isRegionalAirline(airline) {
  var airlineTarget = airline.toLowerCase();
  var found = regionalAirlines.find(function (regional) {
    return airlineTarget.includes(regional.toLowerCase());
  });
  return Boolean(found);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isRegionalAirline);

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

/***/ "./src/skyscanner/mappings/cabin.ts":
/*!******************************************!*\
  !*** ./src/skyscanner/mappings/cabin.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cabinMap": () => (/* binding */ cabinMap)
/* harmony export */ });
var cabinMap = {
  econ: "economy",
  prem_econ: "premiumeconomy",
  business: "business",
  first: "first"
};

/***/ }),

/***/ "./src/skyscanner/mappings/getUrl.ts":
/*!*******************************************!*\
  !*** ./src/skyscanner/mappings/getUrl.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUrl": () => (/* binding */ getUrl)
/* harmony export */ });
/* harmony import */ var _cabin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cabin */ "./src/skyscanner/mappings/cabin.ts");

var getUrl = function getUrl(formData) {
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

  return "".concat(url, "?adults=").concat(numPax, "&children=0&adultsv2=").concat(numPax, "&childrenv2=&infants=0&cabinclass=").concat(_cabin__WEBPACK_IMPORTED_MODULE_0__.cabinMap[cabin || "econ"]);
};

/***/ }),

/***/ "./src/southwest/mappings/getUrl.ts":
/*!******************************************!*\
  !*** ./src/southwest/mappings/getUrl.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUrl": () => (/* binding */ getUrl)
/* harmony export */ });
var getUrl = function getUrl(formData) {
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
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _background_eventHandlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./background/eventHandlers */ "./src/background/eventHandlers/index.ts");
/* harmony import */ var _background_ProviderManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./background/ProviderManager */ "./src/background/ProviderManager.ts");
/* harmony import */ var _background_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./background/state */ "./src/background/state/index.ts");
Sentry.init({
  dsn: "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451"
}); // debugger and console logs can be seen by clicking background.js link for this extension under chrome://extensions,
// it will open a developer console for this extension and in addition to logs you can see the local storage




(0,_background_state__WEBPACK_IMPORTED_MODULE_2__.ExtensionUninstalledHandler)();
(0,_background_state__WEBPACK_IMPORTED_MODULE_2__.ExtensionInstalledHandler)();
(0,_background_state__WEBPACK_IMPORTED_MODULE_2__.ExtensionOpenedHandler)();
var providerManager = new _background_ProviderManager__WEBPACK_IMPORTED_MODULE_1__.ProviderManager();
chrome.runtime.onMessage.addListener(function (message, sender, reply) {
  console.debug(message);

  switch (message.event) {
    case "FORM_DATA_RECEIVED":
      (0,_background_eventHandlers__WEBPACK_IMPORTED_MODULE_0__.handleFormDataReceived)(providerManager, message.formData, message.windowConfig);
      break;

    case "NO_FLIGHTS_FOUND":
      (0,_background_eventHandlers__WEBPACK_IMPORTED_MODULE_0__.handleNoFlightsFound)(providerManager, message.provider, message.searchType);
      break;

    case "SUCCESSFUL_SCRAPER":
      (0,_background_eventHandlers__WEBPACK_IMPORTED_MODULE_0__.handleScraperSuccess)(providerManager, message.providerName, message.searchType);
      break;

    case "FAILED_SCRAPER":
      (0,_background_eventHandlers__WEBPACK_IMPORTED_MODULE_0__.handleScraperFailed)(providerManager, message.providerName, message.description, message.searchType);
      break;

    case "FLIGHT_RESULTS_RECEIVED":
      (0,_background_eventHandlers__WEBPACK_IMPORTED_MODULE_0__.handleFlightResultsReceived)(providerManager, message.flights, message.provider);
      break;

    case "RETURN_FLIGHTS_RECEIVED":
      (0,_background_eventHandlers__WEBPACK_IMPORTED_MODULE_0__.handleFlightReturnResultsReceived)(providerManager, message.flights, message.provider);
      break;

    case "DEPARTURE_SELECTED":
      (0,_background_eventHandlers__WEBPACK_IMPORTED_MODULE_0__.handleDepartureSelected)(providerManager, message.departureId);
      break;

    case "HIGHLIGHT_TAB":
      (0,_background_eventHandlers__WEBPACK_IMPORTED_MODULE_0__.handleHighlightTab)(providerManager, message.selectedDepartureId, message.selectedReturnId);
      break;

    case "SEND_BEGIN_EVENT":
      (0,_background_eventHandlers__WEBPACK_IMPORTED_MODULE_0__.handleDispatchBeginParsing)(providerManager, message.provider, 2000);
      break;

    case "PROVIDER_READY":
      (0,_background_eventHandlers__WEBPACK_IMPORTED_MODULE_0__.handleProviderReady)(providerManager, message.provider);
      break;

    case "FOCUS_WEBPAGE":
      (0,_background_eventHandlers__WEBPACK_IMPORTED_MODULE_0__.handleFocusWebpage)(providerManager);
      break;

    case "CLEAR_SELECTIONS":
      (0,_background_eventHandlers__WEBPACK_IMPORTED_MODULE_0__.handleClearSelections)(providerManager);
      break;

    case "INDEX_UNLOAD":
      (0,_background_eventHandlers__WEBPACK_IMPORTED_MODULE_0__.handleIndexUnloaded)(providerManager);
      break;

    default:
      window.Sentry.captureException(new Error(message));
      console.error(message);
      break;
  }
});
})();

/******/ })()
;