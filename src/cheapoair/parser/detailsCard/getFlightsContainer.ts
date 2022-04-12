import { MissingElementLookupError } from "../../../shared/errors";

const FLIGHT_CONTAINER_SELECTOR = "div[class*='trip row']";

export const getFlightsContainer = (tripContainer: HTMLElement): HTMLDivElement[] => {
  const flightLegContainers = tripContainer.querySelectorAll(FLIGHT_CONTAINER_SELECTOR) as NodeListOf<HTMLDivElement>;
  if (!flightLegContainers || !flightLegContainers.length) {
    throw new MissingElementLookupError("Unable to find flight containers in trip container");
  }

  return Array.from(flightLegContainers);
};
