import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";

interface FilterFlightsByArrivalTimeProps {
  flights: ProcessedFlightSearchResult[];
  datetime: Date | null;
}

export const filterFlightsByArrivalTime = ({
  flights,
  datetime,
}: FilterFlightsByArrivalTimeProps): ProcessedFlightSearchResult[] => {
  if (datetime && flights.length) {
    return flights.filter((flight) => flight.toDateTime >= datetime);
  }
  return flights;
};
