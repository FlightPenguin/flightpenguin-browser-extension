import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";

export const getTableTimeBounds = (
  earliestFlight: ProcessedFlightSearchResult,
  latestFlight: ProcessedFlightSearchResult,
  buffer = 2,
): { lowerBound: number; upperBound: number } => {
  return {
    lowerBound: Math.max(earliestFlight.fromTimeDetails.hours - buffer, 0),
    upperBound: latestFlight.toTimeDetails.hours + buffer,
  };
};
