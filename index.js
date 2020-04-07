let totalFlights = 0;
let allItins = {};
let selections = [];
const timeBarContainerWidth = 600;

const headerContainer = document.querySelector(".header");
const subheaderContainer = document.querySelector(".subheader");

const departuresContainer = document.querySelector(".departures-content");
const depListNode = document.querySelector(".departures-list");

const returnsSection = document.querySelector(".returns-section");
const returnsContainer = document.querySelector(".returns-content");
const retListNode = document.querySelector(".returns-list");

const depTimeBarContainer = document.querySelector(
  ".departures-time-bar-container"
);
const retTimeBarContainer = document.querySelector(
  ".returns-time-bar-container"
);

chrome.runtime.onMessage.addListener(function (message) {
  console.log(message.event, message);

  switch (message.event) {
    case "RESET_SEARCH":
      totalFlights = 0;
      allItins = {};
      selections = [];
      depListNode.innerHTML = "";
      depTimeBarContainer.innerHTML = "";
      returnsSection.style.display = "none";
      subheaderContainer.innerHTML = "";

      headerContainer.textContent = createHeader(message.formData);

      break;
    case "FLIGHT_RESULTS_FOR_CLIENT":
      const {
        flights: { departureList, itins },
        formData,
      } = message;
      allItins = { ...allItins, ...itins };

      createNodeList(departureList, itins, depListNode);
      createTimeBars(departureList, depTimeBarContainer);

      const header = createHeader(formData);
      totalFlights += departureList.length;

      headerContainer.textContent = header;
      subheaderContainer.textContent = `${totalFlights} flights found.`;
      break;
    case "RETURN_FLIGHTS":
      const { returnList } = message.flights;
      createNodeList(returnList, allItins, retListNode);
      createTimeBars(returnList, retTimeBarContainer);

      returnsSection.style.display = "block";
      // scroll to Returns section
      window.scroll(
        0,
        window.pageYOffset + returnsSection.getBoundingClientRect().top
      );
      break;
    default:
      break;
  }
});

function createNodeList(list, itins, containerNode) {
  list.forEach((item) => {
    const node = document.createElement("li");
    node.addEventListener("click", handleClick);

    let airline = item.airline.display;
    let { fromTime, toTime } = getTimes(item);
    let duration = item.duration;

    let fares = item.itinIds.map(
      (itinId) => `${itins[itinId].currency}${itins[itinId].fare}`
    );
    [fromTime, toTime, duration, airline, fares[0]].forEach((value) => {
      const span = document.createElement("span");
      span.textContent = value;
      node.append(span);
    });
    node.dataset.id = item.id;
    containerNode.append(node);
  });
}

function getTimes(flight) {
  let fromTime;
  let toTime;
  if (flight.fromTime.includes("T")) {
    fromTime = new Date(flight.fromTime);
    fromTime = fromTime.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    toTime = new Date(flight.toTime);
    toTime = toTime.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  } else {
    fromTime = flight.fromTime;
    toTime = flight.toTime;
  }
  return { fromTime, toTime };
}

function createHeader(formData) {
  const { from, to, fromDate, toDate, cabin, numPax } = formData;
  return `${from}-${to} ${fromDate} to ${toDate} ${cabin} ${numPax} adults`;
}
let flightsNotSelected;
function handleClick(e) {
  const selectedNode = e.currentTarget;
  selectedNode.dataset.selected = "true";
  selections.push(selectedNode);

  if (selections.length === 1) {
    chrome.runtime.sendMessage({
      event: "DEPARTURE_SELECTED",
      departureId: selectedNode.dataset.id,
    });
    flightsNotSelected = Array.from(
      departuresContainer.querySelectorAll("li:not([data-selected='true'])")
    );
    flightsNotSelected.forEach((flight) => (flight.style.display = "none"));
    depTimeBarContainer.style.display = "none";
  } else if (selections.length === 2) {
    const selectionIds = selections.map((sel) => sel.dataset.id);
    const itin = allItins[selectionIds.join("-")];

    chrome.runtime.sendMessage({
      event: "HIGHLIGHT_TAB",
      tabId: itin.tabId,
      provider: itin.provider,
      selectedDepartureId: selectionIds[0],
      selectedReturnId: selectionIds[1],
    });
    // reset selections and DOM
    selections.forEach((sel) => {
      sel.style.border = "";
      sel.dataset.selected = "false";
    });
    flightsNotSelected.forEach((flight) => (flight.style.display = "flex"));
    depTimeBarContainer.style.display = "block";
    returnsSection.style.display = "none";
    retListNode.innerHTML = "";
    retTimeBarContainer.innerHTML = "";
    selections = [];
  }
}

