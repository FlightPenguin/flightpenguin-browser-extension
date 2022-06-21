import { ParserError } from "../../../../../shared/errors";
import { FlightInput } from "../../../../../shared/types/Flight";
import { TripSourceInput } from "../../../../../shared/types/TripSource";
import { getBookingContainers } from "../getBookingContainers";
import { getTripSourceInput } from "./bookingContainer/getTripSourceInput";
import { getTripContainers } from "./getTripContainers";
import { getAllFlightData } from "./tripContainer/getAllFlightData";

export const getModalData = (
  modal: HTMLDivElement,
  expectedTripCount: number,
  tripDepartureDates: Date[],
  id: string,
): { flightInputs: FlightInput[][]; sourceInputs: TripSourceInput[] } => {
  if (expectedTripCount !== tripDepartureDates.length) {
    throw new ParserError("Trip count !== departure date length...");
  }

  const tripContainers = getTripContainers(modal, expectedTripCount);
  const flightInputs = tripContainers.map((tripContainer, index) => {
    const tripDepartureDate = tripDepartureDates[index];
    return getAllFlightData(tripContainer, tripDepartureDate);
  });

  const bookingContainers = getBookingContainers(modal);
  const sourceInputs = bookingContainers.map((container) => {
    return getTripSourceInput(container, id);
  });

  return { flightInputs, sourceInputs };
};
