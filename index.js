const res = localStorage.getItem("flight_results");
const { flights, tabId } = JSON.parse(res)[0];
const container = document.createElement("main");
container.addEventListener("click", () => {
  // if someone moved the tab around this would break,
  // so could instead pass tabId and query for its index
  chrome.runtime.sendMessage({ event: "HIGHLIGHT_TAB", tabId });
});
container.textContent = res;
document.body.append(container);
