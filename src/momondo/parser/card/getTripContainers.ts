import { MissingElementLookupError, ParserError } from "../../../shared/errors";

const CONTAINER_SELECTOR = "li[class*='flight']";

export const getTripContainers = (itineraryCard: HTMLDivElement, tripCount: number): HTMLLIElement[] => {
  const containers = itineraryCard.querySelectorAll(CONTAINER_SELECTOR) as NodeListOf<HTMLLIElement>;
  if (!containers.length) {
    throw new MissingElementLookupError("Unable to find trip containers in card");
  }
  if (containers.length !== tripCount) {
    throw new ParserError("Incorrect number of trip containers in card");
  }

  return Array.from(containers);
};
