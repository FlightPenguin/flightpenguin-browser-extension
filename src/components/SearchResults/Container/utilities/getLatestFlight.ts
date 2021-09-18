import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";

export const getLatestFlight = (flights: ProcessedFlightSearchResult[]): ProcessedFlightSearchResult => {
  return flights.slice().sort((a, b) => b.toTimeDetails.hours - a.toTimeDetails.hours)[0];
};
