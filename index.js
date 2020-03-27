const res = localStorage.getItem("flight_results");
const { flights, tabId, formData } = JSON.parse(res)[0];
const { departureList, returnList } = flights;
let selections = [];

function createNodeList(list) {
  const listNode = document.createElement("ul");
  list.forEach(item => {
    const node = document.createElement("li");
    node.addEventListener("click", handleClick);
    Object.values(item).forEach(value => {
      const span = document.createElement("span");
      span.textContent = value;
      node.append(span);
    });
    node.dataset.tabId = tabId;
    node.dataset.id = item.id;
    listNode.append(node);
  });
  return listNode;
}
const departures = createNodeList(departureList);
const returns = createNodeList(returnList);

const { from, to, fromDate, toDate, cabin, numPax } = formData;
const headline = `${from}-${to} ${fromDate} to ${toDate} ${cabin} ${numPax} adults`;
document.querySelector(".header").append(headline);
document.querySelector(".departures").append(departures);
document.querySelector(".returns").append(returns);

function handleClick(e) {
  const { tabId, id } = e.currentTarget.dataset;
  selections.push(id);

  if (selections.length === 2) {
    chrome.runtime.sendMessage({
      event: "HIGHLIGHT_TAB",
      tabId: Number(tabId),
      selectedDepartureId: selections[0],
      selectedReturnId: selections[1]
    });
    selections = [];
  }
}
