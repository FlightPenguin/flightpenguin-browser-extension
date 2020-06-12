import {
  convertTimeTo24HourClock,
  convertMinutesTo12HourClock,
} from "./utilityFunctions.js";

let totalFlights = 0;
let allItins = {};
let allDepartures = [];
let selections = [];
let search = {};
let numTicks;
let earliestTakeoffTime = Number.POSITIVE_INFINITY;
let latestLandingTime = Number.NEGATIVE_INFINITY;
const timeBarContainerWidth = 765; // if you update this, update CSS too

const GA_TRACKING_ID = "164337457-1";

(function (i, s, o, g, r, a, m) {
  i["GoogleAnalyticsObject"] = r;
  (i[r] =
    i[r] ||
    function () {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(
  window,
  document,
  "script",
  "https://www.google-analytics.com/analytics.js",
  "ga"
); // Note: https protocol here

ga("create", "UA-" + GA_TRACKING_ID, "auto"); // Enter your GA identifier
ga("set", "checkProtocolTask", function () {}); // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
ga("set", "transport", "beacon");
ga("require", "displayfeatures");
ga("send", "pageview", "/index.html"); // Specify the virtual path

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
const loadingContainer = document.getElementById("loading");

window.addEventListener("popstate", function (event) {
  // use browser back button to undo departure flight selection for roundtrip
  clearSelections();
  // send message to bg that selections have been reset.
  // providers that show departures and returns on separate pages need to be updated to go back to departures.
  chrome.runtime.sendMessage({
    event: "CLEAR_SELECTIONS",
  });
});

chrome.runtime.onMessage.addListener(function (message) {
  console.log(message.event, message);

  switch (message.event) {
    case "RESET_SEARCH":
      // state variables
      totalFlights = 0;
      allItins = {};
      selections = [];
      search = {};
      numTicks = 0;
      earliestTakeoffTime = Number.POSITIVE_INFINITY;
      latestLandingTime = Number.NEGATIVE_INFINITY;
      // search header
      headerContainer.textContent = createHeader(message.formData);

      // number of flights header
      subheaderContainer.innerHTML = "";

      // departure list
      departuresSection.style.display = "none";
      depListNode.innerHTML = "";

      // departure time bars
      let timeBarHeader = depTimeBarHeaderContainer;
      timeBarHeader.innerHTML = "";
      depTimeBarContainer.innerHTML = "";
      depTimeBarContainer.style.display = null;
      depTimeBarContainer.append(timeBarHeader);

      // return list
      returnsSection.style.display = "none";
      retListNode.innerHTML = "";

      // return time bars
      timeBarHeader = retTimeBarHeaderContainer;
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
        allDepartures = allDepartures.concat(departureList);
        departuresSection.style.display = null;
        const {
          increment,
          startHourOffset,
          intervals,
          dayWidths,
        } = createIntervals(allDepartures);
        createNodeList(
          allDepartures,
          depListNode,
          increment,
          startHourOffset,
          true
        );
        createTimeBarContainer(
          allDepartures[0].timezoneOffset,
          depTimeBarContainer,
          depTimeBarHeaderContainer,
          intervals,
          dayWidths
        );
      }
      const header = createHeader(formData);
      totalFlights = allDepartures.length;

      headerContainer.textContent = header;
      subheaderContainer.textContent = `${totalFlights} flights found.`;
      break;
    case "RETURN_FLIGHTS_FOR_CLIENT":
      const { returnList, itins: newItins } = message.flights;
      allItins = { ...allItins, ...newItins };
      returnsSection.style.display = "block";
      selections[0].querySelector(".fare").style.display = "none";
      loadingContainer.style.display = "none";

      const {
        increment,
        startHourOffset,
        intervals,
        dayWidths,
      } = createIntervals(returnList);
      createNodeList(
        returnList,
        retListNode,
        increment,
        startHourOffset,
        false
      );
      createTimeBarContainer(
        returnList[0].timezoneOffset,
        retTimeBarContainer,
        retTimeBarHeaderContainer,
        intervals,
        dayWidths
      );

      // scroll to Returns section
      window.scroll(
        0,
        window.pageYOffset + returnsSection.getBoundingClientRect().top
      );
      break;
    case "FAILED_SCRAPER":
      if (totalFlights === 0) {
        const header = createHeader(formData);
        headerContainer.textContent = header;
        subheaderContainer.textContent = `${totalFlights} flights found.`;
      }
      // ga("send", {
      //   hitType: "event",
      //   eventCategory: "failed scraper",
      //   eventAction: message.source,
      //   eventLabel: message.description,
      // });
      break;
    default:
      break;
  }
});

function createNodeList(
  list,
  containerNode,
  increment,
  startHourOffset,
  isDeparture
) {
  containerNode.innerHTML = "";
  list.forEach((item) => {
    const node = document.createElement("li");
    node.classList.add("flight-list-item");
    node.tabIndex = "0";
    node.addEventListener("click", handleFlightSelection);
    node.addEventListener("keypress", (e) => {
      if ([13, 32].includes(e.keyCode)) {
        // 13 is enter key code, 32 is space bar
        handleFlightSelection(e);
      }
    });

    const contentNode = document.createElement("div");
    contentNode.classList.add("flight-list-item__text");
    const {
      operatingAirline: { display: operatingAirline },
      marketingAirlineText,
      id,
      itinIds,
    } = item;

    let cheapestItin;
    if (isDeparture) {
      // departures
      cheapestItin = itinIds
        .map((itinId) => allItins[itinId])
        .sort((a, b) => a.fareNumber - b.fareNumber)[0];
    } else {
      // returns
      cheapestItin = allItins[`${selections[0].dataset.id}-${id}`];
    }
    const fare = cheapestItin.fareNumber;

    const costContainer = document.createElement("div");
    costContainer.classList.add("cost-container");
    const fareContainer = document.createElement("span");
    fareContainer.classList.add("fare");
    let fareTextContent;
    if (search.searchByPoints) {
      fareTextContent = `${Math.floor(fare / 0.012499999).toLocaleString(
        "en"
      )} points`;
    } else {
      fareTextContent = `$${fare.toLocaleString("en")}`;
    }
    fareContainer.textContent = fareTextContent;
    costContainer.append(fareContainer);
    contentNode.append(costContainer);
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
        span.classList.add("primary-airline");
      } else {
        span.classList.add("secondary-airline");
      }
      airlinesContainer.append(span);
    });
    contentNode.append(airlinesContainer);
    const timeBarNode = createTimeBarRow(item, increment, startHourOffset);
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
let flightsNotSelected = [];
function handleFlightSelection(e) {
  if (e.currentTarget.dataset.selected) {
    return;
  }
  const selectedNode = e.currentTarget;
  selectedNode.dataset.selected = true;
  selectedNode.tabIndex = "-1";
  selections.push(selectedNode);

  loadingContainer.style.display = null;

  if (selections.length === 1 && search.roundtrip) {
    // This page loads in a new tab so there is no history.
    // Add blank history state so the user can click browser back button.
    // The back button will be used to undo user actions, like flight selection.
    history.pushState({}, null, window.location.pathname);

    chrome.runtime.sendMessage({
      event: "DEPARTURE_SELECTED",
      departureId: selectedNode.dataset.id,
    });

    // hide departures
    flightsNotSelected = Array.from(
      departuresContainer.querySelectorAll("li:not([data-selected='true'])")
    );
    flightsNotSelected.forEach((flight) => (flight.style.display = "none"));
    depTimeBarContainer.style.display = "none";
  } else if (selections.length === 2 || !search.roundtrip) {
    const selectionIds = selections.map((sel) => sel.dataset.id);

    chrome.runtime.sendMessage({
      event: "HIGHLIGHT_TAB",
      selectedDepartureId: selectionIds[0],
      selectedReturnId: selectionIds[1],
    });
    clearSelections();
  }
}

/**
 * Clears selections state and resets UI.
 */
function clearSelections() {
  loadingContainer.style.display = "none";

  selections.forEach((sel) => {
    sel.style.border = "";
    delete sel.dataset.selected;
    sel.tabIndex = "0";
  });

  flightsNotSelected.forEach((flight) => (flight.style.display = null));
  selections[0].querySelector(".fare").style.display = null;
  depTimeBarContainer.style.display = null;
  returnsSection.style.display = "none";
  retListNode.innerHTML = "";
  const timeBarHeader = retTimeBarContainer.children[0];
  timeBarHeader.innerHTML = "";
  retTimeBarContainer.innerHTML = "";
  retTimeBarContainer.append(timeBarHeader);

  selections = [];
  window.scroll(0, 0);
}

function createTimeBarHeader(intervals, tzOffset, dayWidths) {
  const container = document.createDocumentFragment();

  const dateHeaderContainer = document.createElement("div");
  dateHeaderContainer.classList.add("time-bar-header__date-container");
  container.append(dateHeaderContainer);

  const intervalWidth = timeBarContainerWidth / (intervals.length - 1);
  const airportCodeContainer = document.createElement("div");
  airportCodeContainer.classList.add("time-bar-header__airport-code-container");
  const departureSpan = document.createElement("span");
  const arrivalSpan = document.createElement("span");
  airportCodeContainer.append(arrivalSpan);
  airportCodeContainer.append(departureSpan);
  container.append(airportCodeContainer);

  let date = search.fromDate;
  let depAirportCode = search.from;
  let arrAirportCode = search.to;
  if (returnsSection.style.display !== "none") {
    date = search.toDate;
    depAirportCode = search.to;
    arrAirportCode = search.from;
  }
  departureSpan.innerText = depAirportCode;
  arrivalSpan.innerText = arrAirportCode;

  const [year, month, day] = date
    .split("-")
    .map((dateString) => Number(dateString));
  const departureDate = new Date(year, month - 1, day);

  // function dayOfWeekAsInteger(day) {
  //   return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day % 7];
  // }

  let dayOfWeek = departureDate.getDay();
  let tzDayOfWeek = dayOfWeek;

  for (let index = 0; index < intervals.length; index++) {
    const interval = intervals[index];
    const timeMinutes = interval * 60;
    const originTime = convertMinutesTo12HourClock(
      Math.abs(timeMinutes)
    ).replace(":00", "");

    const intervalNode = document.createElement("div");
    intervalNode.classList.add("interval-time");
    const intervalLineNode = document.createElement("div");
    intervalLineNode.classList.add("interval-line");
    if (["12 AM", "12 PM"].includes(originTime)) {
      intervalLineNode.classList.add("midnight");
    }

    if (tzOffset) {
      const tzTimeMinutes = timeMinutes - tzOffset;
      if (tzTimeMinutes > 24 * 60) {
        tzDayOfWeek = dayOfWeek + 1;
      }
      const tzTime = convertMinutesTo12HourClock(
        Math.abs(tzTimeMinutes)
      ).replace(":00", "");

      const tzTimeNode = document.createElement("span");
      tzTimeNode.classList.add("interval-time-text");
      // tzTimeNode.innerText = `${dayOfWeekAsInteger(tzDayOfWeek)} ${tzTime} `;
      tzTimeNode.innerText = tzTime.replace("AM", "a").replace("PM", "p");
      intervalNode.append(tzTimeNode);
    }

    const currDays = Math.floor(interval / 24);
    if (
      dayWidths.length &&
      currDays > 0 &&
      currDays !== dayOfWeek &&
      index > 0
    ) {
      const dateNode = document.createElement("div");
      dateNode.classList.add("time-bar-header__date");

      dateNode.style.width = `${dayWidths.shift()}px`;
      departureDate.setDate(departureDate.getDate() + dayOfWeek);
      dateNode.textContent = departureDate
        .toDateString()
        .split(" ")
        .slice(0, 3)
        .join(" ");
      dateHeaderContainer.append(dateNode);

      dayOfWeek = (dayOfWeek + 1) % 7;
    }

    const timeNode = document.createElement("span");
    timeNode.classList.add("interval-time-text");
    timeNode.innerText = originTime.replace("AM", "a").replace("PM", "p");
    intervalNode.append(timeNode);
    intervalNode.style.left = intervalWidth * index + "px";
    intervalLineNode.style.left = intervalWidth * index + "px";

    container.append(intervalNode);
    container.append(intervalLineNode);
  }
  // if dayWidths, means the remaining width isn't for a full day
  if (dayWidths.length) {
    const dateNode = document.createElement("div");
    dateNode.classList.add("time-bar-header__date");

    dateNode.style.width = `${dayWidths.shift()}px`;
    departureDate.setDate(departureDate.getDate() + dayOfWeek);
    dateNode.textContent = departureDate
      .toDateString()
      .split(" ")
      .slice(0, 3)
      .join(" ");
    dateHeaderContainer.append(dateNode);
  }

  return container;
}

function createTimeBarContainer(
  timezoneOffset,
  timeBarContainer,
  timeBarHeaderContainer,
  intervals,
  dayWidths
) {
  timeBarContainer.style.width = timeBarContainerWidth + "px";

  const timeBarHeader = createTimeBarHeader(
    intervals,
    timezoneOffset,
    dayWidths
  );
  timeBarHeaderContainer.innerHTML = "";
  timeBarHeaderContainer.append(timeBarHeader);
}

function createTimeNodes(fromTimeDetails, toTimeDetails) {
  return [fromTimeDetails, toTimeDetails].map((timeDetails, idx) => {
    const { displayHours, minutes, timeOfDay, excessDays } = timeDetails;
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
      String(displayHours).length === 1
        ? "&nbsp;&nbsp;" + displayHours
        : displayHours;
    timeOfDaySpan.innerText = timeOfDay.toUpperCase();

    timeContainer.append(hourSpan);
    timeContainer.append(minuteSup);
    timeContainer.append(timeOfDaySpan);

    if (excessDays) {
      const excessNode = document.createElement("sup");
      excessNode.innerText = excessDays;
      timeContainer.append(excessNode);
    }

    return timeContainer;
  });
}
function createTimeBarRow(flight, increment, startHourOffset) {
  const { layovers, fromTimeDetails, toTimeDetails } = flight;
  const timeBarRow = document.createElement("div");
  timeBarRow.classList.add("time-bar-row");
  const timeNodes = createTimeNodes(fromTimeDetails, toTimeDetails);

  let startDayOffset = 0;
  let endDayOffset = 0;
  let width = 0;
  const timeSegments = document.createDocumentFragment();
  const iterator = layovers.length ? layovers : [flight];

  for (let {
    fromTime,
    toTime,
    isLayoverStop,
    from,
    to,
    operatingAirline: { color, display },
  } of iterator) {
    const endsNextDay = toTime.match(/(\+\d)/);
    const startsNextDay = fromTime.match(/(\+\d)/);
    if (!isLayoverStop) {
      if (startsNextDay) {
        const [_, startDays] = startsNextDay[0].split("+");
        startDayOffset += Number(startDays);
        endDayOffset = startDayOffset;
      }

      if (endsNextDay) {
        const [_, endDays] = endsNextDay[0].split("+");
        endDayOffset += Number(endDays);
      }
    }
    const { timeBarSegment } = createTimeBar(
      fromTime,
      toTime,
      color,
      display,
      startDayOffset,
      endDayOffset,
      increment,
      startHourOffset
    );
    if (!isLayoverStop) {
      if (endsNextDay) {
        startDayOffset = endDayOffset;
      }
    }
    timeBarSegment.classList.add("time-bar-segment");
    if (isLayoverStop) {
      timeBarSegment.classList.add("layover");
      timeBarSegment.dataset.content = from;
      // Some segments have a gap even when the calculated positions and width should line up!
      timeBarSegment.style.width =
        timeBarSegment.style.width.replace("px", "") * 1 + 1 + "px";
    }
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
  endDayOffset,
  increment,
  startHourOffset
) {
  const timeBarSegment = document.createElement("div");
  const { timeBarWidth, startPositionPx } = createIndividualTimeBarPosition(
    fromTime,
    toTime,
    startDayOffset,
    endDayOffset,
    increment,
    startHourOffset
  );

  timeBarSegment.title = `${airlineName} ${fromTime}-${toTime}`;
  timeBarSegment.style.width = `${timeBarWidth}px`;
  timeBarSegment.style.height = "30px";
  timeBarSegment.style.position = "absolute";
  timeBarSegment.style.left = `${startPositionPx}px`;
  timeBarSegment.style.backgroundColor = airlineColor;

  return { timeBarSegment };
}

function createIntervals(flights) {
  const earliestFlight = flights.sort(
    (a, b) => a.fromTimeDetails.hours - b.fromTimeDetails.hours
  )[0];
  const latestFlight = flights.sort(
    (a, b) => b.toTimeDetails.hours - a.toTimeDetails.hours
  )[0];
  if (earliestFlight.fromTimeDetails.hours < earliestTakeoffTime) {
    earliestTakeoffTime = Math.max(0, earliestFlight.fromTimeDetails.hours - 2);
  }
  if (latestFlight.toTimeDetails.hours > latestLandingTime) {
    latestLandingTime = latestFlight.toTimeDetails.hours + 2;
  }

  let startHour = earliestTakeoffTime;
  // Want to always have midnight (12 AM) as an interval.
  while (startHour % 4 !== 0 && startHour % 3 !== 0) {
    startHour--;
  }
  let increment;

  if (latestLandingTime - earliestTakeoffTime > 72) {
    startHour = 0;
    increment = 6;
  } else if (latestLandingTime - startHour <= 12) {
    increment = 1;
  } else if (latestLandingTime - startHour <= 24) {
    if (startHour % 4 === 0) {
      increment = 2;
    } else if (startHour % 3 === 0) {
      increment = 3;
    }
  } else if (startHour % 4 === 0) {
    increment = 4;
  } else {
    increment = 3;
  }

  const intervals = [];
  let time = startHour;

  while (time <= latestLandingTime + increment) {
    intervals.push(time);
    time += increment;
  }
  numTicks = intervals.length;
  const intervalWidth = timeBarContainerWidth / (numTicks - 1);
  const dayWidths = [];
  let lastDayIdx = 0;
  for (let [idx, interval] of intervals.entries()) {
    if (interval % 24 === 0 && interval !== 0) {
      dayWidths.push(intervalWidth * (idx - lastDayIdx));
      lastDayIdx = idx;
    }
  }

  if (lastDayIdx !== intervals.length - 1) {
    dayWidths.push(intervalWidth * (intervals.length - 1 - lastDayIdx));
  }
  return { intervals, increment, startHourOffset: startHour, dayWidths };
}

function createIndividualTimeBarPosition(
  fromTime,
  toTime,
  startDayOffset,
  endDayOffset,
  increment,
  startHourOffset
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
  const totalHours = (numTicks - 1) * increment;
  const totalMinutes = totalHours * 60;
  const pxPerMinute = timeBarContainerWidth / totalMinutes;
  const minutesPerHour = 60;
  const minutesPerDay = minutesPerHour * 24;
  const positionAtMidnight = pxPerMinute * minutesPerDay;

  const startMinutesOffset =
    startDayOffset * minutesPerDay - startHourOffset * minutesPerHour; // if flight starts on a following day, happens with layovers
  const endMinutesOffset =
    endDayOffset * minutesPerDay - startHourOffset * minutesPerHour; // if flight ends on a following day, happens with long distance flights and layovers

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
  return { timeBarWidth, startPositionPx };
}
