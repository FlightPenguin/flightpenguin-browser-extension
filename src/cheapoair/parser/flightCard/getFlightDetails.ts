import { getAirline } from "../shared/getAirline";
import { getFlightTimes } from "../shared/getFlightTimes";
import { getDuration } from "./getDuration";

export const getFlightDetails = (
  flightContainer: HTMLDivElement,
): {
  airline: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
} => {
  const airlineName = getAirline(flightContainer);
  const { departureTime, arrivalTime } = getFlightTimes(flightContainer);
  const duration = getDuration(flightContainer);

  return {
    airline: airlineName,
    departureTime,
    arrivalTime,
    duration,
  };
};
