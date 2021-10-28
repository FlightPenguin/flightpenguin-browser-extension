import { convertTimeTo24HourClock, getTimezoneOffset } from "../../utilityFunctions";
import AirlineMap from "../nameMaps/airlineMap";
import { getDurationInMinutes } from "../utilities/getDurationInMinutes";
import { getFormatted12HourClockTimeFromTimeDetails } from "../utilities/getFormatted12HourClockTimeFromTimeDetails";
import { getTimeDetailsFromMinutes } from "../utilities/getTimeDetailsFromMinutes";
import { FlightTimeDetails } from "./FlightTimeDetails";

export interface FlightLegInput {
  fromTime: string;
  toTime: string;
  from: string;
  to: string;
  operatingAirline: string;
  duration: string;
  elapsedTimezoneOffset?: number;
}

export class FlightLeg {
  fromTime: string;
  fromTimeDetails: FlightTimeDetails;
  fromLocalTime: string;
  fromLocalTimeDetails: FlightTimeDetails;

  toTime: string;
  toTimeDetails: FlightTimeDetails;
  toLocalTime: string;
  toLocalTimeDetails: FlightTimeDetails;

  from: string;
  to: string;
  duration: string;
  durationMinutes: number;

  operatingAirline: string;
  operatingAirlineDetails: { display: string; color: string };

  timezoneOffset: number;

  constructor({ fromTime, toTime, from, to, operatingAirline, duration, elapsedTimezoneOffset = 0 }: FlightLegInput) {
    this.duration = duration;
    this.durationMinutes = getDurationInMinutes(duration);
    this.timezoneOffset = getTimezoneOffset(fromTime, toTime, duration);

    this.fromLocalTime = fromTime;
    this.fromLocalTimeDetails = this.getTimeDetails(fromTime);
    const { time: departureTime, timeDetails: departureTimeDetails } = this.getTimeInTimezone(
      this.fromLocalTimeDetails,
      elapsedTimezoneOffset,
    );
    this.fromTime = departureTime;
    this.fromTimeDetails = departureTimeDetails;

    const { time: arrivalTime, timeDetails: arrivalTimeDetails } = this.getTimeInTimezone(
      this.fromLocalTimeDetails,
      this.durationMinutes + elapsedTimezoneOffset,
    );
    this.toTime = arrivalTime;
    this.toTimeDetails = arrivalTimeDetails;
    this.toLocalTime = toTime;
    this.toLocalTimeDetails = this.getTimeDetails(toTime);

    this.from = from;
    this.to = to;
    this.operatingAirline = operatingAirline;
    this.operatingAirlineDetails = AirlineMap.getAirlineDetails(operatingAirline);
  }

  getTimeInTimezone(
    flightTimeDetails: FlightTimeDetails,
    minutes: number,
  ): { time: string; timeDetails: FlightTimeDetails } {
    const departureMinutes = flightTimeDetails.hours * 60 + flightTimeDetails.minutes; // do I need excess days?!?
    const elapsedMinutes = minutes + departureMinutes;

    const timeDetails = getTimeDetailsFromMinutes({ minutes: elapsedMinutes });

    return {
      timeDetails,
      time: getFormatted12HourClockTimeFromTimeDetails({ timeDetails }),
    };
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

  // checkMissingExcessDays(): void {
  //   if (!this.toTimeDetails.excessDays) {
  //     // Flying across the date line can cause edge cases where you have flown for a day, but it's the same day.
  //     const [rawDurationHours, rawDurationMinutes] = this.duration.split(/\s+/);
  //     const durationHours = Number(rawDurationHours.replace("h", ""));
  //     const durationMinutes = Number(rawDurationMinutes.replace("m", ""));
  //
  //     const arrivalTimeInMinutes =
  //       ((this.fromTimeDetails.hours % 24) + durationHours) * 60 + durationMinutes + this.fromTimeDetails.minutes;
  //     const excessDays = Math.floor(arrivalTimeInMinutes / 1440);
  //     if (excessDays) {
  //       this.toTimeDetails.excessDays = `+${excessDays}`;
  //       this.toTime += `+${excessDays}`;
  //     }
  //   }
  // }
}
