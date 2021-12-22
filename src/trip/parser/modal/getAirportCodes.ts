import { MissingElementLookupError, MissingFieldParserError } from "../../../shared/errors";

const AIRPORT_CONTAINER_SELECTOR = "div.f-flight-detail__location";

export const getAirportCodes = (
  container: HTMLDivElement,
): { arrivalAirportCode: string; departureAirportCode: string } => {
  const [departureAirportContainer, arrivalAirportContainer] = container.querySelectorAll(
    AIRPORT_CONTAINER_SELECTOR,
  ) as NodeListOf<HTMLDivElement>;

  if (!departureAirportContainer) {
    throw new MissingElementLookupError("Unable to find departure airport container for layover");
  }

  if (!arrivalAirportContainer) {
    throw new MissingElementLookupError("Unable to find arrival airport container for layover");
  }

  return {
    arrivalAirportCode: getAirportCode(arrivalAirportContainer),
    departureAirportCode: getAirportCode(departureAirportContainer),
  };
};

const getAirportCode = (container: HTMLDivElement): string => {
  if (!container.textContent) {
    throw new MissingFieldParserError("Unable to extract airport code text from container");
  }

  const match = container.textContent.match(/^[A-Z0-9]{3}/);
  if (!match) {
    throw new MissingFieldParserError("Unable to extract airport from text");
  }

  return match[0];
};
