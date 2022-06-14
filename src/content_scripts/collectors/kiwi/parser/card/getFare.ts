import { MissingElementLookupError, MissingFieldParserError } from "../../../../../shared/errors";

const FARE_ELEMENT_SELECTOR = "strong[class*='PriceText']";

export const getFare = (flightCard: HTMLDivElement): number => {
  const fareContainer = flightCard.querySelector(FARE_ELEMENT_SELECTOR);
  if (!fareContainer) {
    throw new MissingElementLookupError("Unable to find fare container");
  }

  const fare = fareContainer.textContent?.replace(/[^0-9]/gi, "");
  if (!fare) {
    throw new MissingFieldParserError(`Unable to extract fare from ${fareContainer.textContent}`);
  }

  return Number(fare);
};
