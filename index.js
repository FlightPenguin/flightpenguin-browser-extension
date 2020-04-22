import {
  convertTimeTo24HourClock,
  convert12HourTimeToMinutes,
  convertMinutesTo12HourClock,
} from "./utilityFunctions.js";

let totalFlights = 0;
let allItins = {};
let selections = [];
let search = {};
const timeBarContainerWidth = 700;
let intervals = [
  "12 AM",
  "",
  "12 PM",
  "",
  "12 AM",
  "",
  "12 PM",
  "",
  "12 AM",
  "",
];

const headerContainer = document.querySelector(".header");
const subheaderContainer = document.querySelector(".subheader");

const departuresSection = document.querySelector(".departures-section");
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
      // state variables
      totalFlights = 0;
      allItins = {};
      selections = [];
      search = {};
      // search header
      headerContainer.textContent = createHeader(message.formData);

      // number of flights header
      subheaderContainer.innerHTML = "";

      // departure list
      departuresSection.style.display = "none";
      depListNode.innerHTML = "";

      // departure time bars
      let timeBarHeader = depTimeBarContainer.children[0];
      timeBarHeader.innerHTML = "";
      depTimeBarContainer.innerHTML = "";
      depTimeBarContainer.style.display = null;
      depTimeBarContainer.append(timeBarHeader);

      // return list
      returnsSection.style.display = "none";
      retListNode.innerHTML = "";

      // return time bars
      timeBarHeader = retTimeBarContainer.children[0];
      timeBarHeader.innerHTML = "";
      retTimeBarContainer.innerHTML = "";
      retTimeBarContainer.append(timeBarHeader);
      break;
    case "FLIGHT_RESULTS_FOR_CLIENT":
      const {
        flights: { departureList, itins },
        formData,
      } = message;
      search = formData;
      allItins = { ...allItins, ...itins };

      if (departureList.length) {
        departuresSection.style.display = null;
        createNodeList(departureList, itins, depListNode);
        createTimeBars(
          departureList,
          depTimeBarContainer,
          depTimeBarHeaderContainer
        );
      }
      const header = createHeader(formData);
      totalFlights += departureList.length;

      headerContainer.textContent = header;
      subheaderContainer.textContent = `${totalFlights} flights found.`;
      break;
    case "RETURN_FLIGHTS":
      const { returnList } = message.flights;
      returnsSection.style.display = "block";

      createNodeList(returnList, allItins, retListNode);
      createTimeBars(
        returnList,
        retTimeBarContainer,
        retTimeBarHeaderContainer
      );

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
    node.classList.add("flight-list-item");
    node.addEventListener("click", handleClick);

    const contentNode = document.createElement("div");
    contentNode.classList.add("flight-list-item__text");
    const {
      operatingAirline: { display: operatingAirline },
      marketingAirlineText,
    } = item;

    let fares = item.itinIds.map((itinId) => itins[itinId].fare).sort();
    const fare = document.createElement("span");
    fare.textContent = "$" + fares[0];
    fare.classList.add("fare");
    contentNode.append(fare);
    // Create and append airline HTML
    const airlinesContainer = document.createElement("div");
    airlinesContainer.classList.add("airlines");
    const airlines = [operatingAirline];
    if (marketingAirlineText) {
      airlines.push(marketingAirlineText);
    }
    airlines.forEach((airline, idx) => {
      const span = document.createElement("span");
      span.textContent = airline;

      if (idx === 0) {
        if (airline.length > 17) {
          span.classList.add("primary-airline__small-font-size");
          if (airline.includes("+")) {
            const airlinesHTML = airline.split("+").join("and<br/>");
            span.innerHTML = airlinesHTML;
          }
        } else {
          span.classList.add("primary-airline");
        }
      } else {
        span.classList.add("secondary-airline");
      }
      airlinesContainer.append(span);
    });
    contentNode.append(airlinesContainer);
    const timeBarNode = createTimeBarRow(item);
    node.append(contentNode);
    node.append(timeBarNode);
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

  if (selections.length === 1 && search.roundtrip) {
    chrome.runtime.sendMessage({
      event: "DEPARTURE_SELECTED",
      departureId: selectedNode.dataset.id,
    });
    flightsNotSelected = Array.from(
      departuresContainer.querySelectorAll("li:not([data-selected='true'])")
    );
    flightsNotSelected.forEach((flight) => (flight.style.display = "none"));
    depTimeBarContainer.style.display = "none";
  } else if (selections.length === 2 || !search.roundtrip) {
    const selectionIds = selections.map((sel) => sel.dataset.id);
    const itin = allItins[selectionIds.join("-")];

    chrome.runtime.sendMessage({
      event: "HIGHLIGHT_TAB",
      tabId: itin.tabId,
      provider: itin.provider,
      selectedDepartureId: selectionIds[0],
      selectedReturnId: selectionIds[1],
      itinId: itin.id,
    });
    // reset selections and DOM
    selections.forEach((sel) => {
      sel.style.border = "";
      sel.dataset.selected = "false";
    });
    if (search.roundtrip) {
      // update UI to show departures
      flightsNotSelected.forEach((flight) => (flight.style.display = null));
      depTimeBarContainer.style.display = null;
      returnsSection.style.display = "none";
      retListNode.innerHTML = "";
      const timeBarHeader = retTimeBarContainer.children[0];
      timeBarHeader.innerHTML = "";
      retTimeBarContainer.innerHTML = "";
      retTimeBarContainer.append(timeBarHeader);
    }

    selections = [];
  }
}

