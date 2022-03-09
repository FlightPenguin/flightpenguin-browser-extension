import { differenceInCalendarDays } from "date-fns";

import { Location, LocationInput } from "./Location";
import { getFormattedDuration } from "./utilities/getFormattedDuration";
import { getFormattedTime } from "./utilities/getFormattedTime";
import { getParsedISODate } from "./utilities/getParsedISODate";
import { getParsedNumber } from "./utilities/getParsedNumber";
import { getTimezoneOffset } from "./utilities/getTimezoneOffset";

export interface LayoverInput {
  arrivalDateTime: Date | string;
  arrivalLocation: LocationInput;
  departureDateTime: Date | string;
  departureLocation: LocationInput;
  durationMinutes: number;
}

export class Layover {
  private arrivalLocation: Location;
  private arrivalDateTime: Date;
  private departureLocation: Location;
  private departureDateTime: Date;
  private durationMinutes: number;
  private type: string;
  private pain: number;

  constructor({
    arrivalDateTime,
    arrivalLocation,
    departureDateTime,
    departureLocation,
    durationMinutes,
  }: LayoverInput) {
    this.arrivalDateTime = getParsedISODate(arrivalDateTime);
    this.arrivalLocation = new Location(arrivalLocation);
    this.departureDateTime = getParsedISODate(departureDateTime);
    this.departureLocation = new Location(departureLocation);
    this.durationMinutes = getParsedNumber(durationMinutes);
    this.type = "LAYOVER";

    this.pain = this.getCalculatedPain();
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

  getPain(): number {
    return this.pain;
  }

  getTimezoneOffset(): number {
    return getTimezoneOffset(this.arrivalDateTime, this.departureDateTime, this.durationMinutes);
  }

  getCalculatedPain(): number {
    return 0;
  }
}
