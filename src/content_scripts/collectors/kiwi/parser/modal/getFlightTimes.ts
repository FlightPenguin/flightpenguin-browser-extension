import { MissingElementLookupError } from "../../../../../shared/errors";
import { getDateTimeFromWrapper } from "../../shared/getDateTimeFromWrapper";

const TIME_CONTAINER_SELECTOR = "div[class*='SectorTime']";

export const getFlightTimes = (flightSegmentContainer: HTMLDivElement): { departureTime: Date; arrivalTime: Date } => {
  const timeElements = flightSegmentContainer.querySelectorAll(TIME_CONTAINER_SELECTOR) as NodeListOf<HTMLDivElement>;
  if (timeElements.length !== 2) {
    throw new MissingElementLookupError("Unable to find flight time cells");
  }

  const [departureTimeContainer, arrivalTimeContainer] = timeElements;

  return {
    departureTime: getDateTimeFromWrapper(departureTimeContainer),
    arrivalTime: getDateTimeFromWrapper(arrivalTimeContainer),
  };
};
