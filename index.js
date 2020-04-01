let totalFlights = 0;
const headerContainer = document.querySelector(".header");
const subheaderContainer = document.querySelector(".subheader");
const departuresContainer = document.querySelector(".departures");

const returnsContainer = document.querySelector(".returns");

chrome.runtime.onMessage.addListener(function(message) {
  switch (message.event) {
    case "FLIGHT_RESULTS_FOR_CLIENT":
      console.log(message.event);
      const {
        flights: { departureList, returnList },
        formData,
        tabId
      } = message;
      const departures = createNodeList(departureList, tabId);
      const returns = createNodeList(returnList, tabId);
      const header = createHeader(formData);
      totalFlights += departureList.length + returnList.length;

      // move these to variables to prevent over-querying
      headerContainer.textContent = header;
      subheaderContainer.textContent = `${totalFlights} flights found.`;
      departuresContainer.append(departures);
      returnsContainer.append(returns);
      break;
    default:
      break;
  }
});

let selections = [];

function createNodeList(list, tabId) {
  const listNode = document.createDocumentFragment();
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

function createHeader(formData) {
  const { from, to, fromDate, toDate, cabin, numPax } = formData;
  return `${from}-${to} ${fromDate} to ${toDate} ${cabin} ${numPax} adults`;
}

function handleClick(e) {
  const { tabId, id } = e.currentTarget.dataset;
  e.currentTarget.style.border = "10px solid tomato";
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
