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
    if (operatingAirline) {
      this.operatingAirline = AirlineMap.getAirlineName(operatingAirline);
      this.operatingAirlineDetails = operatingAirline ? AirlineMap.getAirlineDetails(operatingAirline) : null;
    }

    if (marketingAirline) {
      this.marketingAirline = AirlineMap.getAirlineName(marketingAirline);
      this.marketingAirlineDetails = marketingAirline ? AirlineMap.getAirlineDetails(marketingAirline) : null;
    }
    this.layovers = layovers;
    this.timezoneOffset = this.getTimezoneOffset();
    this.id = this.getFlightPenguinId();

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
