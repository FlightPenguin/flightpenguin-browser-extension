import { format } from "date-fns-tz";

import { FlightDetails } from "../../shared/types/FlightDetails";
import { Flight } from "../types/Flight";
import { getDurationValue } from "./getDurationValue";
import { getFlightLegs } from "./getFlightLegs";
import { getFormattedFlightTimes } from "./getFormattedFlightTimes";

interface GetFlightDetailsProps {
  flight: Flight;
}

export const getFlightDetails = ({ flight }: GetFlightDetailsProps): FlightDetails => {
  const layovers = getFlightLegs({ flight });
  const { departureDateTime, formattedDepartureDateTime, formattedArrivalDateTime } = getFormattedFlightTimes({
    southwestDepartureDateTime: flight.departureDateTime,
    southwestArrivalDateTime: flight.arrivalDateTime,
  });

  return new FlightDetails({
    departureDate: format(departureDateTime, "yyyy-MM-dd"),
    fromTime: formattedDepartureDateTime,
    toTime: formattedArrivalDateTime,
    marketingAirline: "Southwest",
    duration: getDurationValue({ minutes: Number(flight.totalDuration) }),
    layovers: layovers,
  });
};
