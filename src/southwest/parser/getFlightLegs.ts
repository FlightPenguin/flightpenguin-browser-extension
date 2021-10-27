import { FlightLeg } from "../../shared/types/FlightLeg";
import { Flight } from "../types/Flight";
import { getDurationValue } from "./getDurationValue";
import { getFormattedFlightTimes } from "./getFormattedFlightTimes";

interface GetFlightLegsProps {
  flight: Flight;
}

export const getFlightLegs = ({ flight }: GetFlightLegsProps): FlightLeg[] => {
  return flight.segments
    .map(({ stopsDetails }) => {
      return stopsDetails.map((stop) => {
        const { formattedDepartureDateTime, formattedArrivalDateTime } = getFormattedFlightTimes({
          southwestDepartureDateTime: stop.departureDateTime,
          southwestArrivalDateTime: stop.arrivalDateTime,
        });

        return new FlightLeg({
          fromTime: formattedDepartureDateTime,
          toTime: formattedArrivalDateTime,
          operatingAirline: "Southwest",
          duration: getDurationValue({ minutes: stop.legDuration }),
          from: stop.originationAirportCode,
          to: stop.destinationAirportCode,
        });
      });
    })
    .flat();
};
