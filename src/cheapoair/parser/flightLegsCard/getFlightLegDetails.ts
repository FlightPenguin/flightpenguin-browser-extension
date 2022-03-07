import { FlightLeg } from "../../../shared/types/FlightLeg";
import { getAirline } from "../shared/getAirline";
import { getAirportNames } from "./getAirportNames";
import { getDuration } from "./getDuration";
import { getDurationTotal } from "./getDurationTotal";
import { getFlightTimes } from "./getFlightTimes";

export const getFlightLegDetails = (
  flightLegContainer: HTMLDivElement,
  elapsedTimezoneOffset: number,
  totalFlightLegCount: number,
  previousFlightLegDepartureDate: Date,
): { flightLeg: FlightLeg; legDepartureDate: Date } => {
  const airline = getAirline(flightLegContainer);
  const { departureAirport, arrivalAirport } = getAirportNames(flightLegContainer);
  const { departureTime, arrivalTime, departureDate } = getFlightTimes(
    flightLegContainer,
    previousFlightLegDepartureDate,
  );
  const duration = totalFlightLegCount !== 1 ? getDuration(flightLegContainer) : getDurationTotal(flightLegContainer);

  return {
    flightLeg: new FlightLeg({
      duration,
      elapsedTimezoneOffset,
      from: departureAirport,
      fromTime: departureTime,
      operatingAirline: airline,
      to: arrivalAirport,
      toTime: arrivalTime,
    }),
    legDepartureDate: departureDate,
  };
};
