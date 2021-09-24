import { convertTimeTo24HourClock, getTimezoneOffset } from "../../utilityFunctions";
import AirlineMap from "../nameMaps/airlineMap";
import { FlightTimeDetails } from "./FlightTimeDetails";

export interface FlightLegInput {
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
  timezoneOffset: number;

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
    this.timezoneOffset = this.getTimezoneOffset();
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

  getTimezoneOffset(): number {
    return getTimezoneOffset(this.fromTime, this.toTime, this.duration);
  }

  checkMissingExcessDays(): void {
    if (!this.toTimeDetails.excessDays) {
      // Flying across the date line can cause edge cases where you have flown for a day, but it's the same day.
      const [rawDurationHours, rawDurationMinutes] = this.duration.split(/\s+/);
      const durationHours = Number(rawDurationHours.replace("h", ""));
      const durationMinutes = Number(rawDurationMinutes.replace("m", ""));

      const arrivalTimeInMinutes =
        ((this.fromTimeDetails.hours % 24) + durationHours) * 60 + durationMinutes + this.fromTimeDetails.minutes;
      const excessDays = Math.floor(arrivalTimeInMinutes / 1440);
      if (excessDays) {
        this.toTimeDetails.excessDays = `+${excessDays}`;
        this.toTime += `+${excessDays}`;
      }
    }
  }
}
