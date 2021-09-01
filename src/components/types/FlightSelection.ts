import { FlightDetails } from "../../shared/types/FlightDetails";
import { Itinerary } from "../../shared/types/Itinerary";

export interface FlightSelection {
  itinerary: Itinerary;
  flight: FlightDetails;
  flightPenguinId: string;
}
