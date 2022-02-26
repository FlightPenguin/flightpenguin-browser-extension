import { UnprocessedFlightSearchResult } from "../../shared/types/UnprocessedFlightSearchResult";

export interface CheapoAirFlight extends UnprocessedFlightSearchResult {
  cheapoAirId: string;
  id: string;
}
