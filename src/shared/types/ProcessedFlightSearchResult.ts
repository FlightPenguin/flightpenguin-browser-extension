import { AirlineDetails } from "./AirlineDetails";
import { FlightTimeDetails } from "./FlightTimeDetails";

export interface ProcessedFlightSearchResult {
  fromTime: string;
  fromDateTime: Date;
  fromTimeDetails: FlightTimeDetails;
  fromLocalTime: string;
  toTime: string;
  toDateTime: Date;
  toTimeDetails: FlightTimeDetails;
  toLocalTime: string;
  toLocalDateTime: Date;
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

export interface Layover {
  from: string;
  fromTime: string;
  fromLocalTime: string;
  duration: string;
  operatingAirline: AirlineDetails;
  to: string;
  toTime: string;
  toLocalTime: string;
  timezoneOffset: number;
  isLayoverStop: boolean;
}
