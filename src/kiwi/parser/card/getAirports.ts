import { MissingElementLookupError, MissingFieldParserError } from "../../../shared/errors";
import { AirportDetails } from "../../../shared/types/AirportDetails";

const AIRPORT_NAME_SELECTOR = "div[class*='StationName']";
const AIRPORT_CODE_SELECTOR = "div[class*='IataCode']";

export const getAirports = (
  tripContainer: HTMLDivElement,
): { departureAirport: AirportDetails; arrivalAirport: AirportDetails } => {
  const { arrivalAirportName, departureAirportName } = getAirportNames(tripContainer);
  const { arrivalAirportCode, departureAirportCode } = getAirportCodes(tripContainer);

  return {
    departureAirport: { name: departureAirportName, code: departureAirportCode },
    arrivalAirport: { name: arrivalAirportName, code: arrivalAirportCode },
  };
};

export const getAirportNames = (
  tripContainer: HTMLDivElement,
): { arrivalAirportName: string; departureAirportName: string } => {
  const nameContainers = tripContainer.querySelectorAll(AIRPORT_NAME_SELECTOR) as NodeListOf<HTMLDivElement>;
  if (nameContainers.length !== 2) {
    throw new MissingElementLookupError("Unable to find airport name containers");
  }

  const [departureAirportContainer, arrivalAirportContainer] = nameContainers;
  if (!departureAirportContainer.textContent || !arrivalAirportContainer.textContent) {
    throw new MissingElementLookupError("Unable to extract airport names");
  }

  return {
    departureAirportName: departureAirportContainer.textContent,
    arrivalAirportName: arrivalAirportContainer.textContent,
  };
};

export const getAirportCodes = (
  tripContainer: HTMLDivElement,
): { arrivalAirportCode: string; departureAirportCode: string } => {
  const codeContainers = tripContainer.querySelectorAll(AIRPORT_CODE_SELECTOR) as NodeListOf<HTMLDivElement>;
  if (codeContainers.length !== 2) {
    throw new MissingElementLookupError("Unable to find airport code containers");
  }

  const [departureAirportContainer, arrivalAirportContainer] = codeContainers;
  if (!departureAirportContainer.textContent || !arrivalAirportContainer.textContent) {
    throw new MissingElementLookupError("Unable to extract airport codes");
  }

  return {
    departureAirportCode: departureAirportContainer.textContent.replace(/[()]/g, ""),
    arrivalAirportCode: arrivalAirportContainer.textContent.replace(/[()]/g, ""),
  };
};
