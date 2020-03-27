const res = localStorage.getItem("flight_results");
const { flights, tabId } = JSON.parse(res)[0];
const container = document.createElement("main");
container.addEventListener("click", () => {
  chrome.runtime.sendMessage({ event: "HIGHLIGHT_TAB", tabId });
});
container.textContent = res;
document.body.append(container);
