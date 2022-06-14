import { MissingElementLookupError, MissingFieldParserError } from "../../../../shared/errors";
import { waitForAppearance } from "../../../../shared/utilities/waitFor";

const MAX_FLIGHTS_SELECTOR = "div[class*='resultsCount']";
const VISITED_SELECTOR = "div[data-fp-visited='true']";
const PROGRESS_BAR_SELECTOR = "div[class*='Common-Results-ProgressBar']";
const HIDDEN_SELECTOR = "[class*='Hidden']";

export const isComplete = async (): Promise<boolean> => {
  const progressStatus = await isProgressBarComplete();
  if (!progressStatus) {
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

const isProgressBarComplete = async () => {
  let progressBarElement = await waitForAppearance(30000, PROGRESS_BAR_SELECTOR);
  if (Array.from(progressBarElement.classList).includes("Hidden")) {
    return true;
  }
  progressBarElement = await waitForAppearance(60000, `${PROGRESS_BAR_SELECTOR}${HIDDEN_SELECTOR}`);
  return !!progressBarElement;
};
