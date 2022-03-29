import { getFlightDateFromTimeString } from "../../../shared/parser/getFlightDateFromTimeString";
import { FlightInput } from "../../../shared/types/newtypes/Flight";
import { getDurationInMinutes } from "../../../shared/utilities/getDurationInMinutes";
import { getAirline } from "../shared/getAirline";
import { getAirportNames } from "./getAirportNames";
import { getDuration } from "./getDuration";
import { getDurationTotal } from "./getDurationTotal";
import { getFlightTimes } from "./getFlightTimes";

export const getFlight = (
  flightLegContainer: HTMLDivElement,
  elapsedTimezoneOffset: number,
  totalFlightLegCount: number,
  previousFlightLegDepartureDate: Date,
): FlightInput => {
  const airline = getAirline(flightLegContainer);
  const { departureAirport, arrivalAirport } = getAirportNames(flightLegContainer);
  const { departureTime, arrivalTime, departureDate } = getFlightTimes(
    flightLegContainer,
    previousFlightLegDepartureDate,
  );
  const rawDuration =
    totalFlightLegCount !== 1 ? getDuration(flightLegContainer) : getDurationTotal(flightLegContainer);

  const departureLocalDateTime = getFlightDateFromTimeString(departureTime, departureDate);
  const arrivalLocalDateTime = getFlightDateFromTimeString(arrivalTime, departureLocalDateTime);

  return {
    arrivalLocalDateTime,
    arrivalLocation: { code: arrivalAirport },
    departureLocalDateTime,
    departureLocation: { code: departureAirport },
    durationMinutes: getDurationInMinutes(rawDuration),
    marketingAirline: { name: airline },
    elapsedTimezoneOffset,
  } as FlightInput;
};
