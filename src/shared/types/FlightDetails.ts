import { addDays, addHours, addMinutes, parse } from "date-fns";

import { convertTimeTo24HourClock, getTimezoneOffset } from "../../utilityFunctions";
import AirlineMap from "../nameMaps/airlineMap";
import { getDurationInMinutes } from "../utilities/getDurationInMinutes";
import { getFormatted12HourClockTimeFromTimeDetails } from "../utilities/getFormatted12HourClockTimeFromTimeDetails";
import { getTimeDetailsFromMinutes } from "../utilities/getTimeDetailsFromMinutes";
import { getTimeStringFromDate } from "../utilities/getTimeStringFromDate";
import { FlightLeg } from "./FlightLeg";
import { FlightTimeDetails } from "./FlightTimeDetails";

interface FlightDetailsInput {
  departureDate: string;
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
  fromDateTime: Date;
  toDateTime: Date;
  toLocalTime: string;
  toLocalTimeDetails: FlightTimeDetails;
  duration: string;
  layovers: FlightLeg[];
  operatingAirline?: string | null;
  operatingAirlineDetails?: { display: string; color: string };
  marketingAirline?: string;
  marketingAirlineDetails?: { display: string; color: string };
  timezoneOffset: number;

  constructor({
    fromTime,
    toTime,
    operatingAirline,
    marketingAirline,
    duration,
    layovers,
    departureDate,
  }: FlightDetailsInput) {
    this.id = this.getFlightPenguinId();
    this.timezoneOffset = getTimezoneOffset(fromTime, toTime, duration);
    this.duration = duration;

    if (operatingAirline) {
      this.operatingAirline = AirlineMap.getAirlineName(operatingAirline);
      this.operatingAirlineDetails = operatingAirline ? AirlineMap.getAirlineDetails(operatingAirline) : null;
    }

    if (marketingAirline) {
      this.marketingAirline = AirlineMap.getAirlineName(marketingAirline);
      this.marketingAirlineDetails = marketingAirline ? AirlineMap.getAirlineDetails(marketingAirline) : null;
    }
    this.layovers = layovers;

    this.fromTime = fromTime;
    this.fromTimeDetails = this.getTimeDetails(fromTime);
    this.fromDateTime = this.getFlightDateTime(departureDate, this.fromTimeDetails);

    this.toLocalTime = toTime;
    this.toLocalTimeDetails = this.getTimeDetails(toTime);
    this.toDateTime = this.getArrivalDateTime(this.fromDateTime, duration);
    this.toTime = getTimeStringFromDate({ date: this.toDateTime, previousFlightDate: this.fromDateTime });
    this.toTimeDetails = this.getTimeDetails(this.toTime);

    this.checkMissingExcessDays();
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

  getFlightDateTime(departureDate: string, timeDetails: FlightTimeDetails): Date {
    let flightDateTime = parse(departureDate, "yyyy-MM-dd", new Date());
    if (timeDetails.excessDays) {
      const excessDays = Number(timeDetails.excessDays.split("+").slice(-1)[0]);
      flightDateTime = addDays(flightDateTime, excessDays);
    }
    if (timeDetails.hours) {
      flightDateTime = addHours(flightDateTime, timeDetails.hours);
    }
    if (timeDetails.minutes) {
      flightDateTime = addMinutes(flightDateTime, timeDetails.minutes);
    }
    return flightDateTime;
  }

  getArrivalDateTime(departureDateTime: Date, duration: string): Date {
    const durationMinutes = getDurationInMinutes(duration);
    return addMinutes(departureDateTime, durationMinutes);
  }

  getFlightPenguinId(): string {
    const airline = this.operatingAirline ? this.operatingAirline : this.marketingAirline;

    return `${this.fromTime}-${this.toTime}-${airline}`;
  }

  getTimezoneOffset(): number {
    return getTimezoneOffset(this.fromTime, this.toTime, this.duration);
  }

  checkMissingExcessDays(): void {
    let excessDays = 0;
    this.layovers.forEach((layover) => {
      if (layover.fromTimeDetails.excessDays) {
        excessDays += Number(layover.fromTimeDetails.excessDays.replace("+", ""));
      }

      if (layover.toTimeDetails.excessDays) {
        excessDays += Number(layover.toTimeDetails.excessDays.replace("+", ""));
      }
    });

    if (excessDays && `+${excessDays}` !== this.toTimeDetails.excessDays) {
      this.toTimeDetails.excessDays = `+${excessDays}`;

      const time = this.toTime.split("+")[0];
      this.toTime = `${time}+${excessDays}`;
    }
  }
}
