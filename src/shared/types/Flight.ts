import { FlightDetails } from "./FlightDetails";

export interface Flight {
  id?: string;
  departureFlight: FlightDetails | null;
  returnFlight: FlightDetails | null;
  fare: string | null;
}
