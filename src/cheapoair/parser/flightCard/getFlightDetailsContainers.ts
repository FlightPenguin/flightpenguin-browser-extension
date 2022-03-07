import { MissingFieldParserError } from "../../../shared/errors";

const FLIGHT_DETAILS_CONTAINER_SELECTOR = "div[class*='trip row']";

export const getFlightDetailsContainers = (
  flightCard: HTMLElement,
  roundtrip: boolean,
): { departureContainer: HTMLDivElement; returnContainer?: HTMLDivElement } => {
  const flightContainers = flightCard.querySelectorAll(FLIGHT_DETAILS_CONTAINER_SELECTOR) as NodeListOf<HTMLDivElement>;
  if ((roundtrip && flightContainers.length !== 2) || (!roundtrip && flightContainers.length !== 1)) {
    throw new MissingFieldParserError(`Too many flight containers`);
  }

  if (roundtrip) {
    return { departureContainer: flightContainers[0], returnContainer: flightContainers[1] };
  } else {
    return { departureContainer: flightContainers[0] };
  }
};