function createTimeBarHeader(intervals) {
  const dateHeaderContainer = document.createElement("div");
  dateHeaderContainer.classList.add("time-bar-header__date-container");
  const departureDayNode = document.createElement("div");
  const arrivalDayNode = document.createElement("div");
  departureDayNode.classList.add("time-bar-header__date");
  arrivalDayNode.classList.add("time-bar-header__date");
  let date = search.fromDate;
  if (returnsSection.style.display !== "none") {
    date = search.toDate;
  }
  const [year, month, day] = date
    .split("-")
    .map((dateString) => Number(dateString));
  const departureDate = new Date(year, month, day);
  departureDayNode.textContent = departureDate.toDateString();
  departureDate.setDate(departureDate.getDate() + 1);
  arrivalDayNode.textContent = departureDate.toDateString();
  dateHeaderContainer.append(departureDayNode);
  dateHeaderContainer.append(arrivalDayNode);

  const container = document.createDocumentFragment();
  container.append(dateHeaderContainer);
  const intervalWidth = timeBarContainerWidth / (intervals.length - 1);

  for (let index = 0; index < intervals.length; index++) {
    const interval = intervals[index];
    const intervalNode = document.createElement("div");
    const intervalLineNode = document.createElement("div");

    intervalLineNode.classList.add("interval-line");
    intervalNode.classList.add("interval-time");

    intervalNode.innerText = interval;
    intervalNode.style.left = intervalWidth * index + "px";
    intervalLineNode.style.left = intervalWidth * index + "px";
    // intervalLineNode.style.width = intervalWidth + "px";
    container.append(intervalNode);
    container.append(intervalLineNode);
  }

  return container;
}

