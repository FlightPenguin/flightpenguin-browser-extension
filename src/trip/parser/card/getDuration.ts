import { MissingElementLookupError, MissingFieldParserError } from "../../../shared/errors";

const DURATION_SELECTOR = "div.flight-info-duration";

export const getDuration = (container: HTMLDivElement): { duration: string } => {
  const durationContainer = container.querySelector(DURATION_SELECTOR);
  if (!durationContainer) {
    throw new MissingElementLookupError("Unable to find flight duration container");
  }

  const rawText = durationContainer.textContent;
  if (!rawText) {
    throw new MissingFieldParserError("Unable to obtain flight duration text");
  }

  const duration = rawText.replaceAll(/\s+/g, "");
  return { duration };
};
