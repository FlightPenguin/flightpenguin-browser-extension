import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../../../../shared/types/ProcessedItinerary";

export const getFlights = (
  itineraries: ProcessedItinerary[],
  flightType: "DEPARTURE" | "RETURN",
): ProcessedFlightSearchResult[] => {
  return itineraries.map((itinerary) => {
    const flight = flightType === "RETURN" ? itinerary.retFlight : itinerary.depFlight;
    if (!flight) {
      throw new Error(`No ${flightType.toLowerCase()} in itinerary`);
    }
    return flight;
  });
};
