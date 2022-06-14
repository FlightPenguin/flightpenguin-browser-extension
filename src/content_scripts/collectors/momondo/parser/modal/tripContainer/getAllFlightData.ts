import { FlightInput } from "../../../../../../shared/types/Flight";
import { getTimezoneOffset } from "../../../../../../shared/types/utilities/getTimezoneOffset";
import { getFlightData } from "./flightContainer/getFlightData";
import { getFlightContainers } from "./getFlightContainers";

export const getAllFlightData = (tripContainer: HTMLDivElement, tripDepartureDate: Date): FlightInput[] => {
  let elapsedTimezoneOffset = 0;
  let flightDate = tripDepartureDate;
  const flightContainers = getFlightContainers(tripContainer);
  return flightContainers.map((flightContainer) => {
    const input = getFlightData(flightContainer, flightDate, elapsedTimezoneOffset);

    elapsedTimezoneOffset += getTimezoneOffset(
      input.arrivalLocalDateTime as Date,
      input.departureLocalDateTime as Date,
      input.durationMinutes as number,
    );
    flightDate = input.arrivalLocalDateTime as Date;
    return input as FlightInput;
  });
};
