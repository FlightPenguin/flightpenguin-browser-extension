import { MissingElementLookupError, MissingFieldParserError, ParserError } from "../../shared/errors";
import { standardizeTimeString } from "../../shared/helpers";
import { FlightLeg } from "../../shared/types/FlightLeg";
import { getAirlines } from "./getAirlines";
import { getParsedAirlineName } from "./getParsedAirlineName";

const TRIP_OVERVIEW_SELECTOR = "div.trip-path";
const TRIP_COMPONENT_SELECTOR = ".trip-path-point, .trip-path-spacer";
const TRIP_TIME_SELECTOR = "div[class*='trip-path-point-time']";
const TRIP_AIRPORT_SELECTOR = "span[class='airport-code']";
const TRIP_DURATION_SELECTOR = ".trip-path-spacer-label";

const TRIP_WAYPOINT_CLASSNAME_REGEX = /trip-path-point\b/;
const TRIP_SPACER_CLASSNAME_REGEX = /trip-path-spacer\b/;

export const getLayovers = (flightCard: HTMLElement): FlightLeg[] => {
  const tripContainer = flightCard.querySelector(TRIP_OVERVIEW_SELECTOR);

  if (!tripContainer) {
    throw new MissingElementLookupError("Unable to lookup trip container");
  }

  const tripComponents = tripContainer.querySelectorAll(TRIP_COMPONENT_SELECTOR) as NodeListOf<HTMLElement>;
  if (!tripComponents) {
    throw new MissingElementLookupError("Unable to lookup trip components");
  }

  const airlines = getAirlines(flightCard);

  const layovers = [] as FlightLeg[];
  let incomplete = {} as FlightLeg;
  let previousDayDifference = 0;
  let skipNext = false;
  for (const component of tripComponents) {
    if (skipNext) {
      skipNext = false;
      continue;
    }

    const className = component.getAttribute("class") || "";
    switch (true) {
      case TRIP_WAYPOINT_CLASSNAME_REGEX.test(className):
        if (incomplete.from) {
          incomplete.to = getWaypointAirport(component);
          const { time, dateDifference: delta } = getWaypointTime(component, previousDayDifference);
          incomplete.toTime = time;
          previousDayDifference = delta;
          layovers.push(incomplete);
          incomplete = {} as FlightLeg;
          skipNext = true;
        } else {
          incomplete.from = getWaypointAirport(component);
          const { time, dateDifference: delta } = getWaypointTime(component, previousDayDifference);
          incomplete.fromTime = time;
          previousDayDifference = delta;
        }
        break;
      case TRIP_SPACER_CLASSNAME_REGEX.test(className):
        incomplete.duration = getDuration(component);
        incomplete.operatingAirline = getParsedAirlineName(airlines[layovers.length]);
        break;
      default:
        throw new ParserError(`Unknown case option ${component.getAttribute("class")}`);
    }
  }

  if (!layovers) {
    throw new ParserError("Unable to identify layovers");
  }

  return layovers;
};

const getWaypointTime = (
  waypointContainer: HTMLElement,
  previousDayDifference: number,
): { time: string; dateDifference: number } => {
  /*
     Skiplagged sanely displays the +1 above each date.
     Our date system expects the +n to only occur on the actual transition for the difference between the two times.
     So, we have to keep track of previous date diffs to make our dates happy.  Whrgrbl!
  */
  const timeElement = waypointContainer.querySelector(TRIP_TIME_SELECTOR) as HTMLElement;
  if (!timeElement) {
    throw new MissingElementLookupError("Unable to determine waypoint time");
  }

  let time = timeElement.textContent;
  if (!time) {
    throw new MissingFieldParserError("Unable to extract time");
  }

  const dateDelta = parseInt(timeElement.dataset?.diffDays || "0");
  if (dateDelta && dateDelta > previousDayDifference) {
    time += `+${dateDelta - previousDayDifference}`;
  }

  return { time: standardizeTimeString(time), dateDifference: dateDelta };
};

const getWaypointAirport = (waypointContainer: HTMLElement) => {
  const airportElement = waypointContainer.querySelector(TRIP_AIRPORT_SELECTOR);
  if (!airportElement) {
    throw new MissingElementLookupError("Unable to determine waypoint airport");
  }

  const airportCode = airportElement.textContent;
  if (!airportCode) {
    throw new MissingFieldParserError("Unable to extract airport code");
  }
  return airportCode;
};

const getDuration = (spacerContainer: HTMLElement) => {
  const durationElement = spacerContainer.querySelector(TRIP_DURATION_SELECTOR);
  if (!durationElement) {
    throw new MissingElementLookupError("Unable to determine spacer duration");
  }

  const duration = durationElement.textContent;
  if (!duration) {
    throw new MissingFieldParserError("Unable to extract duration");
  }
  return duration.trim();
};
