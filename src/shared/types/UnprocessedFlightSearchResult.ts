import { FlightDetails } from "./FlightDetails";

export interface UnprocessedFlightSearchResult {
  id?: string;
  departureFlight: FlightDetails | null;
  returnFlight: FlightDetails | null;
  fare: string | null;
}
