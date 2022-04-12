import { MissingElementLookupError, MissingFieldParserError } from "../../../../../shared/errors";

const DURATION_SELECTOR = "div[class*='duration-text']";

export const getDuration = (flightContainer: HTMLDivElement): string => {
  const durationElement = flightContainer.querySelector(DURATION_SELECTOR) as HTMLDivElement;
  if (!durationElement) {
    throw new MissingElementLookupError("Unable to find duration element");
  }

  const rawText = durationElement.textContent;
  if (!rawText) {
    throw new MissingFieldParserError("Unable to extract trip duration");
  }

  return rawText.trim();
};
