import { ParserError } from "../errors";
import AirlineMap from "../nameMaps/airlineMap";

interface GetFlightIdInput {
  departureTime: string;
  arrivalTime: string;
  airlineName: string;
}

export const getFlightId = ({ departureTime, arrivalTime, airlineName }: GetFlightIdInput): string => {
  if (!departureTime || !arrivalTime || !airlineName) {
    throw new ParserError("Invalid flight id input");
  }
  const cleanName = AirlineMap.getAirlineName(airlineName);

  return `${departureTime}-${arrivalTime}-${cleanName}`;
};
