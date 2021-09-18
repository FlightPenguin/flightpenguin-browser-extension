import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";

export const getFlightPenguinId = (flight: ProcessedFlightSearchResult): string => {
  return `${flight.operatingAirline.display}-${flight.fromTime}-${flight.toTime}`;
};
