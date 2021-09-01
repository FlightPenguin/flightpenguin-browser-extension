import { ProcessedFlightSearchResult } from "../../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../../shared/types/ProcessedItinerary";

export interface FlightSelection {
  itinerary: ProcessedItinerary;
  flight: ProcessedFlightSearchResult;
  flightPenguinId: string;
}
