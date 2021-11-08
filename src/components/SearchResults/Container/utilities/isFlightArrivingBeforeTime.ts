import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";

interface IsFlightArrivingBeforeTimeProps {
  flight: ProcessedFlightSearchResult;
  datetime: Date | null;
}

export const isFlightArrivingBeforeTime = ({ flight, datetime }: IsFlightArrivingBeforeTimeProps): boolean => {
  if (datetime) {
    return flight.toLocalDateTime <= datetime;
  }
  return true;
};
