import { MissingElementLookupError, MissingFieldParserError, ParserError } from "../../shared/errors";
import { standardizeTimeString } from "../../shared/helpers";
import { FlightLeg } from "../../shared/types/FlightLeg";
import { waitForAppearance } from "../../shared/utilities/waitFor";

const LEG_DETAILS_SELECTOR = "[class*='LegSegmentSummary_container']";
const LEG_INFORMATION_SELECTOR = "[class*='AirlineLogoTitle_container'],[class*='LegSegmentDetails_container']";
const TIMES_SELECTOR = "[class*='Times_segment']";
const AIRPORTS_SELECTOR = "[class*='Routes_route']";

export const getFlightLayovers = (legContainer: HTMLElement): FlightLeg[] => {
  legContainer.querySelector("button")?.click();
  waitForAppearance(500, LEG_DETAILS_SELECTOR, legContainer);

  const layovers = [] as FlightLeg[];
  const legDetailsContainers = legContainer.querySelectorAll(LEG_INFORMATION_SELECTOR) as NodeListOf<HTMLElement>;
  let previous = {} as FlightLeg;
  for (const container of legDetailsContainers) {
    if (container.className.startsWith("Airline")) {
      const { operatingAirline } = getAirlines(container);
      previous.operatingAirline = operatingAirline;
    } else if (container.className.startsWith("LegSeg")) {
      const { arrivalTime, departureTime, duration } = getTimes(container);
      const { arrivalAirport, departureAirport } = getAirports(container);
      previous.duration = duration;
      previous.from = departureAirport;
      previous.to = arrivalAirport;
      previous.fromTime = departureTime;
      previous.toTime = arrivalTime;
      layovers.push(previous);
      previous = {} as FlightLeg;
    } else {
      throw new ParserError(`Unexpected case: ${container.className}`);
    }
  }

  return layovers;
};

const getAirlines = (legDetailsContainer: HTMLElement): { marketingAirline: string; operatingAirline: string } => {
  const [marketingAirlineContainer, operatingAirlineContainer] = legDetailsContainer.querySelectorAll("span");
  if (!marketingAirlineContainer) {
    throw new MissingElementLookupError("Unable to find marketing airline container");
  }

  const marketingAirline = marketingAirlineContainer.textContent?.trim();
  const operatingAirline =
    operatingAirlineContainer && operatingAirlineContainer.textContent?.toLowerCase().includes("operated")
      ? operatingAirlineContainer.textContent.split("|")[1].trim()
      : marketingAirline;

  if (!marketingAirline) {
    throw new MissingFieldParserError("Unable to determine marketing airline");
  }

  if (!operatingAirline) {
    throw new MissingFieldParserError("Unable to determine operating airline");
  }

  return { marketingAirline, operatingAirline };
};

const getTimes = (legDetailsContainer: HTMLElement) => {
  const timesContainer = legDetailsContainer.querySelector(TIMES_SELECTOR);
  if (!timesContainer) {
    throw new MissingElementLookupError("Unable to determine times of layover");
  }

  const [departureTimeSpan, durationSpan, arrivalTimeSpan] = timesContainer.querySelectorAll("span");

  const departureTime = departureTimeSpan.textContent;
  if (!departureTimeSpan) {
    throw new MissingFieldParserError("Couldn't parse departure time of layover");
  }

  const duration = durationSpan.textContent;
  if (!duration) {
    throw new MissingFieldParserError("Couldn't parse duration of layover");
  }

  const arrivalTime = arrivalTimeSpan.textContent;
  if (!arrivalTime) {
    throw new MissingFieldParserError("Couldn't parse arrival time of layover");
  }

  return {
    departureTime: standardizeTimeString(departureTime),
    arrivalTime: standardizeTimeString(arrivalTime),
    duration,
  };
};

const getAirports = (legDetailsContainer: HTMLElement) => {
  const airportsContainer = legDetailsContainer.querySelector(AIRPORTS_SELECTOR);
  if (!airportsContainer) {
    throw new MissingElementLookupError("Unable to determine airports of layover");
  }

  const [departureAirportSpan, arrivalAirportSpan] = airportsContainer.querySelectorAll("span");

  const departureAirport = departureAirportSpan.textContent?.split(/\s+/)[0].trim();
  if (!departureAirport) {
    throw new MissingFieldParserError("Couldn't parse departure airport of layover");
  }

  const arrivalAirport = arrivalAirportSpan.textContent?.split(/\s+/)[0].trim();
  if (!arrivalAirport) {
    throw new MissingFieldParserError("Couldn't parse arrival airport of layover");
  }

  return { arrivalAirport, departureAirport };
};
