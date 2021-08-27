import { convertTimeTo24HourClock, getTimezoneOffset } from "../../utilityFunctions";
import AirlineMap from "../nameMaps/airlineMap";
import { FlightLeg } from "./FlightLeg";
import { FlightTimeDetails } from "./FlightTimeDetails";

interface FlightDetailsInput {
  marketingAirline?: string;
  operatingAirline?: string | null;
  fromTime: string;
  toTime: string;
  duration: string;
  layovers: FlightLeg[];
}

export class FlightDetails {
  id: string;
  fromTime: string;
  toTime: string;
  fromTimeDetails: FlightTimeDetails;
  toTimeDetails: FlightTimeDetails;
  duration: string;
  layovers: FlightLeg[];
  operatingAirline?: string | null;
  operatingAirlineDetails?: { display: string; color: string };
  marketingAirline?: string;
  marketingAirlineDetails?: { display: string; color: string };
  timezoneOffset: number;

  constructor({ fromTime, toTime, operatingAirline, marketingAirline, duration, layovers }: FlightDetailsInput) {
    this.fromTime = fromTime;
    this.fromTimeDetails = this.getTimeDetails(fromTime);
    this.toTime = toTime;
    this.toTimeDetails = this.getTimeDetails(toTime);
    this.duration = duration;
    this.operatingAirline = operatingAirline;
    this.operatingAirlineDetails = AirlineMap.getAirlineDetails(operatingAirline);
    this.marketingAirline = marketingAirline;
    this.marketingAirlineDetails = AirlineMap.getAirlineDetails(marketingAirline);
    this.layovers = layovers;
    this.timezoneOffset = getTimezoneOffset(fromTime, toTime, duration);
    this.id = this.getFlightPenguinId();
  }

  getTimeDetails(time: string): FlightTimeDetails {
    const { hours, minutes } = convertTimeTo24HourClock(time, true);
    const timeOfDay = time.toLowerCase().includes("pm") ? "pm" : "am";
    const excessDays = time.match(/(\+\d)/);
    const displayHours = Number(time.split(":")[0]); // want 12 hour clock

    return {
      hours,
      displayHours,
      minutes,
      timeOfDay,
      excessDays: excessDays ? excessDays[0] : excessDays,
    };
  }

  getFlightPenguinId() {
    return `${this.operatingAirline}-${this.fromTime}-${this.toTime}`;
  }
}
