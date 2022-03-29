import { MissingFieldParserError } from "../../../shared/errors";

const TRIP_DETAILS_CONTAINER_SELECTOR = "div[class*='trip row']";

export const getTripDetailsContainers = (
  card: HTMLElement,
  roundtrip: boolean,
): { departureContainer: HTMLDivElement; returnContainer?: HTMLDivElement } => {
  const tripContainers = card.querySelectorAll(TRIP_DETAILS_CONTAINER_SELECTOR) as NodeListOf<HTMLDivElement>;
  if ((roundtrip && tripContainers.length !== 2) || (!roundtrip && tripContainers.length !== 1)) {
    throw new MissingFieldParserError(`Wrong quantity of flight containers`);
  }

  if (roundtrip) {
    return { departureContainer: tripContainers[0], returnContainer: tripContainers[1] };
  } else {
    return { departureContainer: tripContainers[0] };
  }
};
