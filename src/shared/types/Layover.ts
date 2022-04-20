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

  ariaLabelText?: string;
  arrivalLocalDisplayTime?: string;
  arrivalTripStartDisplayTime?: string;
  departureLocalDisplayTime?: string;
  departureTripStartDisplayTime?: string;
  durationDisplay?: string;
  id?: string;
}

export class Layover {
  private arrivalLocalDateTime: Date;
  private arrivalLocation: Location;
  private arrivalTripStartDateTime: Date;
  private departureLocalDateTime: Date;
  private departureLocation: Location;
  private departureTripStartDateTime: Date;
  private durationMinutes: number;

  private ariaLabelText: string;
  private arrivalLocalDisplayTime: string;
  private arrivalTripStartDisplayTime: string;
  private departureLocalDisplayTime: string;
  private departureTripStartDisplayTime: string;
  private durationDisplay: string;
  private id: string;
  private type: string;

  constructor({
    ariaLabelText,
    arrivalLocalDateTime,
    arrivalLocalDisplayTime,
    arrivalLocation,
    arrivalTripStartDateTime,
    arrivalTripStartDisplayTime,
    departureLocalDateTime,
    departureLocalDisplayTime,
    departureLocation,
    departureTripStartDateTime,
    departureTripStartDisplayTime,
    durationDisplay,
    durationMinutes,
    id,
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

    this.arrivalLocalDisplayTime = arrivalLocalDisplayTime || this.getCalculatedDisplayArrivalLocalTime();
    this.arrivalTripStartDisplayTime = arrivalTripStartDisplayTime || this.getCalculatedDisplayArrivalTripStartTime();
    this.departureLocalDisplayTime = departureLocalDisplayTime || this.getCalculatedDisplayDepartureLocalTime();
    this.departureTripStartDisplayTime =
      departureTripStartDisplayTime || this.getCalculatedDisplayDepartureTripStartTime();
    this.durationDisplay = durationDisplay || this.getCalculatedDisplayDuration();

    this.id = id ? id : this.getCalculatedId();
    this.ariaLabelText = ariaLabelText || this.getCalculatedAriaLabelText();
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
    return this.arrivalLocalDisplayTime;
  }

  getDisplayArrivalTripStartTime(): string {
    return this.arrivalTripStartDisplayTime;
  }

  getDisplayDepartureLocalTime(): string {
    return this.departureLocalDisplayTime;
  }

  getDisplayDepartureTripStartTime(): string {
    return this.departureTripStartDisplayTime;
  }

  getDisplayDuration(): string {
    return this.durationDisplay;
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

  getCalculatedAriaLabelText(): string {
    return `A layover in ${this.getDepartureLocation().getCode()} lasting for ${this.getDisplayDuration()}.`;
  }

  getCalculatedDisplayArrivalLocalTime(): string {
    return getFormattedTime(this.arrivalLocalDateTime);
  }

  getCalculatedDisplayArrivalTripStartTime(): string {
    return getFormattedTime(this.arrivalTripStartDateTime);
  }

  getCalculatedDisplayDepartureLocalTime(): string {
    const excessDays = differenceInCalendarDays(this.departureLocalDateTime, this.arrivalLocalDateTime);

    return getFormattedTime(this.departureLocalDateTime, excessDays);
  }

  getCalculatedDisplayDepartureTripStartTime(): string {
    const excessDays = differenceInCalendarDays(this.departureTripStartDateTime, this.arrivalTripStartDateTime);

    return getFormattedTime(this.departureTripStartDateTime, excessDays);
  }

  getCalculatedDisplayDuration(): string {
    return getFormattedDuration(this.durationMinutes);
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

  getAriaLabelText(): string {
    return this.ariaLabelText;
  }
}
