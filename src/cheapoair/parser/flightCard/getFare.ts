import { MissingElementLookupError, MissingFieldParserError } from "../../../shared/errors";

const FARE_SELECTOR = "span[class*='currency'][title]";

export const getFare = (flightContainer: HTMLElement): string => {
  const fareElement = flightContainer.querySelector(FARE_SELECTOR) as HTMLSpanElement;

  if (!fareElement) {
    throw new MissingElementLookupError("Unable to locate fare element in container");
  }

  if (!fareElement.title) {
    throw new MissingFieldParserError("Unable to extract fare");
  }

  return Math.ceil(Number(fareElement.title)).toString();
};
