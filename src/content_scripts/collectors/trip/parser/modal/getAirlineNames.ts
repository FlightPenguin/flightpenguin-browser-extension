import { MissingElementLookupError, MissingFieldParserError } from "../../../../../shared/errors";

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

  const textNode = flightElement.childNodes[0];
  if (!textNode) {
    throw new MissingElementLookupError("unable to get text element in flight name element");
  }

  if (!textNode.textContent) {
    throw new MissingFieldParserError("Unable to extract airline text from text node");
  }

  return { marketingAirlineName: textNode.textContent };
};
