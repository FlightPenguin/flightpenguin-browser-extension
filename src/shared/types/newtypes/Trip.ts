import { differenceInCalendarDays } from "date-fns";

import { Flight } from "./Flight";
import { Layover } from "./Layover";
import { Location, LocationInput } from "./Location";
import { TripComponent, TripComponentInput } from "./TripComponent";
import { getFormattedDuration } from "./utilities/getFormattedDuration";
import { getFormattedTime } from "./utilities/getFormattedTime";
import { getParsedISODate } from "./utilities/getParsedISODate";
import { getParsedNumber } from "./utilities/getParsedNumber";
import { getTimezoneOffset } from "./utilities/getTimezoneOffset";

export interface TripInputMetadata {
  arrivalDateTime: Date;
  arrivalLocation: LocationInput;
  departureDateTime: Date;
  departureLocation: LocationInput;
  durationMinutes: number | string;
}

export interface TripInput extends TripInputMetadata {
  tripComponents: TripComponentInput[];
}

export class Trip {
  // effectively a group of flights+layovers that take you from location A to location B.
  private arrivalDateTime: Date;
  private arrivalLocation: Location;
  private departureDateTime: Date;
  private departureLocation: Location;
  private durationMinutes: number;
  private tripComponents: TripComponent[];

  private carriers: string[];
  private id: string;
  private layoverCount: number;
  private layoverAirportCodes: string[];
  private pain: number;

  constructor({
    arrivalDateTime,
    arrivalLocation,
    departureDateTime,
    departureLocation,
    durationMinutes,
    tripComponents,
  }: TripInput) {
    this.arrivalDateTime = getParsedISODate(arrivalDateTime);
    this.arrivalLocation = new Location(arrivalLocation);
    this.departureDateTime = getParsedISODate(departureDateTime);
    this.departureLocation = new Location(departureLocation);
    this.durationMinutes = getParsedNumber(durationMinutes);
    this.tripComponents = tripComponents.map((tripComponent) => {
      return new TripComponent(tripComponent);
    });

    this.carriers = this.getCalculatedCarriers();
    this.id = this.getCalculatedId();
    this.layoverAirportCodes = this.getCalculatedLayoverAirportCodes();
    this.layoverCount = this.getCalculatedLayoverCount();
    this.pain = this.getCalculatedPain();
  }

  getArrivalDateTime(): Date {
    return this.arrivalDateTime;
  }

  getArrivalLocation(): Location {
    return this.arrivalLocation;
  }

  getCarriers(): string[] {
    return this.carriers;
  }

  getDisplayCarriers(): string {
    return this.carriers.join(", ");
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

  getLayoverAirportCodes(): string[] {
    return this.layoverAirportCodes;
  }

  getLayoverCount(): number {
    return this.layoverCount;
  }

  getPain(): number {
    return this.pain;
  }

  getTimezoneOffset(): number {
    return getTimezoneOffset(this.arrivalDateTime, this.departureDateTime, this.durationMinutes);
  }

  getTripComponents(): TripComponent[] {
    return this.tripComponents;
  }

  getFlights(): Flight[] {
    return this.tripComponents
      .filter((tripComponent) => {
        return tripComponent.getType() === "FLIGHT";
      })
      .map((tripComponent) => {
        return tripComponent.getObject() as Flight;
      });
  }

  getLayovers(): Layover[] {
    return this.tripComponents
      .filter((tripComponent) => {
        return tripComponent.getType() === "LAYOVER";
      })
      .map((tripComponent) => {
        return tripComponent.getObject() as Layover;
      });
  }

  getCalculatedCarriers(): string[] {
    const flights = this.getFlights();
    const airlineNames = flights.map((flight) => flight.getAirline().getName());
    return Array.from(new Set(airlineNames));
  }

  getCalculatedId(): string {
    const flights = this.getFlights();
    return flights
      .map((flight) => {
        return flight.getId();
      })
      .join("-");
  }

  getCalculatedLayoverAirportCodes(): string[] {
    const layovers = this.getLayovers();
    const departureAirportCodes = layovers.map((layover) => layover.getDepartureLocation().getCode());
    const arrivalAirportCodes = layovers.map((layover) => layover.getArrivalLocation().getCode());
    return Array.from(new Set([...departureAirportCodes, ...arrivalAirportCodes]));
  }

  getCalculatedLayoverCount(): number {
    const layovers = this.getLayovers();
    return layovers.length;
  }

  getCalculatedPain(): number {
    return this.tripComponents
      .map((tripComponent) => {
        return tripComponent.getObject().getPain();
      })
      .reduce((currentTotal, a) => currentTotal + a, 0);
  }

  isArrivingBeforeTime(boundaryTime: Date | null): boolean {
    if (!boundaryTime) {
      return true;
    }
    return this.arrivalDateTime <= boundaryTime;
  }

  isDepartingAfterTime(boundaryTime: Date | null): boolean {
    if (!boundaryTime) {
      return true;
    }
    return this.departureDateTime >= boundaryTime;
  }

  isLayoverCountInRange(layoverCount: number[] | undefined): boolean {
    if (layoverCount && layoverCount.length >= 1) {
      return layoverCount.includes(this.layoverCount);
    }
    return true;
  }

  isLayoverInCity(layoverCityCodes: string[] | undefined): boolean {
    if (layoverCityCodes && layoverCityCodes.length >= 1) {
      return layoverCityCodes.every((city) => this.layoverAirportCodes.includes(city));
    }
    return true;
  }

  isFlownByCarriers(carriers: string[] | undefined): boolean {
    if (carriers && carriers.length >= 1) {
      return this.carriers.every((carrier) => carriers.includes(carrier));
    }
    return true;
  }
}