function createTimezoneNodes(flight) {
  const fromTzNode = document.createElement("span");
  fromTzNode.classList.add("timezone__first");
  const fromTotalMins = convert12HourTimeToMinutes(flight.fromTime);
  const fromTimeInOtherAirportMins = fromTotalMins + flight.timezoneOffset * -1;
  const fromTimeInOtherAirport = convertMinutesTo12HourClock(
    fromTimeInOtherAirportMins
  );
  let from = search.from;
  let to = search.to;

  if (returnsSection.style.display !== "none") {
    from = search.to;
    to = search.from;
  }
  fromTzNode.title = `${fromTimeInOtherAirport} in ${to}`;

  const toTzNode = document.createElement("span");
  toTzNode.classList.add("timezone__last");

  const toTotalMins = convert12HourTimeToMinutes(flight.toTime);
  const toTimeInOtherAirportMins = toTotalMins + flight.timezoneOffset;
  const toTimeInOtherAirport = convertMinutesTo12HourClock(
    toTimeInOtherAirportMins
  );
  toTzNode.title = `${toTimeInOtherAirport} in ${from}`;

  return { fromTzNode, toTzNode };
}

function createTimeBars(flights, timeBarContainer, timeBarHeaderContainer) {
  // const timeBarTempContainer = document.createDocumentFragment();

  // let maxEndDayOffset = 1;

  // for (let flight of flights) {

  timeBarContainer.style.width = timeBarContainerWidth + "px";

  // intervals = intervals.slice(0, maxEndDayOffset * 4);

  const timeBarHeader = createTimeBarHeader(intervals);
  timeBarHeaderContainer.innerHTML = "";
  timeBarHeaderContainer.append(timeBarHeader);
  // timeBarContainer.append(timeBarTempContainer);
}

function createTimeNodes(fromTimeDetails, toTimeDetails) {
  return [fromTimeDetails, toTimeDetails].map((timeDetails, idx) => {
    const { hours, minutes, timeOfDay, excessDays, isDayTime } = timeDetails;
    const timeContainer = document.createElement("div");
    if (idx === 0) {
      timeContainer.classList.add("departure-time");
    } else {
      timeContainer.classList.add("arrival-time");
    }
    const minuteSup = document.createElement("sup");
    const hourSpan = document.createElement("span");
    const timeOfDaySpan = document.createElement("span");

    minuteSup.classList.add("times__minute");
    hourSpan.classList.add("times__hour");
    timeOfDaySpan.classList.add("times__time-of-day");

    let minuteString = String(minutes);
    minuteString = minuteString.padStart(2, "0");
    minuteSup.textContent = minuteString;
    hourSpan.innerHTML =
      String(hours).length === 1 ? "&nbsp;&nbsp;" + hours : hours;
    timeOfDaySpan.innerText = timeOfDay.toUpperCase();

    timeContainer.append(hourSpan);
    timeContainer.append(minuteSup);
    timeContainer.append(timeOfDaySpan);

    if (excessDays) {
      const excessNode = document.createElement("sup");
      excessNode.innerText = excessDays;
      timeContainer.append(excessNode);
    }

    if (isDayTime) {
      timeContainer.classList.add("day-time");
    } else {
      timeContainer.classList.add("night-time");
    }
    return timeContainer;
  });
}
function createTimeBarRow(flight) {
  const {
    layovers,
    operatingAirline: { display, color },
    fromTimeDetails,
    toTimeDetails,
  } = flight;
  const timeBarRow = document.createElement("div");
  timeBarRow.classList.add("time-bar-row");
  // Create and append times HTML
  // const timesContainer = document.createElement("div");
  // timesContainer.classList.add("times");
  const timeNodes = createTimeNodes(fromTimeDetails, toTimeDetails);

  const iterator = layovers.length ? layovers : [flight];
  let startDayOffset = 0;
  let endDayOffset = 0;
  let width = 0;
  const timeSegments = document.createDocumentFragment();

  for (let { fromTime, toTime } of iterator) {
    const endsNextDay = toTime.match(/(\+\d)/);
    const startsNextDay = fromTime.match(/(\+\d)/);

    if (endsNextDay) {
      const [_, endDays] = endsNextDay[0].split("+");
      endDayOffset += Number(endDays);
    }
    if (startsNextDay) {
      const [_, startDays] = startsNextDay[0].split("+");
      startDayOffset += Number(startDays);
    }

    const { timeBarSegment } = createTimeBar(
      fromTime,
      toTime,
      color,
      display,
      startDayOffset,
      endDayOffset
    );

    if (endsNextDay) {
      startDayOffset = endDayOffset;
    }
    timeBarSegment.classList.add("time-bar-segment");
    timeSegments.append(timeBarSegment);
  }
  let lastTimeSegment =
    timeSegments.children[timeSegments.childElementCount - 1];
  let rightPositionNumber =
    Number(lastTimeSegment.style.left.replace("px", "")) +
    Number(lastTimeSegment.style.width.replace("px", ""));
  let leftPosition = timeSegments.children[0].style.left;
  let leftPositionNumber = Number(leftPosition.replace("px", ""));

  width = rightPositionNumber - leftPositionNumber;
  // Position timezone nodes based on first and last time bar in row:
  if (flight.timezoneOffset) {
    const { fromTzNode, toTzNode } = createTimezoneNodes(flight);

    fromTzNode.style.left = leftPosition;
    toTzNode.style.left = rightPositionNumber - 20 + "px"; // 20px is how wide the node is and is defined in css

    timeBarRow.append(fromTzNode);
    timeBarRow.append(toTzNode);
  }

  // if (endDayOffset > maxEndDayOffset) {
  //   maxEndDayOffset = endDayOffset;
  // }
  timeBarRow.append(timeSegments);
  timeBarRow.style.width = width + "px";
  timeNodes[0].style.left = leftPositionNumber - 97 + "px";
  timeNodes[1].style.left = rightPositionNumber + 10 + "px";

  timeBarRow.append(timeNodes[0]);
  timeBarRow.append(timeNodes[1]);
  timeBarRow.style.width = width + "px";
  return timeBarRow;
}
function createTimeBar(
  fromTime,
  toTime,
  airlineColor,
  airlineName,
  startDayOffset,
  endDayOffset
) {
  const timeBarSegment = document.createElement("div");
  const {
    timeBarWidth,
    startPositionPx,
    newIntervals,
  } = createIndividualTimeBarPosition(
    fromTime,
    toTime,
    intervals,
    startDayOffset,
    endDayOffset
  );

  timeBarSegment.title = `${airlineName} ${fromTime}-${toTime}`;
  timeBarSegment.style.width = `${timeBarWidth}px`;
  timeBarSegment.style.height = "30px";
  timeBarSegment.style.position = "absolute";
  timeBarSegment.style.left = `${startPositionPx}px`;
  timeBarSegment.style.backgroundColor = airlineColor;

  return { timeBarSegment, newIntervals };
}

