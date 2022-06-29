import { CurrencyMismatchError, MissingFieldParserError } from "../../../../../shared/errors";
import { setCurrencyToUSD } from "../currency/setCurrencyToUSD";

const FARE_SELECTOR = "span[class='price-text']";

export const getFare = async (itineraryCard: HTMLDivElement): Promise<string> => {
  const fareElement = itineraryCard.querySelector(FARE_SELECTOR);
  if (!fareElement) {
    throw new MissingFieldParserError("Unable to retrieve fare element from card");
  }

  const rawText = fareElement.textContent;
  if (!rawText) {
    throw new MissingFieldParserError("Unable to extract fare text from card");
  }

  if (!rawText.includes("$")) {
    await setCurrencyToUSD();
    throw new CurrencyMismatchError("Not set to USD");
  }

  return rawText.replace("$", "").replace(/,/g, "").trim();
};
