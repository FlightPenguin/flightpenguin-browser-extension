import { FlightInput } from "../../../../../shared/types/Flight";
import { getTimezoneOffset } from "../../../../../shared/types/utilities/getTimezoneOffset";
import { getFlight } from "./getFlight";
import { getFlightsContainer } from "./getFlightsContainer";

export const getTripFlights = (tripContainer: HTMLElement, departureDate: Date): FlightInput[] => {
  const flights = [] as FlightInput[];
  let elapsedTimezoneOffset = 0;

  const flightContainers = getFlightsContainer(tripContainer);
  let previousFlightDate = departureDate;
  flightContainers.forEach((flightContainer) => {
    const input = getFlight(flightContainer, elapsedTimezoneOffset, flightContainers.length, previousFlightDate);
    elapsedTimezoneOffset += getTimezoneOffset(
      input.arrivalLocalDateTime as Date,
      input.departureLocalDateTime as Date,
      input.durationMinutes as number,
    );
    previousFlightDate = input.arrivalLocalDateTime as Date;
    flights.push(input);
  });

  return flights;
};
