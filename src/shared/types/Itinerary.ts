import { FlightDetails } from "./FlightDetails";

export interface Itinerary {
  departureFlight: FlightDetails;
  returnFlight: FlightDetails;
  fare: string;
  provider: string;
  currency: string;
  windowId: number;
  tabId: number;
}
