import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";

interface GetFilteredFlightsByArrivalTimeProps {
  flights: ProcessedFlightSearchResult[];
  datetime: Date | null;
}

export const getFilteredFlightsByArrivalTime = ({
  flights,
  datetime,
}: GetFilteredFlightsByArrivalTimeProps): ProcessedFlightSearchResult[] => {
  if (datetime && flights.length) {
    return flights.filter((flight) => flight.toDateTime <= datetime);
  }
  return flights;
};
