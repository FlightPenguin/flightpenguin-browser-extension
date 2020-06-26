Sentry.init({
  dsn:
    "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451",
});
const GA_TRACKING_ID = "164337457-1";

(function (i, s, o, g, r, a, m) {
  i["GoogleAnalyticsObject"] = r;
  (i[r] =
    i[r] ||
    function () {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(
  window,
  document,
  "script",
  "https://www.google-analytics.com/analytics.js",
  "ga"
); // Note: https protocol here

ga("create", "UA-" + GA_TRACKING_ID, "auto"); // Enter your GA identifier
ga("set", "checkProtocolTask", function () {}); // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
ga("set", "transport", "beacon");
ga("require", "displayfeatures");
ga("send", "pageview", "/popup.html"); // Specify the virtual path

const today = new Date();
const todayString = [
  today.getFullYear(),
  `${today.getMonth() + 1}`.padStart(2, "0"),
  `${today.getDate()}`.padStart(2, "0"),
].join("-");
const fromDateInput = document.querySelector("#fromDateInput");
const toDateInput = document.querySelector("#toDateInput");

fromDateInput.min = todayString;
fromDateInput.value = todayString;
toDateInput.min = todayString;

const roundtripElement = document.querySelector("#roundtrip");
roundtripElement.checked = "true";
toDateInput.required = true;

roundtripElement.addEventListener("change", (e) => {
  const toDateLabel = document.getElementById("toDate");
  if (e.target.checked) {
    toDateLabel.style.display = null;
    toDateInput.required = true;
  } else {
    toDateLabel.style.display = "none";
    toDateInput.required = false;
  }
});

document.querySelectorAll("input[type=text]").forEach((el) => {
  el.addEventListener("input", (e) => {
    if (e.target.value === "Example:") {
      e.target.value = e.target.list.textContent.trim();
    }
  });
});

// document.querySelectorAll("input[type='radio']").forEach((el) => {
//   el.addEventListener("change", (e) => {
//     if (e.target.value === "price") {
//       document.querySelector("#sources").style.display = null;
//     } else {
//       document.querySelector("#sources").style.display = "none";
//     }
//   });
// });

fromDateInput.addEventListener("change", (e) => {
  const toDate = document.querySelector("#toDateInput");
  toDate.min = e.target.value;
});

document.querySelector("form#search").addEventListener("submit", (e) => {
  e.preventDefault();

  // if (
  //   e.target.price.checked &&
  //   !e.target.southwest.checked &&
  //   !e.target.skyscanner.checked
  // ) {
  //   const node = document.querySelector(".validation-error");
  //   node.textContent = "Please select a provider to continue";
  //   return;
  // }

  e.target.button.disabled = true;

  const formData = {
    from: e.target.from.value,
    to: e.target.to.value,
    southwest: e.target.price.checked ? true : false,
    skyscanner: e.target.price.checked ? true : false,
    cabin: e.target.cabin.value,
    fromDate: e.target.fromDate.value,
    toDate: e.target.toDate ? e.target.toDate.value : "",
    numPax: Number(e.target.numPax.value),
    roundtrip: e.target.roundtrip.checked,
    searchByPoints: e.target.points.checked,
    searchByPrice: e.target.price.checked,
  };

  for (const [eventAction, eventLabel] of Object.entries(formData)) {
    ga("send", {
      hitType: "event",
      eventCategory: "search form",
      eventAction,
      eventLabel,
    });
  }
  chrome.runtime.sendMessage({ event: "FORM_DATA_RECEIVED", formData });
  // remove form so we can show loading state
  // e.target.remove();
  document.querySelectorAll("fieldset").forEach((el) => (el.disabled = "true"));
  document.getElementById("ellipsis").style.display = "flex";
  document.getElementById("search-button-text").textContent = "Searching";
});
