let totalFlights = 0;
let allItins = {};
let selections = [];

const headerContainer = document.querySelector(".header");
const subheaderContainer = document.querySelector(".subheader");
const departuresContainer = document.querySelector(".departures");
const returnsSection = document.querySelector(".returns-section");
const returnsContainer = document.querySelector(".returns");

chrome.runtime.onMessage.addListener(function(message) {
  console.log(message.event, message);

  switch (message.event) {
    case "FLIGHT_RESULTS_FOR_CLIENT":
      const {
        flights: { departureList, itins },
        formData
      } = message;
      allItins = { ...allItins, ...itins };
      const departures = createNodeList(departureList, itins);
      const header = createHeader(formData);
      totalFlights += departureList.length;

      // move these to variables to prevent over-querying
      headerContainer.textContent = header;
      subheaderContainer.textContent = `${totalFlights} flights found.`;
      departuresContainer.append(departures);
      break;
    case "RETURN_FLIGHTS":
      const returns = createNodeList(message.flights.returnList, allItins);
      returnsContainer.innerHTML = "";
      returnsContainer.append(returns);
      returnsSection.style.display = "block";
      // scroll to Returns section
      window.scroll(
        0,
        window.pageYOffset + returnsContainer.getBoundingClientRect().top
      );
      break;
    default:
      break;
  }
});

function createNodeList(list, itins) {
  const listNode = document.createDocumentFragment();
  list.forEach(item => {
    const node = document.createElement("li");
    node.addEventListener("click", handleClick);

    let airline = item.airline;
    let fromTime;
    let toTime;
    if (airline !== "Southwest") {
      fromTime = new Date(item.fromTime);
      fromTime = fromTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      });
      toTime = new Date(item.toTime);
      toTime = toTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      });
    } else {
      fromTime = item.fromTime;
      toTime = item.toTime;
    }
    let duration = item.duration;

    let fares = item.itinIds.map(
      itinId =>
        `${itins[itinId].provider} ${itins[itinId].currency}${itins[itinId].fare}`
    );
    [airline, fromTime, toTime, duration, fares[0]].forEach(value => {
      const span = document.createElement("span");
      span.textContent = value;
      node.append(span);
    });
    node.dataset.id = item.id;
    listNode.append(node);
  });
  return listNode;
}

function createHeader(formData) {
  const { from, to, fromDate, toDate, cabin, numPax } = formData;
  return `${from}-${to} ${fromDate} to ${toDate} ${cabin} ${numPax} adults`;
}
let flightsNotSelected;
function handleClick(e) {
  const selectedNode = e.currentTarget;
  selectedNode.style.border = "10px solid tomato";
  selectedNode.dataset.selected = "true";
  selections.push(selectedNode);

  if (selections.length === 1) {
    chrome.runtime.sendMessage({
      event: "DEPARTURE_SELECTED",
      departureId: selectedNode.dataset.id
    });
    flightsNotSelected = Array.from(
      departuresContainer.querySelectorAll("li:not([data-selected='true'])")
    );
    flightsNotSelected.forEach(flight => (flight.style.display = "none"));
  } else if (selections.length === 2) {
    const selectionIds = selections.map(sel => sel.dataset.id);
    const itin = allItins[selectionIds.join("-")];

    chrome.runtime.sendMessage({
      event: "HIGHLIGHT_TAB",
      tabId: itin.tabId,
      provider: itin.provider,
      selectedDepartureId: selectionIds[0],
      selectedReturnId: selectionIds[1]
    });
    // reset selections and DOM
    selections.forEach(sel => {
      sel.style.border = "";
      sel.dataset.selected = "false";
    });
    flightsNotSelected.forEach(flight => (flight.style.display = "flex"));
    returnsSection.style.display = "none";
    returnsContainer.innerHTML = "";
    selections = [];
  }
}
