import { ParserError } from "../../../../../shared/errors";
import { FlightInput } from "../../../../../shared/types/Flight";
import { getTripContainers } from "./getTripContainers";
import { getAllFlightData } from "./tripContainer/getAllFlightData";

export const getModalData = (
  modal: HTMLDivElement,
  expectedTripCount: number,
  tripDepartureDates: Date[],
): FlightInput[][] => {
  if (expectedTripCount !== tripDepartureDates.length) {
    throw new ParserError("Trip count !== departure date length...");
  }

  const tripContainers = getTripContainers(modal, expectedTripCount);
  return tripContainers.map((tripContainer, index) => {
    const tripDepartureDate = tripDepartureDates[index];
    return getAllFlightData(tripContainer, tripDepartureDate);
  });
};
