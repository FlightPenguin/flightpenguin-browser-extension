import { MissingElementLookupError, MissingFieldParserError } from "../../../../../shared/errors";
import { getDurationInMinutes } from "../../../../../shared/utilities/getDurationInMinutes";

const DURATION_CONTAINER_SELECTOR = "div[class*='SectorFlightCell']";

export const getDuration = (
  flightSegmentContainer: HTMLDivElement,
): { durationText: string; durationInMinutes: number } => {
  const container = flightSegmentContainer.querySelector(DURATION_CONTAINER_SELECTOR);
  if (!container) {
    throw new MissingElementLookupError("Unable to find duration container");
  }

  const timeElement = container.querySelector("time") as HTMLTimeElement;
  if (!timeElement) {
    throw new MissingElementLookupError("Unable to locate duration datetime element");
  }

  const durationText = timeElement.textContent;
  if (!durationText) {
    throw new MissingFieldParserError("Unable to extract duration");
  }

  const durationInMinutes = getDurationInMinutes(durationText);

  return { durationText, durationInMinutes };
};
