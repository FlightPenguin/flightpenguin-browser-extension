import { MissingElementLookupError, MissingFieldParserError } from "../../../shared/errors";

const DURATION_SELECTOR = "div[class*='flightDuration']";

export const getDuration = (flightLegContainer: HTMLDivElement): string => {
  const durationElement = flightLegContainer.querySelector(DURATION_SELECTOR);

  if (!durationElement) {
    throw new MissingElementLookupError("Unable to locate duration element in container");
  }

  if (!durationElement.textContent) {
    throw new MissingFieldParserError("Unable to extract duration");
  }

  return durationElement.textContent.split(":").slice(-1)[0].toLowerCase().replace(/\s+/g, "");
};
