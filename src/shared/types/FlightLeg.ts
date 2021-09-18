import { convertTimeTo24HourClock } from "../../utilityFunctions";
import AirlineMap from "../nameMaps/airlineMap";
import { FlightTimeDetails } from "./FlightTimeDetails";

interface FlightLegInput {
  fromTime: string;
  toTime: string;
  from: string;
  to: string;
  operatingAirline: string;
  duration: string;
}

export class FlightLeg {
  fromTime: string;
  toTime: string;
  from: string;
  to: string;
  operatingAirline: string;
  duration: string;
  operatingAirlineDetails: { display: string; color: string };
  fromTimeDetails: FlightTimeDetails;
  toTimeDetails: FlightTimeDetails;

  constructor({ fromTime, toTime, from, to, operatingAirline, duration }: FlightLegInput) {
    this.fromTime = fromTime;
    this.fromTimeDetails = this.getTimeDetails(fromTime);
    this.toTime = toTime;
    this.toTimeDetails = this.getTimeDetails(toTime);
    this.from = from;
    this.to = to;
    this.operatingAirline = operatingAirline;
    this.duration = duration;
    this.operatingAirlineDetails = AirlineMap.getAirlineDetails(operatingAirline);
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
}
