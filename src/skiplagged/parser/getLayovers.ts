import { MissingElementLookupError, MissingFieldParserError, ParserError } from "../../shared/errors";
import { standardizeTimeString } from "../../shared/helpers";
import { FlightLeg } from "../../shared/types/FlightLeg";
import { getAirlines } from "./getAirlines";
import { getParsedAirlineName } from "./getParsedAirlineName";

const TRIP_OVERVIEW_SELECTOR = "div.trip-path";
const TRIP_COMPONENT_SELECTOR = ".trip-path-point, .trip-path-spacer";
const TRIP_TIME_SELECTOR = "div[class='trip-path-point-time ']";
const TRIP_AIRPORT_SELECTOR = "div[class='airport-code']";
const TRIP_DURATION_SELECTOR = "trip-path-spacer-label";

const TRIP_WAYPOINT_CLASSNAME = "trip-path-point";
const TRIP_SPACER_CLASSNAME = "trip-path-spacer";

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
  let skipNext = false;
  for (const component of tripComponents) {
    if (skipNext) {
      skipNext = false;
      continue;
    }

    switch (component.getAttribute("class")) {
      case TRIP_WAYPOINT_CLASSNAME:
        if (incomplete.from) {
          incomplete.to = getWaypointAirport(component);
          incomplete.toTime = getWaypointTime(component);
          layovers.push(incomplete);
          incomplete = {} as FlightLeg;
          skipNext = true;
        } else {
          incomplete.from = getWaypointAirport(component);
          incomplete.fromTime = getWaypointTime(component);
        }
        break;
      case TRIP_SPACER_CLASSNAME:
        incomplete.duration = getDuration(component);
        incomplete.operatingAirline = getParsedAirlineName(airlines[layovers.length]);
        break;
      default:
        throw new ParserError("Unknown case option");
    }
  }

  if (!layovers) {
    throw new ParserError("Unable to identify layovers");
  }

  return layovers;
};

const getWaypointTime = (waypointContainer: HTMLElement) => {
  const timeElement = waypointContainer.querySelector(TRIP_TIME_SELECTOR);
  if (!timeElement) {
    throw new MissingElementLookupError("Unable to determine waypoint time");
  }

  const time = timeElement.textContent;
  if (!time) {
    throw new MissingFieldParserError("Unable to extract time");
  }
  return standardizeTimeString(time);
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
  return duration;
};
