import { MissingElementLookupError, MissingFieldParserError, ParserError } from "../../shared/errors";
import { standardizeTimeString } from "../../shared/helpers";
import { FlightLeg, FlightLegInput } from "../../shared/types/FlightLeg";
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
  let elapsedTimezoneOffset = 0;
  let input = { elapsedTimezoneOffset } as FlightLegInput;
  for (const container of legDetailsContainers) {
    if (container.className.startsWith("Airline")) {
      const { operatingAirline } = getAirlines(container);
      input.operatingAirline = operatingAirline;
    } else if (container.className.startsWith("LegSeg")) {
      const { arrivalTime, departureTime, duration } = getTimes(container);
      const { arrivalAirport, departureAirport } = getAirports(container);
      input.duration = duration;
      input.from = departureAirport;
      input.to = arrivalAirport;
      input.fromTime = departureTime;
      input.toTime = arrivalTime;
      let flightLeg = new FlightLeg(input);

      const previousLayover = layovers.slice(-1)[0];
      if (
        previousLayover &&
        previousLayover.toTimeDetails.hours > flightLeg.fromTimeDetails.hours &&
        (flightLeg.fromTimeDetails.excessDays === null ||
          previousLayover.toTimeDetails.excessDays === flightLeg.fromTimeDetails.excessDays)
      ) {
        // handle when missing +1 day...
        input.fromTime = `${departureTime}+1`;
        flightLeg = new FlightLeg(input);
      }

      layovers.push(flightLeg);
      elapsedTimezoneOffset += flightLeg.timezoneOffset;
      input = { elapsedTimezoneOffset } as FlightLegInput;
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

  const [departureTimeContainer, durationSpan, arrivalTimeContainer] = timesContainer.children;

  const departureTime = departureTimeContainer.textContent;
  if (!departureTimeContainer) {
    throw new MissingFieldParserError("Couldn't parse departure time of layover");
  }

  const duration = durationSpan.textContent;
  if (!duration) {
    throw new MissingFieldParserError("Couldn't parse duration of layover");
  }

  const arrivalTime = arrivalTimeContainer.textContent;
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
