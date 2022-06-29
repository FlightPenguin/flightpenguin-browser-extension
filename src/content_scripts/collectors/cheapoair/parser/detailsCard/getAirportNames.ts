import { MissingFieldParserError } from "../../../../../shared/errors";

const AIRPORT_SELECTOR = "span[class*='is--airport-name']";

export const getAirportNames = (
  flightLegContainer: HTMLDivElement,
): { departureAirport: string; arrivalAirport: string } => {
  const airportElements = flightLegContainer.querySelectorAll(AIRPORT_SELECTOR) as NodeListOf<HTMLSpanElement>;
  if (!airportElements || airportElements.length !== 2) {
    throw new MissingFieldParserError("Unable to get airport fields in flight segment");
  }

  const [dAirportElement, aAirportElement] = airportElements;
  return { departureAirport: getPrettyName(dAirportElement), arrivalAirport: getPrettyName(aAirportElement) };
};

const getPrettyName = (airportSpan: HTMLSpanElement): string => {
  if (!airportSpan.textContent) {
    throw new MissingFieldParserError("Unable to extract airport name");
  }

  return airportSpan.textContent.split(",").slice(-1)[0].trim().toUpperCase();
};
