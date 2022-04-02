import { FlightInput } from "../../../../shared/types/newtypes/Flight";
import { getTimezoneOffset } from "../../../../shared/types/newtypes/utilities/getTimezoneOffset";
import { getFlightData } from "./flightContainer/getFlightData";
import { getFlightContainers } from "./getFlightContainers";

export const getAllFlightData = (tripContainer: HTMLDivElement, tripDepartureDate: Date): FlightInput[] => {
  let elapsedTimezoneOffset = 0;
  const flightContainers = getFlightContainers(tripContainer);
  return flightContainers.map((flightContainer) => {
    const input = getFlightData(flightContainer, tripDepartureDate, elapsedTimezoneOffset);

    elapsedTimezoneOffset += getTimezoneOffset(
      input.arrivalLocalDateTime as Date,
      input.departureLocalDateTime as Date,
      input.durationMinutes as number,
    );
    return input as FlightInput;
  });
};
