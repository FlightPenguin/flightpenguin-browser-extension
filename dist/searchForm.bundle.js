/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

Sentry.init({
  dsn: "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451"
});
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
ga("send", "pageview", "/popup.html"); // Specify the virtual path

var today = new Date();
var todayString = [today.getFullYear(), "".concat(today.getMonth() + 1).padStart(2, "0"), "".concat(today.getDate()).padStart(2, "0")].join("-");
var fromDateInput = document.querySelector("#fromDateInput");
var toDateInput = document.querySelector("#toDateInput");
fromDateInput.min = todayString;
fromDateInput.value = todayString;
toDateInput.min = todayString;
var roundtripElement = document.querySelector("#roundtrip");
roundtripElement.checked = "true";
toDateInput.required = true;
roundtripElement.addEventListener("change", function (e) {
  var toDateLabel = document.getElementById("toDate");

  if (e.target.checked) {
    toDateLabel.style.display = null;
    toDateInput.required = true;
  } else {
    toDateLabel.style.display = "none";
    toDateInput.required = false;
  }
});
document.querySelectorAll("input[type=text]").forEach(function (el) {
  el.addEventListener("input", function (e) {
    if (e.target.value === "Exa") {
      e.target.value = e.target.list.textContent.trim();
    }
  });
});
document.querySelectorAll("input[type='radio']").forEach(function (el) {
  el.addEventListener("change", function (e) {
    if (e.target.value === "points") {
      document.getElementById("chase").classList.remove("hide");
    } else {
      document.getElementById("chase").classList.add("hide");
    }
  });
});
fromDateInput.addEventListener("change", function (e) {
  var toDate = document.querySelector("#toDateInput");
  toDate.min = e.target.value;
});
document.querySelector("form#search").addEventListener("submit", function (e) {
  e.preventDefault();
  var formData = {
    from: e.target.from.value,
    to: e.target.to.value,
    cabin: e.target.cabin.value,
    fromDate: e.target.fromDate.value,
    toDate: e.target.toDate ? e.target.toDate.value : "",
    numPax: Number(e.target.numPax.value),
    roundtrip: e.target.roundtrip.checked,
    searchByPoints: e.target.points.checked,
    searchByPrice: e.target.price.checked,
    pointsValue: e.target.points.checked ? e.target.chase.value : null
  };

  for (var _i = 0, _Object$entries = Object.entries(formData); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        eventAction = _Object$entries$_i[0],
        eventLabel = _Object$entries$_i[1];

    ga("send", {
      hitType: "event",
      eventCategory: "search form",
      eventAction: eventAction,
      eventLabel: eventLabel
    });
  }

  setFormLoading();
  var windowConfig = {
    height: window.outerHeight,
    width: window.outerWidth,
    left: window.screenX,
    top: window.screenY
  };
  chrome.runtime.sendMessage({
    event: "FORM_DATA_RECEIVED",
    formData: formData,
    windowConfig: windowConfig
  });
});

function setFormLoading() {
  document.getElementById("search-button").disabled = true;
  document.querySelectorAll("fieldset").forEach(function (el) {
    return el.disabled = true;
  });
  document.getElementById("ellipsis").style.display = "flex";
  document.getElementById("search-button-text").textContent = "Searching";
  document.querySelector(".validation-error").textContent = "";
}

function setFormReady() {
  document.getElementById("search-button").disabled = false;
  document.querySelectorAll("fieldset").forEach(function (el) {
    return el.disabled = false;
  });
  document.getElementById("ellipsis").style.display = "none";
  document.getElementById("search-button-text").textContent = "Search";
}

chrome.runtime.onMessage.addListener(function (message) {
  console.log(message.event, message);

  switch (message.event) {
    case "NO_FLIGHTS_FOUND_CLIENT":
      // update messaging on form
      // undisable form
      setFormReady();
      document.querySelector(".validation-error").textContent = "Sorry, no results were found for those dates and locations.";
      break;

    case "FAILED_SCRAPER_CLIENT":
      setFormReady();
      document.querySelector(".validation-error").textContent = "Sorry, something happened, please try searching again.";
      ga("send", {
        hitType: "event",
        eventCategory: "failed scraper",
        eventAction: message.source,
        eventLabel: message.description
      });
      break;

    default:
      break;
  }
});
/******/ })()
;