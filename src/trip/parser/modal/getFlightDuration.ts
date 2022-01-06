import { MissingElementLookupError, MissingFieldParserError } from "../../../shared/errors";

const DURATION_SELECTOR = "span.duration";

export const getFlightDuration = (container: HTMLDivElement): { duration: string } => {
  const durationContainer = container.querySelector(DURATION_SELECTOR);
  if (!durationContainer) {
    throw new MissingElementLookupError("Unable to find flight leg duration container");
  }

  const rawText = durationContainer.textContent;
  if (!rawText) {
    throw new MissingFieldParserError("Unable to obtain flight leg duration text");
  }

  const duration = rawText.replaceAll(/\s+/g, "");
  return { duration };
};
