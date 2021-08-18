import { MissingElementLookupError, MissingFieldParserError } from "../../shared/errors";
import { FlightDetails } from "../../shared/types/FlightDetails";
import { waitForAppearance } from "../../shared/utilities/waitFor";
import { getAirlines } from "./getAirlines";
import { getLayovers } from "./getLayovers";
import { getParsedAirlineName } from "./getParsedAirlineName";

const CONTAINER_SHELL_SELECTOR = "section #trip-list-wrapper";
const SORT_BUTTON_SELECTOR = "[data-sort='cost']";
const DURATION_SELECTOR = "span.trip-path-duration";

const HAS_STOP_REGEX = /\d{1,2} stops?/i;

export const getFlightDetails = async (flightCard: HTMLElement): Promise<FlightDetails> => {
  await waitForAppearance(3000, CONTAINER_SHELL_SELECTOR);
  await waitForAppearance(10_000, SORT_BUTTON_SELECTOR);

  const marketingAirline = getAirlineName(flightCard);
  const { duration, hasStops } = getDurationDetails(flightCard);

  let layovers = getLayovers(flightCard);
  const fromTime = layovers[0].fromTime;
  const toTime = layovers.slice(-1)[0].toTime;

  if (!hasStops) {
    layovers = [];
  }

  return {
    marketingAirline,
    operatingAirline: null,
    layovers,
    duration,
    fromTime,
    toTime,
  };
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
