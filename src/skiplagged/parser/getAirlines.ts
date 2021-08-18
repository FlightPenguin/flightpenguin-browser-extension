import { MissingElementLookupError, MissingFieldParserError } from "../../shared/errors";
const TRIP_AIRLINES_SELECTOR = "span.airlines";

export const getAirlines = (flightCard: HTMLElement): string[] => {
  const airlineTooltipContainer = flightCard.querySelector(TRIP_AIRLINES_SELECTOR) as HTMLElement;
  if (!airlineTooltipContainer) {
    throw new MissingElementLookupError("Unable to find airline tooltip container");
  }

  const unparsedHtml = airlineTooltipContainer.dataset?.originalTitle;
  if (!unparsedHtml) {
    throw new MissingFieldParserError("Unable to find original title of tooltip");
  }

  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(unparsedHtml, "text/html");

  const airlineElements = parsedDocument.querySelectorAll("span");
  if (!airlineElements) {
    throw new MissingFieldParserError("Unable to find span in tooltip");
  }

  return Array.from(airlineElements).map((span) => span.textContent || "");
};