function createTimeBarHeader(timeBarContainer) {
  const timeBarContainerHeader = document.createElement("div");
  timeBarContainerHeader.style.position = "relative";
  timeBarContainerHeader.style.height = "30px";

  const intervals = ["12am", "6am", "12pm", "6pm", "12am"];
  const intervalWidth = timeBarContainerWidth / (intervals.length - 1);

  for (let [index, interval] of intervals.entries()) {
    const intervalNode = document.createElement("div");

    intervalNode.style.position = "absolute";
    intervalNode.innerText = interval;
    intervalNode.style.left = intervalWidth * index + "px";

    timeBarContainerHeader.append(intervalNode);
  }

  timeBarContainer.append(timeBarContainerHeader);
}

function createTimeBars(flights, timeBarContainer) {
  const timeBarTempContainer = document.createDocumentFragment();

  if (!timeBarContainer.children.length) {
    timeBarContainer.style.width = timeBarContainerWidth + "px";
    createTimeBarHeader(timeBarContainer);
  }

  for (let flight of flights) {
    const timeBarRow = document.createElement("div");

    const { timeBarWidth, startPositionPx } = createIndividualTimeBarPosition(
      flight
    );

    let { fromTime, toTime } = getTimes(flight);
    timeBarRow.title = `${flight.airline.display} ${fromTime}-${toTime}`;
    timeBarRow.style.width = `${timeBarWidth}px`;
    timeBarRow.style.height = "30px";
    timeBarRow.style.marginLeft = `${startPositionPx}px`;
    timeBarRow.style.backgroundColor = flight.airline.color;

    timeBarTempContainer.append(timeBarRow);
  }

  timeBarContainer.append(timeBarTempContainer);
}

function getHoursMinutes(timeString) {
  let timeStringFormatted = timeString;
  if (timeStringFormatted.includes("T")) {
    timeStringFormatted = new Date(timeStringFormatted);
    timeStringFormatted = timeStringFormatted.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }
  console.log(timeStringFormatted);
  let newHours;
  const [hours, minutes] = timeStringFormatted
    .replace(/(PM)|(AM)/, "")
    .trim()
    .split(":");
  let oldTimeString = timeStringFormatted.toLowerCase();
  if (oldTimeString.includes("am")) {
    if (hours == "12") {
      newHours = 0;
    } else {
      newHours = Number(hours);
    }
  } else if (oldTimeString.includes("pm")) {
    newHours = Number(hours);
    if (hours !== "12") {
      newHours += 12;
    }
  }
  console.log("hours", newHours, "min", minutes);
  return { hours: newHours, minutes: Number(minutes) };
}

function createIndividualTimeBarPosition(flight) {
  /**
   * 1. Intervals [12am, 6am, 12pm, 6pm, 12am]
   * 2. IntervalPX[0px, 100px, 200px, 300px, 400px]
   * 400 px / 24 hours = 33.33 px/hr
   * 6:05am, (33.33 * 6) + (5 * 33.33/60) = start position in pixels
   * width = end position in pixels - start position in pixels
   */
  const width = timeBarContainerWidth; // px
  const dayInMinutes = 1440;
  const { fromTime, toTime } = flight;
  const pxPerHr = width / dayInMinutes;
  const minutesPerHour = 60;
  const fromTimeAttrs = getHoursMinutes(fromTime);
  const startTimeInMinutes =
    fromTimeAttrs.minutes + fromTimeAttrs.hours * minutesPerHour;
  let toTimeAttrs = getHoursMinutes(toTime);
  const endTimeInMinutes =
    toTimeAttrs.minutes + toTimeAttrs.hours * minutesPerHour;
  const startPositionPx = startTimeInMinutes * pxPerHr;
  const endPositionPx = endTimeInMinutes * pxPerHr;
  const timeBarWidth = endPositionPx - startPositionPx;

  return { timeBarWidth, startPositionPx };
}
