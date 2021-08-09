export const addBackToSearchButton = (backToSearchSelector = "#back-to-search") => {
  if (document.querySelector(backToSearchSelector)) {
    return;
  }
  const button = document.createElement("button");
  button.id = "back-to-search";
  button.textContent = "Return to FlightPenguin";
  button.title = "Click to return to FlightPenguin and keep browsing.";
  button.addEventListener("click", handleBackToSearchButtonClick);
  document.body.append(button);
};

function handleBackToSearchButtonClick() {
  chrome.runtime.sendMessage({
    event: "FOCUS_WEBPAGE",
  });
}
