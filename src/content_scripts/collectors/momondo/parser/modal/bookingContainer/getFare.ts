import { MissingElementLookupError, MissingFieldParserError } from "../../../../../../shared/errors";

const FARE_SELECTOR = "span[class*='unit-price']";

export const getFare = (container: HTMLLIElement): string => {
  const fareElement = container.querySelector(FARE_SELECTOR) as HTMLSpanElement;
  if (!fareElement) {
    throw new MissingElementLookupError("Unable to find fare wrapper");
  }

  const text = fareElement.textContent;
  if (!text) {
    throw new MissingFieldParserError("Unable to extract fare text");
  }

  return text.toLowerCase().replace(/[^0-9]/g, "");
};
