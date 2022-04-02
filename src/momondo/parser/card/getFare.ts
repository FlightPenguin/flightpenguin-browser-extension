import { MissingFieldParserError } from "../../../shared/errors";

const FARE_SELECTOR = "span[class='price-text']";

export const getFare = (itineraryCard: HTMLDivElement): string => {
  const fareElement = itineraryCard.querySelector(FARE_SELECTOR);
  if (!fareElement) {
    throw new MissingFieldParserError("Unable to retrieve fare element from card");
  }

  const rawText = fareElement.textContent;
  if (!rawText) {
    throw new MissingFieldParserError("Unable to extract fare text from card");
  }

  return rawText.replace("$", "").replace(/,/g, "").trim();
};
