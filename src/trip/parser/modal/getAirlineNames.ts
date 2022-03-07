import { MissingElementLookupError, MissingFieldParserError } from "../../../shared/errors";

const AIRLINE_NAME_REGEX = /(?<airlineName>^.*[a-z])(?<flightCode>[A-Z][A-Z0-9]{1,10}$)/;

export const getAirlineNames = (container: HTMLDivElement): { marketingAirlineName: string } => {
  const nameContainer = container.previousSibling as HTMLDivElement;
  if (!nameContainer) {
    throw new MissingElementLookupError("Unable to find flight leg airline name container");
  }

  if (!nameContainer.className.includes("plane-info")) {
    throw new MissingElementLookupError("Unable to get plane data via sibling");
  }

  const flightNumberElement = nameContainer.querySelector("span");
  if (!flightNumberElement) {
    throw new MissingElementLookupError("Unable to find flight number span");
  }

  const flightElement = flightNumberElement.parentElement as HTMLDivElement;
  if (!flightElement) {
    throw new MissingElementLookupError("Unable to find parent of flight number span");
  }

  if (!flightElement.textContent) {
    throw new MissingFieldParserError("Unable to find text in flight name element container");
  }

  const matches = flightElement.textContent.match(AIRLINE_NAME_REGEX);
  if (!matches || !matches.groups) {
    throw new MissingFieldParserError("Name text does not match regex");
  }

  const airlineName = matches.groups["airlineName"];
  if (!airlineName) {
    throw new MissingFieldParserError("Unable to extract airline name from regex");
  }

  return { marketingAirlineName: airlineName };
};
