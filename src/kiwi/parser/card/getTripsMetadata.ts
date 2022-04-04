import { MissingElementLookupError, MissingFieldParserError } from "../../../shared/errors";
import { TripInputMetadata } from "../../../shared/types/Trip";
import { getTripMetadata } from "./getTripMetadata";

const TRIP_CONTAINER_SELECTOR = "div[class*='ResultCardSection'][class*='ResultCardItinerary']";

interface GetTripsMetadata {
  flightCard: HTMLDivElement;
  roundtrip: boolean;
}

export const getTripsMetadata = ({ flightCard, roundtrip }: GetTripsMetadata): TripInputMetadata[] => {
  const tripContainers = getTripContainers({ flightCard, roundtrip });
  return tripContainers.map((tripContainer) => {
    return getTripMetadata(tripContainer);
  });
};

const getTripContainers = ({ flightCard, roundtrip }: GetTripsMetadata): HTMLDivElement[] => {
  const tripSections = flightCard.querySelectorAll(TRIP_CONTAINER_SELECTOR) as NodeListOf<HTMLDivElement>;
  if (!tripSections) {
    throw new MissingElementLookupError("Unable to find trip containers in flight card");
  }

  if (!tripSections.length) {
    throw new MissingFieldParserError("No trip sections present");
  }

  const expectedQuantity = roundtrip ? 2 : 1;
  if (tripSections.length !== expectedQuantity) {
    throw new MissingFieldParserError(`Expected ${expectedQuantity} trip sections, found ${tripSections.length}`);
  }

  return Array.from(tripSections);
};
