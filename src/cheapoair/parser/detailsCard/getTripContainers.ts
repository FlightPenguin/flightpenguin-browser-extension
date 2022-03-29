import { MissingFieldParserError } from "../../../shared/errors";

const TRIP_CONTAINER_SELECTOR = "section[class*='flight-details row']";

export const getTripContainers = (
  flightCard: HTMLElement,
  roundtrip: boolean,
): { departureContainer: HTMLElement; returnContainer?: HTMLElement } => {
  const tripContainers = flightCard.querySelectorAll(TRIP_CONTAINER_SELECTOR) as NodeListOf<HTMLDivElement>;
  if ((roundtrip && tripContainers.length !== 2) || (!roundtrip && tripContainers.length !== 1)) {
    throw new MissingFieldParserError(`Wrong number of flight containers`);
  }

  if (roundtrip) {
    return { departureContainer: tripContainers[0], returnContainer: tripContainers[1] };
  } else {
    return { departureContainer: tripContainers[0] };
  }
};
