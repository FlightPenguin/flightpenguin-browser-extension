import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../../../../shared/types/ProcessedItinerary";

interface IsReadyToRenderResultsInput {
  flights: ProcessedFlightSearchResult[];
  itineraries: { [keyof: string]: ProcessedItinerary };
}

export const isReadyToRenderResults = ({ flights, itineraries }: IsReadyToRenderResultsInput): boolean => {
  return !!flights.length && itineraries && !!Object.keys(itineraries).length;
};
