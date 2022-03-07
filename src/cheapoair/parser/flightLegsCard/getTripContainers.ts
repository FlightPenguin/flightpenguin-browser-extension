import { MissingFieldParserError } from "../../../shared/errors";

const TRIP_CONTAINER_SELECTOR = "section[class*='flight-details row']";

export const getTripContainers = (
  flightCard: HTMLElement,
  roundtrip: boolean,
): { departureContainer: HTMLElement; returnContainer?: HTMLElement } => {
  const flightContainers = flightCard.querySelectorAll(TRIP_CONTAINER_SELECTOR) as NodeListOf<HTMLDivElement>;
  if ((roundtrip && flightContainers.length !== 2) || (!roundtrip && flightContainers.length !== 1)) {
    throw new MissingFieldParserError(`Too many flight containers`);
  }

  if (roundtrip) {
    return { departureContainer: flightContainers[0], returnContainer: flightContainers[1] };
  } else {
    return { departureContainer: flightContainers[0] };
  }
};
