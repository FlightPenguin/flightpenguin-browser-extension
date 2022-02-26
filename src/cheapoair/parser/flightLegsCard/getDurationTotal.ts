import { MissingElementLookupError, MissingFieldParserError } from "../../../shared/errors";

const DURATION_SELECTOR = "span[class*='is--total-trip']";

export const getDurationTotal = (flightLegContainer: HTMLDivElement): string => {
  // When there are no layovers, we only have the trip duration
  const tripContainer = flightLegContainer.parentElement as HTMLElement;

  const durationElement = tripContainer.querySelector(DURATION_SELECTOR) as HTMLSpanElement;

  if (!durationElement) {
    throw new MissingElementLookupError("Unable to locate duration element in container");
  }

  if (!durationElement.textContent) {
    throw new MissingFieldParserError("Unable to extract text from duration element");
  }

  return durationElement.textContent.toLowerCase().replace(/\s+/g, "");
};