function createIndividualTimeBarPosition(
  fromTime,
  toTime,
  intervals,
  startDayOffset,
  endDayOffset
) {
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
  const minutesPerDay = minutesPerHour * 24;
  const positionAtMidnight = pxPerMinute * minutesPerDay;
  const startMinutesOffset = startDayOffset * minutesPerDay; // if flight starts on a following day, happens with layovers
  const endMinutesOffset = endDayOffset * minutesPerDay; // if flight ends on a following day, happens with long distance flights and layovers

  const fromTimeAttrs = convertTimeTo24HourClock(fromTime);
  const startTimeInMinutes =
    startMinutesOffset +
    fromTimeAttrs.minutes +
    fromTimeAttrs.hours * minutesPerHour;

  const toTimeAttrs = convertTimeTo24HourClock(toTime);
  const endTimeInMinutes =
    endMinutesOffset + toTimeAttrs.minutes + toTimeAttrs.hours * minutesPerHour;

  const startPositionPx = startTimeInMinutes * pxPerMinute;
  let endPositionPx = endTimeInMinutes * pxPerMinute;

  if (endPositionPx < startPositionPx) {
    endPositionPx += positionAtMidnight;
  }

  const timeBarWidth = endPositionPx - startPositionPx;
  return { timeBarWidth, startPositionPx, newIntervals: intervals };
}
