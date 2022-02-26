import { FlightLeg } from "../../../shared/types/FlightLeg";
import { getAirline } from "../shared/getAirline";
import { getFlightTimes } from "../shared/getFlightTimes";
import { getAirportNames } from "./getAirportNames";
import { getDuration } from "./getDuration";
import { getDurationTotal } from "./getDurationTotal";

export const getFlightLegDetails = (
  flightLegContainer: HTMLDivElement,
  elapsedTimezoneOffset: number,
  totalFlightLegCount: number,
): FlightLeg => {
  const airline = getAirline(flightLegContainer);
  const { departureAirport, arrivalAirport } = getAirportNames(flightLegContainer);
  const { departureTime, arrivalTime } = getFlightTimes(flightLegContainer);
  const duration = totalFlightLegCount !== 1 ? getDuration(flightLegContainer) : getDurationTotal(flightLegContainer);

  return new FlightLeg({
    duration,
    elapsedTimezoneOffset,
    from: departureAirport,
    fromTime: departureTime,
    operatingAirline: airline,
    to: arrivalAirport,
    toTime: arrivalTime,
  });
};
