import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";

interface IsFlightDepartingAfterTimeProps {
  flight: ProcessedFlightSearchResult;
  datetime: Date | null;
}

export const isFlightDepartingAfterTime = ({ flight, datetime }: IsFlightDepartingAfterTimeProps): boolean => {
  if (datetime) {
    return flight.fromDateTime >= datetime;
  }
  return true;
};
