import { FlightLeg } from "./FlightLeg";

export interface FlightDetails {
  marketingAirline?: string;
  operatingAirline?: string | null;
  fromTime: string;
  toTime: string;
  duration: string;
  layovers: FlightLeg[];
}
