import { getAirline } from "../shared/getAirline";
import { getFlightTimes } from "../shared/getFlightTimes";
import { getDuration } from "./getDuration";

export const getTripDetails = (
  tripContainer: HTMLDivElement,
): {
  airline: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
} => {
  const airlineName = getAirline(tripContainer);
  const { departureTime, arrivalTime } = getFlightTimes(tripContainer);
  const duration = getDuration(tripContainer);

  return {
    airline: airlineName,
    departureTime,
    arrivalTime,
    duration,
  };
};
