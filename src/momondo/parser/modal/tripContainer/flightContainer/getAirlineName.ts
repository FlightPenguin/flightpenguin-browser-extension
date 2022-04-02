import { MissingElementLookupError, MissingFieldParserError } from "../../../../../shared/errors";

const WRAPPER_SELECTOR = "div[class*='carrier-icon']";

export const getAirlineName = (flightContainer: HTMLDivElement): string => {
  const imageWrapper = flightContainer.querySelector(WRAPPER_SELECTOR);
  if (!imageWrapper) {
    throw new MissingElementLookupError("Unable to locate image wrapper for airline");
  }

  const imageElement = imageWrapper.querySelector("img") as HTMLImageElement;
  if (!imageElement) {
    throw new MissingElementLookupError("Unable to find image in wrapper");
  }

  const rawText = imageElement.alt;
  if (!rawText) {
    throw new MissingFieldParserError("Unable to extract alt text for airline name");
  }

  return rawText.trim();
};
