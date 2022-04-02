import { MissingElementLookupError, MissingFieldParserError } from "../../shared/errors";

const MAX_FLIGHTS_SELECTOR = "div[class*='resultsCount']";
const VISITED_SELECTOR = "div[data-fp-visited='true']";

export const isComplete = (): boolean => {
  const maxNumber = Math.min(50, getMaxItineraryNumber());
  return document.querySelectorAll(VISITED_SELECTOR).length >= maxNumber;
};

const getMaxItineraryNumber = (): number => {
  const maxFlightsElement = document.querySelector(MAX_FLIGHTS_SELECTOR);
  if (!maxFlightsElement) {
    throw new MissingElementLookupError("Unable to find max flights container");
  }

  const rawText = maxFlightsElement.textContent;
  if (!rawText) {
    throw new MissingFieldParserError("Unable to extract max flights text");
  }

  return Number(rawText.toLowerCase().split("of")[0].trim());
};
