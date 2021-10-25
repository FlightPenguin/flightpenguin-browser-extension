import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";

interface FilterFlightsByDepartureTimeTimeProps {
  flights: ProcessedFlightSearchResult[];
  datetime: Date | null;
}

export const filterFlightsByDepartureTime = ({
  flights,
  datetime,
}: FilterFlightsByDepartureTimeTimeProps): ProcessedFlightSearchResult[] => {
  if (datetime && flights.length) {
    return flights.filter((flight) => flight.fromDateTime >= datetime);
  }
  return flights;
};
