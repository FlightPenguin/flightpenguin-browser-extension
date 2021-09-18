import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../../../../shared/types/ProcessedItinerary";

export const getCheapestItinerary = (
  flight: ProcessedFlightSearchResult,
  itineraries: { [keyof: string]: ProcessedItinerary },
) => {
  return flight.itinIds.map((itinId) => itineraries[itinId]).sort((a, b) => a.fareNumber - b.fareNumber)[0];
};
