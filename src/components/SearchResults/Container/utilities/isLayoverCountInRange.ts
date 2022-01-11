import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";

interface IsFlightThroughCityProps {
  flight: ProcessedFlightSearchResult;
  maxLayoverCount: number | undefined;
}

export const isLayoverCountInRange = ({ flight, maxLayoverCount }: IsFlightThroughCityProps): boolean => {
  if (maxLayoverCount !== undefined) {
    return flight.layoverCount <= maxLayoverCount;
  }
  return true;
};
