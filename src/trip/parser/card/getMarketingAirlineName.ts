import { MissingElementLookupError, MissingFieldParserError } from "../../../shared/errors";

const AIRLINE_NAME_SELECTOR = "div.flights-name";

export const getMarketingAirlineName = (container: HTMLDivElement): { marketingAirline: string } => {
  const airlineNameContainer = container.querySelector(AIRLINE_NAME_SELECTOR);
  if (!airlineNameContainer) {
    throw new MissingElementLookupError("Unable to find flight airline name container");
  }

  const rawText = airlineNameContainer.textContent;
  if (!rawText) {
    throw new MissingFieldParserError("Unable to obtain flight airline name text");
  }

  const marketingAirlineName = rawText.trim();
  return { marketingAirline: marketingAirlineName };
};
