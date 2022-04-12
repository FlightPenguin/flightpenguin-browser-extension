import { FlightInput } from "../../../shared/types/Flight";
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
  previousFlightLegDate: Date,
): FlightInput => {
  const airline = getAirline(flightLegContainer);
  const { departureAirport, arrivalAirport } = getAirportNames(flightLegContainer);
  const { departureDateTime: departureLocalDateTime, arrivalDateTime: arrivalLocalDateTime } = getFlightTimes(
    flightLegContainer,
    previousFlightLegDate,
  );
  const rawDuration =
    totalFlightLegCount !== 1 ? getDuration(flightLegContainer) : getDurationTotal(flightLegContainer);

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
