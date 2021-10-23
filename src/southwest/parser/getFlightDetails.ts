import { format } from "date-fns-tz";

import { FlightDetails } from "../../shared/types/FlightDetails";
import { Flight } from "../types/Flight";
import { getDurationValue } from "./getDurationValue";
import { getFlightLegs } from "./getFlightLegs";
import { parseSouthwestDateWithTimezone } from "./parseSouthwestDateWithTimezone";

interface GetFlightDetailsProps {
  flight: Flight;
}

export const getFlightDetails = ({ flight }: GetFlightDetailsProps): FlightDetails => {
  const layovers = getFlightLegs({ flight });
  const departureDateTime = parseSouthwestDateWithTimezone({ rawDate: flight.departureDateTime });
  const arrivalDateTime = parseSouthwestDateWithTimezone({ rawDate: flight.arrivalDateTime });

  return new FlightDetails({
    departureDate: format(departureDateTime, "yyyy-MM-dd"),
    fromTime: format(departureDateTime, "h:mmaaa"),
    toTime: format(arrivalDateTime, "h:mmaaa"),
    marketingAirline: "Southwest",
    duration: getDurationValue({ minutes: Number(flight.totalDuration) }),
    layovers: layovers,
  });
};
