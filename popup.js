// debuggers and console logs can be found by right clicking extension button in browser toolbar, then click "Inspect popup"
const today = new Date();
const todayString = [
  today.getFullYear(),
  `${today.getMonth() + 1}`.padStart(2, "0"),
  `${today.getDate()}`.padStart(2, "0"),
].join("-");
const fromDateInput = document.querySelector("#fromDateInput");
fromDateInput.min = todayString;
fromDateInput.value = todayString;

document.querySelector("#roundtrip").addEventListener("change", (e) => {
  const toDateLabel = document.querySelector("#toDate");
  const toDateInput = toDateLabel.children.toDate;

  if (e.target.checked) {
    toDateLabel.style.display = null;
    toDateInput.required = true;
  } else {
    toDateLabel.style.display = "none";
    toDateInput.required = false;
  }
});

fromDateInput.addEventListener("change", (e) => {
  const toDate = document.querySelector("#toDateInput");
  toDate.min = e.target.value;
});

document.querySelector("form#search").addEventListener("submit", (e) => {
  e.preventDefault();

  if (!e.target.southwest.checked && !e.target.skyscanner.checked) {
    const node = document.querySelector(".validation-error");
    node.textContent = "Please select a provider to continue";
    return;
  }

  e.target.button.disabled = true;

  const formData = {
    from: e.target.from.value,
    to: e.target.to.value,
    southwest: e.target.southwest.checked,
    skyscanner: e.target.skyscanner.checked,
    cabin: e.target.cabin.value,
    fromDate: e.target.fromDate.value,
    toDate: e.target.toDate ? e.target.toDate.value : "",
    numPax: Number(e.target.numPax.value),
    roundtrip: e.target.roundtrip.checked,
  };
  chrome.runtime.sendMessage({ event: "FORM_DATA_RECEIVED", formData });

  e.target.remove();
  document.querySelector("#loading").style.display = "flex";
});
