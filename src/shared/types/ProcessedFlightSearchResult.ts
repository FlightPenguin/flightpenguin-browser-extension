import { AirlineDetails } from "./AirlineDetails";
import { FlightTimeDetails } from "./FlightTimeDetails";

export interface ProcessedFlightSearchResult {
  fromTime: string;
  fromTimeDetails: FlightTimeDetails;
  toTime: string;
  toTimeDetails: FlightTimeDetails;
  operatingAirline: AirlineDetails;
  marketingAirlineText?: string;
  id: string;
  duration: string;
  durationMinutes: number;
  layovers: Layover[];
  itinIds: string[];
  timezoneOffset: number;
  pain: number;
}

interface Layover {
  from: string;
  fromTime: string;
  duration: string;
  operatingAirline: AirlineDetails;
  to: string;
  toTime: string;
  timezoneOffset: number;
}

export const getProcessedSearchResultFlightName = (flight: ProcessedFlightSearchResult) => {
  return `${flight.operatingAirline.display} ${flight.fromTime}-${flight.toTime}`;
};
