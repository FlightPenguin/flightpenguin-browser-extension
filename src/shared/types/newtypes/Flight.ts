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
  arrivalLocalDateTime: Date | string;
  arrivalLocation: LocationInput;
  departureLocalDateTime: Date | string;
  departureLocation: LocationInput;
  durationMinutes: number | string;
  marketingAirline: AirlineInput;
  operatingAirline?: AirlineInput;
  elapsedTimezoneOffset: number;
}

export class Flight {
  private arrivalLocalDateTime: Date;
  private arrivalLocation: Location;
  private arrivalTripStartDateTime: Date;
  private departureLocalDateTime: Date;
  private departureLocation: Location;
  private departureTripStartDateTime: Date;
  private durationMinutes: number;
  private elapsedTimezoneOffset: number;
  private marketingAirline: Airline;
  private operatingAirline?: Airline;

  private id: string;
  private type: string;

  constructor({
    arrivalLocalDateTime,
    arrivalLocation,
    departureLocalDateTime,
    departureLocation,
    durationMinutes,
    marketingAirline,
    operatingAirline,
    elapsedTimezoneOffset,
  }: FlightInput) {
    this.arrivalLocalDateTime = getParsedISODate(arrivalLocalDateTime);
    this.arrivalLocation = new Location(arrivalLocation);
    this.departureLocalDateTime = getParsedISODate(departureLocalDateTime);
    this.departureLocation = new Location(departureLocation);
    this.durationMinutes = getParsedNumber(durationMinutes);
    this.elapsedTimezoneOffset = elapsedTimezoneOffset;
    this.marketingAirline = new Airline(marketingAirline);
    this.operatingAirline = operatingAirline ? new Airline(operatingAirline) : undefined;
    this.type = "FLIGHT";

    this.departureTripStartDateTime = this.getCalculatedDepartureTripStartDateTime(
      this.departureLocalDateTime,
      this.elapsedTimezoneOffset,
    );
    this.arrivalTripStartDateTime = this.getCalculatedArrivalTripStartDateTime(
      this.departureTripStartDateTime,
      this.durationMinutes,
    );
    this.id = this.getCalculatedId(this.getAirline(), this.getDepartureLocalDateTime(), this.getArrivalLocalDateTime());
  }

  getAirline(): Airline {
    return this.operatingAirline ? this.operatingAirline : this.marketingAirline;
  }

  getArrivalLocalDateTime(): Date {
    return this.arrivalLocalDateTime;
  }

  getArrivalLocation(): Location {
    return this.arrivalLocation;
  }

  getArrivalTripStartDateTime(): Date {
    return this.arrivalTripStartDateTime;
  }

  getDepartureLocalDateTime(): Date {
    return this.departureLocalDateTime;
  }

  getDepartureLocation(): Location {
    return this.departureLocation;
  }

  getDepartureTripStartDateTime(): Date {
    return this.departureTripStartDateTime;
  }

  getDisplayArrivalLocalTime(): string {
    const excessDays = differenceInCalendarDays(this.arrivalLocalDateTime, this.departureLocalDateTime);

    return getFormattedTime(this.arrivalLocalDateTime, excessDays);
  }

  getDisplayArrivalTripStartTime(): string {
    const excessDays = differenceInCalendarDays(this.arrivalTripStartDateTime, this.departureTripStartDateTime);

    return getFormattedTime(this.arrivalTripStartDateTime, excessDays);
  }

  getDisplayDepartureLocalTime(): string {
    return getFormattedTime(this.departureLocalDateTime);
  }

  getDisplayDepartureTripStartTime(): string {
    return getFormattedTime(this.departureTripStartDateTime);
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
    return getTimezoneOffset(this.arrivalLocalDateTime, this.departureLocalDateTime, this.durationMinutes);
  }

  getType(): string {
    return this.type;
  }

  getCalculatedArrivalTripStartDateTime(departureTime: Date, durationMinutes: number): Date {
    return addMinutes(departureTime, durationMinutes);
  }

  getCalculatedDepartureTripStartDateTime(departureLocalTime: Date, elapsedTimezoneOffset: number): Date {
    return addMinutes(departureLocalTime, elapsedTimezoneOffset * -1);
  }

  getCalculatedId(airline: Airline, departureTime: Date, arrivalTime: Date): string {
    return `${departureTime.valueOf()}-${arrivalTime.valueOf()}-${airline.getName()}`;
  }

  getCalculatedPain(cabin: CabinType, debug = false): number {
    const durationMultiplier = getFlightMultiplier(this);

    const smoothedDuration = getSmoothDuration(this.durationMinutes);
    const cabinMultiplier = getCabinMultiplier(cabin);
    const costPerMinute = getCostPerMinute(cabinMultiplier);

    return smoothedDuration * durationMultiplier * cabinMultiplier * costPerMinute;
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
    return getTimebarPositions({
      containerStartTime,
      containerEndTime,
      containerWidth,
      timebarStartTime: this.departureTripStartDateTime,
      timebarEndTime: this.arrivalTripStartDateTime,
    });
  }
}
