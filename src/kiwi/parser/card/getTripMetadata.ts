import { TripInputMetadata } from "../../../shared/types/Trip";
import { getAirports } from "./getAirports";
import { getDuration } from "./getDuration";
import { getFlightTimes } from "./getFlightTimes";

export const getTripMetadata = (tripContainer: HTMLDivElement): TripInputMetadata => {
  const { durationInMinutes } = getDuration(tripContainer);
  const { departureTime, arrivalTime } = getFlightTimes(tripContainer);
  const { departureAirport, arrivalAirport } = getAirports(tripContainer);

  return {
    arrivalLocation: { name: arrivalAirport.name, code: arrivalAirport.code, type: "AIRPORT" },
    arrivalDateTime: arrivalTime,
    departureLocation: { name: departureAirport.name, code: departureAirport.code, type: "AIRPORT" },
    departureDateTime: departureTime,
    durationMinutes: durationInMinutes,
  };
};
