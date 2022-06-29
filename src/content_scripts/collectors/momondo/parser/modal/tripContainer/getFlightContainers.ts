import { MissingElementLookupError } from "../../../../../../shared/errors";

const CONTAINER_SELECTOR = "div[class*='segment-info']";

export const getFlightContainers = (tripContainer: HTMLDivElement): HTMLDivElement[] => {
  const flightContainers = tripContainer.querySelectorAll(CONTAINER_SELECTOR) as NodeListOf<HTMLDivElement>;
  if (!flightContainers) {
    throw new MissingElementLookupError("Unable to find flight containers in trip container");
  }
  return Array.from(flightContainers);
};
