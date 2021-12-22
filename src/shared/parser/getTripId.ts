import { ParserError } from "../errors";
import { getFlightId } from "./getFlightId";

interface FlightInput {
  departureTime: string;
  arrivalTime: string;
  airlineName: string;
}

interface GetTripIdInput {
  departureFlight: FlightInput;
  returnFlight: FlightInput | null;
}

export const getTripId = ({ departureFlight, returnFlight }: GetTripIdInput): string => {
  if (
    !departureFlight.departureTime ||
    !departureFlight.arrivalTime ||
    !departureFlight.airlineName ||
    (!!returnFlight && !returnFlight.departureTime) ||
    (!!returnFlight && !returnFlight.arrivalTime) ||
    (!!returnFlight && !returnFlight.airlineName)
  ) {
    throw new ParserError("Invalid input for getTripId");
  }

  const departureFlightId = getFlightId({ ...departureFlight });
  if (returnFlight) {
    const returnFlightId = getFlightId({ ...returnFlight });
    return `${departureFlightId}-${returnFlightId}`;
  }
  return departureFlightId;
};
