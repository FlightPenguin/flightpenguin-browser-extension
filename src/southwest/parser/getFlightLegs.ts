import { format } from "date-fns-tz";

import { FlightLeg } from "../../shared/types/FlightLeg";
import { Flight } from "../types/Flight";
import { getDurationValue } from "./getDurationValue";
import { parseSouthwestDateWithTimezone } from "./parseSouthwestDateWithTimezone";

interface GetFlightLegsProps {
  flight: Flight;
}

export const getFlightLegs = ({ flight }: GetFlightLegsProps): FlightLeg[] => {
  return flight.segments
    .map(({ stopsDetails }) => {
      return stopsDetails.map((stop) => {
        const departureDateTime = parseSouthwestDateWithTimezone({ rawDate: stop.departureDateTime });
        const arrivalDateTime = parseSouthwestDateWithTimezone({ rawDate: stop.arrivalDateTime });

        return new FlightLeg({
          fromTime: format(departureDateTime, "h:mmaaa"),
          toTime: format(arrivalDateTime, "h:mmaaa"),
          operatingAirline: "Southwest",
          duration: getDurationValue({ minutes: stop.legDuration }),
          from: stop.originationAirportCode,
          to: stop.destinationAirportCode,
        });
      });
    })
    .flat();
};
