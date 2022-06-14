import { MissingElementLookupError, MissingFieldParserError } from "../../../../../shared/errors";

const AIRLINE_SELECTOR = "span[class*='trip__airline--name']";

export const getAirline = (flightContainer: HTMLDivElement): string => {
  const airlineElement = flightContainer.querySelector(AIRLINE_SELECTOR);

  if (!airlineElement) {
    throw new MissingElementLookupError("Unable to locate airline element in container");
  }

  if (!airlineElement.textContent) {
    throw new MissingFieldParserError("Unable to extract airline name");
  }

  const rawText = airlineElement.textContent;
  return rawText.includes("with others") ? "Multiple airlines" : rawText;
};
