import { MissingElementLookupError, MissingFieldParserError } from "../../../../../shared/errors";
import { getDurationInMinutes } from "../../../../../shared/utilities/getDurationInMinutes";

const DURATION_CONTAINER_SELECTOR = 'div[data-test="TripDurationBadge"]';

export const getDuration = (tripContainer: HTMLDivElement): { duration: string; durationInMinutes: number } => {
  const durationContainer = tripContainer.querySelector(DURATION_CONTAINER_SELECTOR) as HTMLDivElement;
  if (!durationContainer) {
    throw new MissingElementLookupError("Unable to locate trip metadata duration");
  }

  const duration = durationContainer.textContent;
  if (!duration) {
    throw new MissingFieldParserError("Unable to extract trip metadata duration");
  }

  return { duration, durationInMinutes: getDurationInMinutes(duration) };
};
