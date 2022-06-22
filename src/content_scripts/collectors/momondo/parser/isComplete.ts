import { MissingElementLookupError, MissingFieldParserError } from "../../../../shared/errors";
import { waitForAppearance } from "../../../../shared/utilities/waitFor";

const MAX_FLIGHTS_SELECTOR = "div[class*='resultsCount']";
const VISITED_SELECTOR = "div[data-fp-visited='true']";
const STREAMING_SELECTOR = "div[class*='listBody' i]";
const STREAMING_PROGRESS_SELECTOR = "[class*='streaming-in-progress' i]";

export const isComplete = async (): Promise<boolean> => {
  const streamingStatus = await isStreamingComplete();
  if (!streamingStatus) {
    return false;
  }

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

const isStreamingComplete = async () => {
  let listElementWrapper = await waitForAppearance(45000, STREAMING_SELECTOR);
  if (!Array.from(listElementWrapper.classList).includes("streaming-in-progress")) {
    return true;
  }
  listElementWrapper = await waitForAppearance(90000, `${STREAMING_SELECTOR}:not(${STREAMING_PROGRESS_SELECTOR})`);
  return !!listElementWrapper;
};
