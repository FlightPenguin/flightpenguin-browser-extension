// debuggers and console logs can be found by right clicking extension button in browser toolbar, then click "Inspect popup"
document.querySelector("#roundtrip").addEventListener("change", (e) => {
  if (e.target.checked) {
    const toDateLabel = document.querySelector("#toDate");
    toDateLabel.style.display = null;
    toDateLabel.children.toDate.required = true;
  } else {
    const toDateLabel = document.querySelector("#toDate");
    toDateLabel.style.display = "none";
    toDateLabel.children.toDate.required = false;
  }
});
document.querySelector("#fromDateInput").addEventListener("change", (e) => {
  const toDate = document.querySelector("#toDateInput");
  toDate.value = e.target.value;
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
