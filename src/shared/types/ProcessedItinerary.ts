import { ProcessedFlightSearchResult } from "./ProcessedFlightSearchResult";

export interface ProcessedItinerary {
  depFlight: ProcessedFlightSearchResult;
  retFlight?: ProcessedFlightSearchResult;
  id: string;
  provider: string;
  windowId: number;
  tabId: number;
  fareNumber: number;
}
