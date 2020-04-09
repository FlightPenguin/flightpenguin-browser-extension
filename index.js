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
const depTimeBarHeaderContainer = document.querySelector(
  ".departures-time-bar-container-header"
);
const retTimeBarContainer = document.querySelector(
  ".returns-time-bar-container"
);
const retTimeBarHeaderContainer = document.querySelector(
  ".returns-time-bar-container-header"
);

chrome.runtime.onMessage.addListener(function (message) {
  console.log(message.event, message);

  switch (message.event) {
    case "RESET_SEARCH":
      totalFlights = 0;
      allItins = {};
      selections = [];
      depListNode.innerHTML = "";
      const timeBarHeader = depTimeBarContainer.children[0];
      timeBarHeader.innerHTML = "";
      depTimeBarContainer.innerHTML = "";
      depTimeBarContainer.append(timeBarHeader);
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
      createTimeBars(
        departureList,
        depTimeBarContainer,
        depTimeBarHeaderContainer
      );

      const header = createHeader(formData);
      totalFlights += departureList.length;

      headerContainer.textContent = header;
      subheaderContainer.textContent = `${totalFlights} flights found.`;
      break;
    case "RETURN_FLIGHTS":
      const { returnList } = message.flights;
      createNodeList(returnList, allItins, retListNode);
      createTimeBars(
        returnList,
        retTimeBarContainer,
        retTimeBarHeaderContainer
      );

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

    const {
      fromTime,
      toTime,
      airline: { display: airline },
    } = item;
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
    const timeBarHeader = retTimeBarContainer.children[0];
    timeBarHeader.innerHTML = "";
    retTimeBarContainer.innerHTML = "";
    retTimeBarContainer.append(timeBarHeader);
    selections = [];
  }
}

function createTimeBarHeader(intervals) {
  const container = document.createElement("div");
  const intervalWidth = timeBarContainerWidth / (intervals.length - 1);

  for (let index = 0; index < intervals.length; index++) {
    const interval = intervals[index];
    const intervalNode = document.createElement("div");

    intervalNode.style.position = "absolute";
    intervalNode.innerText = interval;
    intervalNode.style.left = intervalWidth * index + "px";

    container.append(intervalNode);
  }

  return container;
}

function createTimeBars(flights, timeBarContainer, timeBarHeaderContainer) {
  const timeBarTempContainer = document.createDocumentFragment();
  let intervals = ["12am", "6am", "12pm", "6pm", "12am", "6am", "12pm"];

  for (let flight of flights) {
    const timeBarRow = document.createElement("div");
    timeBarRow.classList.add("time-bar-row");

    const iterator = flight.layovers.length ? flight.layovers : [flight];
    for (let { fromTime, toTime } of iterator) {
      const { timeBarSegment, newIntervals } = createTimeBar(
        fromTime,
        toTime,
        flight.airline.color,
        flight.airline.display,
        intervals
      );
      intervals = newIntervals;
      timeBarRow.append(timeBarSegment);
    }

    timeBarTempContainer.append(timeBarRow);
  }

  timeBarContainer.style.width = timeBarContainerWidth + "px";
  const timeBarHeader = createTimeBarHeader(intervals);
  timeBarHeaderContainer.innerHTML = "";
  timeBarHeaderContainer.append(timeBarHeader);
  timeBarContainer.append(timeBarTempContainer);
}

function createTimeBar(fromTime, toTime, airlineColor, airlineName, intervals) {
  const timeBarSegment = document.createElement("div");
  const {
    timeBarWidth,
    startPositionPx,
    newIntervals,
  } = createIndividualTimeBarPosition(fromTime, toTime, intervals);

  // let { fromTimeFormatted, toTimeFormatted } = getTimes(fromTime, toTime);
  timeBarSegment.title = `${airlineName} ${fromTime}-${toTime}`;
  timeBarSegment.style.width = `${timeBarWidth}px`;
  timeBarSegment.style.height = "30px";
  timeBarSegment.style.position = "absolute";
  timeBarSegment.style.left = `${startPositionPx}px`;
  timeBarSegment.style.backgroundColor = airlineColor;
  // TODO update intervals if needed
  return { timeBarSegment, newIntervals };
}

function convertTimeTo24HourClock(time) {
  let timeFormatted = time.toLowerCase();
  let [hours, minutesAndTimeOfDay] = timeFormatted.split(":");
  hours = Number(hours);
  minutes = Number(minutesAndTimeOfDay.replace(/(pm)|(am)/, "").trim());

  if (timeFormatted.includes("pm") && hours !== 12) {
    hours += 12;
  } else if (timeFormatted.includes("am") && hours === 12) {
    hours = 0;
  }
  return { hours, minutes };
}

function createIndividualTimeBarPosition(fromTime, toTime, intervals) {
  /**
   * Basically this is what's happening here:
   * Intervals for 24 hours
   * [12am, 6am, 12pm, 6pm, 12am]
   * [0px, 100px, 200px, 300px, 400px]
   * If we want the whole thing to be 400 px, 400 px / 24 hours = 33.33 px/hr
   * So 6:05am would be (33.33 * 6) + (5 * 33.33/60) = start position in pixels
   * width = end position in pixels - start position in pixels
   */
  const width = timeBarContainerWidth; // px
  const totalRangeTimeInMinutes = (intervals.length - 1) * 6 * 60;
  const pxPerMinute = width / totalRangeTimeInMinutes;
  const minutesPerHour = 60;
  // If we want time range to grow with longer flights...
  // let startHour = convertHoursTo24HourClock(fromTime);
  // let endHour = convertHoursTo24HourClock(toTime);
  // if (endHour < startHour) {
  //   // journey ends the next day
  //   const positionAtMidnight = pxPerMinute * minutesPerHour * 24;

  //   let newInterval = 0;
  //   let totalHours = 0;
  //   let timeOfDay = "am";
  //   let hours = [6, 12];
  //   let timeOfDayInterval = 1;
  //   while (totalHours < endHour) {
  //     newInterval = hours[timeOfDayInterval % 2];
  //     const switchTimeOfDay = timeOfDayInterval % 2 === 0 ? false : true;
  //     if (switchTimeOfDay) {
  //       timeOfDay = timeOfDay === "am" ? "pm" : "am";
  //     }
  //     intervals.push(newInterval + timeOfDay);
  //     timeOfDayInterval += 1;
  //     totalHours += 6;
  //   }
  //   return intervals;
  // }

  const fromTimeAttrs = convertTimeTo24HourClock(fromTime);
  const startTimeInMinutes =
    fromTimeAttrs.minutes + fromTimeAttrs.hours * minutesPerHour;

  const toTimeAttrs = convertTimeTo24HourClock(toTime);
  const endTimeInMinutes =
    toTimeAttrs.minutes + toTimeAttrs.hours * minutesPerHour;

  const startPositionPx = startTimeInMinutes * pxPerMinute;
  let endPositionPx = endTimeInMinutes * pxPerMinute;

  if (endPositionPx < startPositionPx) {
    const positionAtMidnight = pxPerMinute * minutesPerHour * 24;
    endPositionPx += positionAtMidnight;
  }

  const timeBarWidth = endPositionPx - startPositionPx;

  return { timeBarWidth, startPositionPx, newIntervals: intervals };
}
