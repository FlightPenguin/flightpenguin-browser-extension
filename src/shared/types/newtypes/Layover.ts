import { differenceInCalendarDays } from "date-fns";

import { CabinType } from "../../../background/constants";
import { Airline } from "./Airline";
import { Location, LocationInput } from "./Location";
import { getFormattedDuration } from "./utilities/getFormattedDuration";
import { getFormattedTime } from "./utilities/getFormattedTime";
import { getParsedISODate } from "./utilities/getParsedISODate";
import { getParsedNumber } from "./utilities/getParsedNumber";
import { getTimebarPositions } from "./utilities/getTimebarPositions";
import { getTimezoneOffset } from "./utilities/getTimezoneOffset";
import { getFlightMultiplier } from "./utilities/pain/flight/getFlightMultiplier";
import { getLayoverMultiplier } from "./utilities/pain/layover/getLayoverMultiplier";
import { getCabinMultiplier } from "./utilities/pain/shared/getCabinMultiplier";
import { getCostPerMinute } from "./utilities/pain/shared/getCostPerMinute";
import { getSmoothDuration } from "./utilities/pain/shared/getSmoothDuration";

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

  private id: string;
  private type: string;

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

    this.id = this.getCalculatedId();
  }

  getAirline(): Airline {
    return new Airline({ name: `Layover in ${this.departureLocation.getCode()}` });
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

  getType(): string {
    return this.type;
  }

  getTimezoneOffset(): number {
    return getTimezoneOffset(this.arrivalDateTime, this.departureDateTime, this.durationMinutes);
  }

  getCalculatedId(): string {
    let locationToken = this.getDepartureLocation().getCode();
    if (this.getArrivalLocation() && this.getDepartureLocation().getCode() !== this.getArrivalLocation().getCode()) {
      locationToken = `${locationToken}+${this.getArrivalLocation().getCode()}`;
    }

    return `${this.getDepartureDateTime().valueOf()}-${this.getArrivalDateTime().valueOf()}-${locationToken}`;
  }

  getCalculatedPain(cabin: CabinType): number {
    const durationMultiplier = getLayoverMultiplier(this);

    const smoothedDuration = getSmoothDuration(this.durationMinutes);
    const cabinMultiplier = getCabinMultiplier(cabin);
    const costPerMinute = getCostPerMinute(durationMultiplier);

    return smoothedDuration * cabinMultiplier * costPerMinute;
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
      timebarStartTime: this.arrivalDateTime,
      timebarEndTime: this.departureDateTime,
    });
  }
}
