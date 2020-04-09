// debuggers and console logs can be found by right clicking extension button in browser toolbar, then click "Inspect popup"
document.querySelector("form#search").addEventListener("submit", (e) => {
  e.preventDefault();

  if (!e.target.southwest.checked && !e.target.priceline.checked) {
    const node = document.querySelector(".validation-error");
    node.textContent = "Please select a provider to continue";
    return;
  }

  e.target.button.disabled = true;

  const formData = {
    from: e.target.from.value,
    to: e.target.to.value,
    southwest: e.target.southwest.checked,
    // priceline: e.target.priceline.checked,
    skyscanner: e.target.skyscanner.checked,
    cabin: e.target.cabin.value,
    fromDate: e.target.fromDate.value,
    toDate: e.target.toDate.value,
    numPax: Number(e.target.numPax.value),
    // add oneway roundtrip selections
  };
  chrome.runtime.sendMessage({ event: "FORM_DATA_RECEIVED", formData });
});
