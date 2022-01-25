import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";

interface IsLayoverCountInRangeProps {
  flight: ProcessedFlightSearchResult;
  layoverCount: number[] | undefined;
}

export const isLayoverCountInRange = ({ flight, layoverCount }: IsLayoverCountInRangeProps): boolean => {
  if (layoverCount && layoverCount.length >= 1) {
    return layoverCount.includes(flight.layoverCount);
  }
  return true;
};
