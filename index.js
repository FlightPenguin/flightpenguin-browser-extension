let totalFlights = 0;
let allItins = {};
const headerContainer = document.querySelector(".header");
const subheaderContainer = document.querySelector(".subheader");
const departuresContainer = document.querySelector(".departures");

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
      returnsContainer.append(returns);
      document.querySelector(".returns-section").style.display = "block";
      break;
    default:
      break;
  }
});

let selections = [];

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

function handleClick(e) {
  const { id } = e.currentTarget.dataset;
  e.currentTarget.style.border = "10px solid tomato";
  selections.push(id);

  if (selections.length === 1) {
    chrome.runtime.sendMessage({
      event: "DEPARTURE_SELECTED",
      departureId: id
    });
  } else if (selections.length === 2) {
    const itin = allItins[selections.join("-")];

    chrome.runtime.sendMessage({
      event: "HIGHLIGHT_TAB",
      tabId: itin.tabId,
      provider: itin.provider,
      selectedDepartureId: selections[0],
      selectedReturnId: selections[1]
    });
    selections = [];
  }
}
