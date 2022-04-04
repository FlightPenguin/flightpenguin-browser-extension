import { FlightInput } from "../../../../../shared/types/Flight";
import { getDurationInMinutes } from "../../../../../shared/utilities/getDurationInMinutes";
import { getAirlineName } from "./getAirlineName";
import { getArrivalInfo } from "./getArrivalInfo";
import { getDepartureInfo } from "./getDepartureInfo";
import { getDuration } from "./getDuration";

export const getFlightData = (
  flightContainer: HTMLDivElement,
  flightDate: Date,
  elapsedTimezoneOffset: number,
): FlightInput => {
  const { arrivalTime: arrivalLocalDateTime, arrivalAirport: arrivalLocation } = getArrivalInfo(
    flightContainer,
    flightDate,
  );
  const { departureTime: departureLocalDateTime, departureAirport: departureLocation } = getDepartureInfo(
    flightContainer,
    flightDate,
  );
  const marketingAirlineName = getAirlineName(flightContainer);
  const rawDuration = getDuration(flightContainer);

  return {
    arrivalLocalDateTime,
    arrivalLocation,
    departureLocalDateTime,
    departureLocation,
    durationMinutes: getDurationInMinutes(rawDuration),
    marketingAirline: { name: marketingAirlineName },
    elapsedTimezoneOffset,
  } as FlightInput;
};
