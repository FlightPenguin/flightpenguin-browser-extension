import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";

export const getEarliestFlight = (flights: ProcessedFlightSearchResult[]): ProcessedFlightSearchResult => {
  return flights.slice().sort((a, b) => a.fromTimeDetails.hours - b.fromTimeDetails.hours)[0];
};
