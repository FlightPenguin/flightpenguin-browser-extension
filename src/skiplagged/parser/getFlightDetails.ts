import { MissingElementLookupError, MissingFieldParserError } from "../../shared/errors";
import { standardizeTimeString } from "../../shared/helpers";
import { FlightDetails } from "../../shared/types/FlightDetails";
import { waitForAppearance } from "../../shared/utilities/waitFor";
import { getAirlines } from "./getAirlines";
import { getLayovers } from "./getLayovers";
import { getParsedAirlineName } from "./getParsedAirlineName";

const CONTAINER_SHELL_SELECTOR = "section #trip-list-wrapper";
const SORT_BUTTON_SELECTOR = "[data-sort='cost']";
const DURATION_SELECTOR = "span.trip-path-duration";
const TRIP_TIME_SELECTOR = "div[class*='trip-path-point-time']";

const HAS_STOP_REGEX = /\d{1,2} stops?/i;

export const getFlightDetails = async (flightCard: HTMLElement): Promise<FlightDetails> => {
  await waitForAppearance(3000, CONTAINER_SHELL_SELECTOR);
  await waitForAppearance(10_000, SORT_BUTTON_SELECTOR);

  const marketingAirline = getAirlineName(flightCard);
  const fromTime = getDepartureTime(flightCard);
  const toTime = getArrivalTime(flightCard);
  const { duration, hasStops } = getDurationDetails(flightCard);

  let layovers = getLayovers(flightCard);

  if (!hasStops) {
    layovers = [];
  }

  return new FlightDetails({
    marketingAirline,
    operatingAirline: null,
    layovers,
    duration,
    fromTime,
    toTime,
  });
};

const getDurationDetails = (flightCard: Element) => {
  const durationContainer = flightCard.querySelector(DURATION_SELECTOR);

  if (!durationContainer) {
    throw new MissingElementLookupError("Unable to lookup flight duration time");
  }

  const duration = durationContainer.textContent?.split("|")[0].trim();
  const hasStops = HAS_STOP_REGEX.test(durationContainer.textContent?.split("|")[1].trim() || "");

  if (!duration) {
    throw new MissingFieldParserError("Unable to determine duration time for flight");
  }

  return { duration, hasStops };
};

const getAirlineName = (flightCard: HTMLElement): string => {
  const airlineNames = new Set();
  const flightNames = getAirlines(flightCard);
  for (const flightName of flightNames) {
    const airlineName = getParsedAirlineName(flightName);
    airlineNames.add(airlineName);
  }
  return airlineNames.size === 1 ? ([...airlineNames][0] as string) : "Multiple airlines";
};

const getDepartureTime = (flightCard: HTMLElement): string => {
  const timeElement = flightCard.querySelector(TRIP_TIME_SELECTOR) as HTMLElement;
  if (!timeElement) {
    throw new MissingElementLookupError("Unable to determine departure time");
  }

  let time = timeElement.textContent;
  if (!time) {
    throw new MissingFieldParserError("Unable to extract departure time");
  }

  const dayDifference = parseInt(timeElement.dataset?.diffDays || "0");
  if (dayDifference) {
    time += `+${dayDifference}`;
  }

  return standardizeTimeString(time);
};

const getArrivalTime = (flightCard: HTMLElement): string => {
  const timeElements = flightCard.querySelectorAll(TRIP_TIME_SELECTOR) as NodeListOf<HTMLElement>;
  if (!timeElements) {
    throw new MissingElementLookupError("Unable to find time elements");
  }

  const timeElement = Array.from(timeElements).slice(-1)[0];
  if (!timeElement) {
    throw new MissingElementLookupError("Unable to find arrival time");
  }

  let time = timeElement.textContent;
  if (!time) {
    throw new MissingFieldParserError("Unable to extract arrival time");
  }

  const dayDifference = parseInt(timeElement.dataset?.diffDays || "0");
  if (dayDifference) {
    time += `+${dayDifference}`;
  }

  return standardizeTimeString(time);
};
