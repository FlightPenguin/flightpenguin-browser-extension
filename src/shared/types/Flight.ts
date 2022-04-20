import { addMinutes, differenceInCalendarDays } from "date-fns";

import { CabinType } from "../../background/constants";
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
  elapsedTimezoneOffset: number;
  marketingAirline: AirlineInput;
  operatingAirline?: AirlineInput;

  ariaLabelText?: string;
  arrivalLocalDisplayTime?: string;
  arrivalTripStartDateTime?: Date | string;
  arrivalTripStartDisplayTime?: string;
  departureLocalDisplayTime?: string;
  departureTripStartDateTime?: Date | string;
  departureTripStartDisplayTime?: string;
  descriptionDisplayText?: string;
  durationDisplay?: string;
  id?: string;
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

  private ariaLabelText: string;
  private arrivalLocalDisplayTime: string;
  private arrivalTripStartDisplayTime: string;
  private departureLocalDisplayTime: string;
  private departureTripStartDisplayTime: string;
  private descriptionDisplayText: string;
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
    descriptionDisplayText,
    durationDisplay,
    durationMinutes,
    elapsedTimezoneOffset,
    id,
    marketingAirline,
    operatingAirline,
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

    this.departureTripStartDateTime = departureTripStartDateTime
      ? getParsedISODate(departureTripStartDateTime)
      : this.getCalculatedDepartureTripStartDateTime(this.departureLocalDateTime, this.elapsedTimezoneOffset);
    this.arrivalTripStartDateTime = arrivalTripStartDateTime
      ? getParsedISODate(arrivalTripStartDateTime)
      : this.getCalculatedArrivalTripStartDateTime(this.departureTripStartDateTime, this.durationMinutes);

    this.arrivalLocalDisplayTime = arrivalLocalDisplayTime || this.getCalculatedDisplayArrivalLocalTime();
    this.arrivalTripStartDisplayTime = arrivalTripStartDisplayTime || this.getCalculatedDisplayArrivalTripStartTime();
    this.departureLocalDisplayTime = departureLocalDisplayTime || this.getCalculatedDisplayDepartureLocalTime();
    this.departureTripStartDisplayTime =
      departureTripStartDisplayTime || this.getCalculatedDisplayDepartureTripStartTime();
    this.durationDisplay = durationDisplay || this.getCalculatedDisplayDuration();

    this.id = id
      ? id
      : this.getCalculatedId(this.getAirline(), this.getDepartureLocalDateTime(), this.getArrivalLocalDateTime());
    this.ariaLabelText = ariaLabelText || this.getCalculatedAriaLabelText();
    this.descriptionDisplayText = descriptionDisplayText || this.getCalculatedDisplayDescriptionText();
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

  getDisplayDescriptionText(): string {
    return this.descriptionDisplayText;
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

  getTimezoneOffset(): number {
    return getTimezoneOffset(this.arrivalLocalDateTime, this.departureLocalDateTime, this.durationMinutes);
  }

  getType(): string {
    return this.type;
  }

  getCalculatedAriaLabelText(): string {
    return `${this.getAirline().getName()} flight leaving ${this.getDepartureLocation().getCode()} at ${this.getDisplayDepartureLocalTime()} and arriving in ${this.getArrivalLocation().getCode()} at ${this.getDisplayArrivalLocalTime()}.`;
  }

  getCalculatedArrivalTripStartDateTime(departureTime: Date, durationMinutes: number): Date {
    return addMinutes(departureTime, durationMinutes);
  }

  getCalculatedDepartureTripStartDateTime(departureLocalTime: Date, elapsedTimezoneOffset: number): Date {
    return addMinutes(departureLocalTime, elapsedTimezoneOffset * -1);
  }

  getCalculatedDisplayArrivalLocalTime(): string {
    const excessDays = differenceInCalendarDays(this.arrivalLocalDateTime, this.departureLocalDateTime);

    return getFormattedTime(this.arrivalLocalDateTime, excessDays);
  }

  getCalculatedDisplayArrivalTripStartTime(): string {
    const excessDays = differenceInCalendarDays(this.arrivalTripStartDateTime, this.departureTripStartDateTime);

    return getFormattedTime(this.arrivalTripStartDateTime, excessDays);
  }

  getCalculatedDisplayDepartureLocalTime(): string {
    return getFormattedTime(this.departureLocalDateTime);
  }

  getCalculatedDisplayDepartureTripStartTime(): string {
    return getFormattedTime(this.departureTripStartDateTime);
  }

  getCalculatedDisplayDescriptionText(): string {
    let text = `${this.getAirline().getName()}`;
    text += "\n";
    text += `Departs from ${this.getDepartureLocation().getCode()} at ${this.getDisplayDepartureLocalTime()} local time`;
    text += "\n";
    text += `Arrives at ${this.getArrivalLocation().getCode()} at ${this.getDisplayArrivalLocalTime()} local time`;
    text += "\n";
    text += `Flight duration of ${this.getDisplayDuration()}`;
    return text;
  }

  getCalculatedDisplayDuration(): string {
    return getFormattedDuration(this.durationMinutes);
  }

  getCalculatedId(airline: Airline, departureTime: Date, arrivalTime: Date): string {
    return `${departureTime.valueOf()}-${arrivalTime.valueOf()}-${airline.getName()}`;
  }

  getCalculatedPain(cabin: CabinType): number {
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

  getAriaLabelText(): string {
    return this.ariaLabelText;
  }
}
