import { MissingElementLookupError, ParserError } from "../../../../../shared/errors";

const CONTAINER_SELECTOR = "div[class*='leg-summary-container']";

export const getTripContainers = (modal: HTMLDivElement, tripCount: number): HTMLDivElement[] => {
  const containers = modal.querySelectorAll(CONTAINER_SELECTOR) as NodeListOf<HTMLDivElement>;
  if (!containers.length) {
    throw new MissingElementLookupError("Unable to find trip containers in modal");
  }
  if (containers.length !== tripCount) {
    throw new ParserError("Incorrect number of trip containers in modal");
  }

  return Array.from(containers);
};
