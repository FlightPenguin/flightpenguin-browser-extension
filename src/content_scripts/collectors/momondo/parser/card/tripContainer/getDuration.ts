import { MissingElementLookupError, MissingFieldParserError } from "../../../../../../shared/errors";

const WRAPPER_SELECTOR = "div[class*='duration']";
const CONTENT_SELECTOR = "div[class='top']";

export const getDuration = (tripContainer: HTMLLIElement): string => {
  const durationWrapper = tripContainer.querySelector(WRAPPER_SELECTOR);
  if (!durationWrapper) {
    throw new MissingElementLookupError("Unable to find duration wrapper element");
  }

  const durationElement = durationWrapper.querySelector(CONTENT_SELECTOR) as HTMLDivElement;
  if (!durationElement) {
    throw new MissingElementLookupError("Unable to find duration element");
  }

  const rawText = durationElement.textContent;
  if (!rawText) {
    throw new MissingFieldParserError("Unable to extract trip duration");
  }

  return rawText.trim();
};
