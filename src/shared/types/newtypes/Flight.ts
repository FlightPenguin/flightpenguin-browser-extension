import { differenceInCalendarDays } from "date-fns";

import { Airline, AirlineInput } from "./Airline";
import { Location, LocationInput } from "./Location";
import { getFormattedDuration } from "./utilities/getFormattedDuration";
import { getFormattedTime } from "./utilities/getFormattedTime";
import { getParsedISODate } from "./utilities/getParsedISODate";
import { getParsedNumber } from "./utilities/getParsedNumber";
import { getTimezoneOffset } from "./utilities/getTimezoneOffset";

export interface FlightInput {
  arrivalDateTime: Date;
  arrivalLocation: LocationInput;
  departureDateTime: Date;
  departureLocation: LocationInput;
  durationMinutes: number | string;
  marketingAirline: AirlineInput;
  operatingAirline?: AirlineInput;
}

export class Flight {
  private arrivalDateTime: Date;
  private arrivalLocation: Location;
  private departureDateTime: Date;
  private departureLocation: Location;
  private durationMinutes: number;
  private marketingAirline: Airline;
  private operatingAirline?: Airline;

  private id: string;
  private pain: number;
  private type: string;

  constructor({
    arrivalDateTime,
    arrivalLocation,
    departureDateTime,
    departureLocation,
    durationMinutes,
    marketingAirline,
    operatingAirline,
  }: FlightInput) {
    this.arrivalDateTime = getParsedISODate(arrivalDateTime);
    this.arrivalLocation = new Location(arrivalLocation);
    this.departureDateTime = getParsedISODate(departureDateTime);
    this.departureLocation = new Location(departureLocation);
    this.durationMinutes = getParsedNumber(durationMinutes);
    this.marketingAirline = new Airline(marketingAirline);
    this.operatingAirline = operatingAirline ? new Airline(operatingAirline) : undefined;
    this.type = "FLIGHT";

    this.id = this.getCalculatedId();
    this.pain = this.getCalculatedPain();
  }

  getAirline(): Airline {
    return this.operatingAirline ? this.operatingAirline : this.marketingAirline;
  }

  getArrivalDateTime(): Date {
    return this.arrivalDateTime;
  }

  getArrivalLocation(): Location {
    return this.arrivalLocation;
  }

  getDepartureDateTime(): Date {
    return this.departureDateTime;
  }

  getDepartureLocation(): Location {
    return this.departureLocation;
  }

  getDisplayArrivalTime(): string {
    const excessDays = differenceInCalendarDays(this.arrivalDateTime, this.departureDateTime);

    return getFormattedTime(this.arrivalDateTime, excessDays);
  }

  getDisplayDepartureTime(): string {
    return getFormattedTime(this.departureDateTime);
  }

  getDisplayDuration(): string {
    return getFormattedDuration(this.durationMinutes);
  }

  getDurationMinutes(): number {
    return this.durationMinutes;
  }

  getId(): string {
    return this.id;
  }

  getPain(): number {
    return this.pain;
  }

  getTimezoneOffset(): number {
    return getTimezoneOffset(this.arrivalDateTime, this.departureDateTime, this.durationMinutes);
  }

  getType(): string {
    return this.type;
  }

  getCalculatedId(): string {
    const airline = this.getAirline();

    return `${this.getDisplayDepartureTime()}-${this.getArrivalDateTime()}-${airline.getName()}`;
  }

  getCalculatedPain(): number {
    return 0;
  }
}
