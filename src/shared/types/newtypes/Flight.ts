import { addMinutes, differenceInCalendarDays } from "date-fns";

import { CabinType } from "../../../background/constants";
import { Airline, AirlineInput } from "./Airline";
import { Location, LocationInput } from "./Location";
import { getFormattedDuration } from "./utilities/getFormattedDuration";
import { getFormattedTime } from "./utilities/getFormattedTime";
import { getParsedISODate } from "./utilities/getParsedISODate";
import { getParsedNumber } from "./utilities/getParsedNumber";
import { getTimebarPositions } from "./utilities/getTimebarPositions";
import { getTimezoneOffset } from "./utilities/getTimezoneOffset";
import { getFlightMultiplier } from "./utilities/pain/flight/getFlightMultiplier";
import { getCabinMultiplier } from "./utilities/pain/shared/getCabinMultiplier";
import { getCostPerMinute } from "./utilities/pain/shared/getCostPerMinute";
import { getSmoothDuration } from "./utilities/pain/shared/getSmoothDuration";

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

  getTimezoneOffset(): number {
    return getTimezoneOffset(this.arrivalDateTime, this.departureDateTime, this.durationMinutes);
  }

  getType(): string {
    return this.type;
  }

  getCalculatedId(): string {
    const airline = this.getAirline();

    return `${this.getDepartureDateTime().valueOf()}-${this.getArrivalDateTime().valueOf()}-${airline.getName()}`;
  }

  getCalculatedPain(cabin: CabinType): number {
    const durationMultiplier = getFlightMultiplier(this);

    const smoothedDuration = getSmoothDuration(this.durationMinutes);
    const cabinMultiplier = getCabinMultiplier(cabin);
    const costPerMinute = getCostPerMinute(durationMultiplier);

    return smoothedDuration * cabinMultiplier * costPerMinute;
  }

  getTimebarPositions({
    containerStartTime,
    containerEndTime,
    containerWidth,
  }: {
    containerStartTime: Date;
    containerEndTime: Date;
    containerWidth: number;
  }): {
    startX: number;
    width: number;
  } {
    const timezoneOffset = this.getTimezoneOffset();
    const arrivalTimeUsingOriginTimezone = addMinutes(this.arrivalDateTime, timezoneOffset * -1);

    return getTimebarPositions({
      containerStartTime,
      containerEndTime,
      containerWidth,
      timebarStartTime: this.departureDateTime,
      timebarEndTime: arrivalTimeUsingOriginTimezone,
    });
  }
}
