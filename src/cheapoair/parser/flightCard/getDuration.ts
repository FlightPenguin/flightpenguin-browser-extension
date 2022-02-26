import { MissingElementLookupError, MissingFieldParserError } from "../../../shared/errors";

const DURATION_SELECTOR = "div[class*='stop__trip-duration']";

export const getDuration = (flightContainer: HTMLDivElement): string => {
  const durationElement = flightContainer.querySelector(DURATION_SELECTOR);

  if (!durationElement) {
    throw new MissingElementLookupError("Unable to locate duration element in container");
  }

  if (!durationElement.textContent) {
    throw new MissingFieldParserError("Unable to extract duration");
  }

  return durationElement.textContent.toLowerCase().replace(/\s+/g, "");
};
