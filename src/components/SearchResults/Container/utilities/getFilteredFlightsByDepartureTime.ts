import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";

interface GetFilteredFlightsByDepartureTimeTimeProps {
  flights: ProcessedFlightSearchResult[];
  datetime: Date | null;
}

export const getFilteredFlightsByDepartureTime = ({
  flights,
  datetime,
}: GetFilteredFlightsByDepartureTimeTimeProps): ProcessedFlightSearchResult[] => {
  if (datetime && flights.length) {
    return flights.filter((flight) => flight.fromDateTime >= datetime);
  }
  return flights;
};
