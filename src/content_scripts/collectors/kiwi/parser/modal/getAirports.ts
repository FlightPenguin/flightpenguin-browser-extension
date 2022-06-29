import { MissingElementLookupError, MissingFieldParserError } from "../../../../../shared/errors";
import { AirportDetails } from "../../../../../shared/types/AirportDetails";

const AIRPORT_CONTAINER_SELECTOR = "div[class*='SectorPlace-']";
const AIRPORT_CITY_NAME_SELECTOR = "[class*='SectorPlaceText']";
const AIRPORT_NAME_SELECTOR = "div[class*='SectorPlaceWrapper']";

const AIRPORT_REGEX = /(?<airportName>.*)\s*\((?<airportCode>[A-Za-z0-9]{3})\)/;

export const getAirports = (
  container: HTMLDivElement,
): { departureAirport: AirportDetails; arrivalAirport: AirportDetails } => {
  const airportContainers = container.querySelectorAll(AIRPORT_CONTAINER_SELECTOR) as NodeListOf<HTMLDivElement>;
  if (airportContainers.length !== 2) {
    throw new MissingElementLookupError("Unable to find flight airport cells");
  }

  const [departureAirportContainer, arrivalAirportContainer] = airportContainers;

  return {
    departureAirport: getAirportDetails(departureAirportContainer),
    arrivalAirport: getAirportDetails(arrivalAirportContainer),
  };
};

const getAirportDetails = (airportContainer: HTMLDivElement): AirportDetails => {
  const city = getAirportCity(airportContainer);
  const { name, code } = getAirport(airportContainer);

  return { city, name, code };
};

const getAirportCity = (airportContainer: HTMLDivElement): string => {
  const cityContainer = airportContainer.querySelector(AIRPORT_CITY_NAME_SELECTOR);
  if (!cityContainer) {
    throw new MissingElementLookupError("Unable to find city container");
  }

  const city = cityContainer.textContent;
  if (!city) {
    throw new MissingFieldParserError("Unable to extract city name");
  }

  return city;
};

const getAirport = (airportContainer: HTMLDivElement): { name: string; code: string } => {
  const airportNameContainer = airportContainer.querySelector(AIRPORT_NAME_SELECTOR);
  if (!airportNameContainer) {
    throw new MissingElementLookupError("Unable to find airport name container");
  }

  const airportText = airportNameContainer.textContent;
  if (!airportText) {
    throw new MissingFieldParserError("Unable to extract airport name");
  }

  const matchInfo = airportText.match(AIRPORT_REGEX);
  if (!matchInfo) {
    throw new Error(`${airportText} does not match regex`);
  }

  const airportInfo = matchInfo.groups;
  if (!airportInfo) {
    throw new Error(`Unknown groups: ${airportInfo}`);
  }
  if (!airportInfo.airportName) {
    throw new MissingFieldParserError("Unable to extract airport name");
  }
  if (!airportInfo.airportCode) {
    throw new MissingFieldParserError("Unable to extract airport code");
  }

  return { name: airportInfo.airportName, code: airportInfo.airportCode };
};
