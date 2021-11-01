import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";

export const getFlightPenguinId = (flight: ProcessedFlightSearchResult): string => {
  return `${flight.operatingAirline.display}-${flight.fromLocalTime}-${flight.toLocalTime}`;
};
