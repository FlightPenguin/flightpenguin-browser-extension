import { differenceInCalendarDays } from "date-fns";

import { CabinType } from "../../background/constants";
import { Airline } from "./Airline";
import { Location, LocationInput } from "./Location";
import { getFormattedDuration } from "./utilities/getFormattedDuration";
import { getFormattedTime } from "./utilities/getFormattedTime";
import { getParsedISODate } from "./utilities/getParsedISODate";
import { getParsedNumber } from "./utilities/getParsedNumber";
import { getTimebarPositions } from "./utilities/getTimebarPositions";
import { getTimezoneOffset } from "./utilities/getTimezoneOffset";
import { getLayoverMultiplier } from "./utilities/pain/layover/getLayoverMultiplier";
import { getCabinMultiplier } from "./utilities/pain/shared/getCabinMultiplier";
import { getCostPerMinute } from "./utilities/pain/shared/getCostPerMinute";
import { getSmoothDuration } from "./utilities/pain/shared/getSmoothDuration";

export interface LayoverInput {
  arrivalLocalDateTime: Date | string;
  arrivalLocation: Location | LocationInput;
  arrivalTripStartDateTime: Date | string;
  departureLocalDateTime: Date | string;
  departureLocation: Location | LocationInput;
  departureTripStartDateTime: Date | string;
  durationMinutes: number;
}

export class Layover {
  private arrivalLocalDateTime: Date;
  private arrivalLocation: Location;
  private arrivalTripStartDateTime: Date;
  private departureLocalDateTime: Date;
  private departureLocation: Location;
  private departureTripStartDateTime: Date;
  private durationMinutes: number;

  private id: string;
  private type: string;

  constructor({
    arrivalLocalDateTime,
    arrivalLocation,
    arrivalTripStartDateTime,
    departureLocalDateTime,
    departureLocation,
    departureTripStartDateTime,
    durationMinutes,
  }: LayoverInput) {
    this.arrivalLocalDateTime = getParsedISODate(arrivalLocalDateTime);
    this.arrivalLocation =
      arrivalLocation.constructor.name === "Location"
        ? (arrivalLocation as Location)
        : new Location(arrivalLocation as LocationInput);
    this.arrivalTripStartDateTime = getParsedISODate(arrivalTripStartDateTime);
    this.departureLocalDateTime = getParsedISODate(departureLocalDateTime);
    this.departureLocation =
      departureLocation.constructor.name === "Location"
        ? (departureLocation as Location)
        : new Location(departureLocation as LocationInput);
    this.departureTripStartDateTime = getParsedISODate(departureTripStartDateTime);
    this.durationMinutes = getParsedNumber(durationMinutes);
    this.type = "LAYOVER";

    this.id = this.getCalculatedId();
  }

  getAirline(): Airline {
    // Please excuse the janky name and type abuse
    return new Airline({ name: `Layover in ${this.departureLocation.getCode()}` });
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

  getType(): string {
    return this.type;
  }

  getTimezoneOffset(): number {
    return getTimezoneOffset(this.departureLocalDateTime, this.arrivalLocalDateTime, this.durationMinutes);
  }

  getCalculatedId(): string {
    let locationToken = this.getDepartureLocation().getCode();
    if (this.getArrivalLocation() && this.getDepartureLocation().getCode() !== this.getArrivalLocation().getCode()) {
      locationToken = `${locationToken}+${this.getArrivalLocation().getCode()}`;
    }

    return `${this.getDepartureLocalDateTime().valueOf()}-${this.getArrivalLocalDateTime().valueOf()}-${locationToken}`;
  }

  getCalculatedPain(cabin: CabinType): number {
    const durationMultiplier = getLayoverMultiplier(this);

    const smoothedDuration = getSmoothDuration(this.durationMinutes);
    const cabinMultiplier = getCabinMultiplier(cabin);
    const costPerMinute = getCostPerMinute(cabinMultiplier);

    return smoothedDuration * durationMultiplier * cabinMultiplier * costPerMinute;
  }

  isTransfer(): boolean {
    return this.departureLocation.getCode() !== this.arrivalLocation.getCode();
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
      timebarStartTime: this.arrivalTripStartDateTime,
      timebarEndTime: this.departureTripStartDateTime,
    });
  }
}
