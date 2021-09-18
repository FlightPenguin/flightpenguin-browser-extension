import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../../../../shared/types/ProcessedItinerary";

export const getFlights = (
  itineraries: ProcessedItinerary[],
  flightType: "DEPARTURE" | "RETURN",
): ProcessedFlightSearchResult[] => {
  const flights = itineraries.map((itinerary) => {
    return flightType === "RETURN" ? itinerary.retFlight : itinerary.depFlight;
  });
  if (!flights || !flights.length) {
    throw new Error(`No ${flightType.toLowerCase()} in itineraries`);
  }
  return flights as ProcessedFlightSearchResult[];
};
