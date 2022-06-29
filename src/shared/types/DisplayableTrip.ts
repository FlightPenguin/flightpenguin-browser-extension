import { addMinutes } from "date-fns";

import { CabinType } from "../../background/constants";
import { ContainerTimeRangeInput } from "./fragments/ContainerTimeRange";
import { TimebarPosition } from "./fragments/TimebarPosition";
import { Trip, TripInput } from "./Trip";
import { TripComponent } from "./TripComponent";
import { getTimebarPositions } from "./utilities/getTimebarPositions";

export interface DisplayableTripInput {
  cabin: CabinType;
  lowestFare: number;
  bookingSources: string[];
  trip: Trip | TripInput;
  dominatedTripIds?: string[];
  containerInfo: ContainerTimeRangeInput;

  ariaLabelText?: string;
  pain?: number;
  timebarPosition?: TimebarPosition;
  componentTimebarPositions?: TimebarPosition[];
}

export class DisplayableTrip {
  private ariaLabelText;
  private bookingSources: string[];
  private cabin: CabinType;
  private dominatedTripIds: string[];
  private lowestFare: number;
  private pain: number;
  private trip: Trip;

  private containerInfo: ContainerTimeRangeInput;
  private timebarPosition: TimebarPosition;
  private componentTimebarPositions: TimebarPosition[];

  constructor({
    ariaLabelText,
    bookingSources,
    cabin,
    componentTimebarPositions,
    containerInfo,
    dominatedTripIds,
    lowestFare,
    pain,
    timebarPosition,
    trip,
  }: DisplayableTripInput) {
    this.bookingSources = bookingSources;
    this.cabin = cabin;
    this.dominatedTripIds = dominatedTripIds && dominatedTripIds.length ? dominatedTripIds : [];
    this.lowestFare = lowestFare;
    this.trip = trip.constructor.name === "Trip" ? (trip as Trip) : new Trip(trip as TripInput);

    this.pain = pain === undefined ? this.getCalculatedPain() : pain;
    this.ariaLabelText = ariaLabelText || this.getCalculatedAriaLabelText();

    this.containerInfo = containerInfo;
    this.timebarPosition = timebarPosition || this.getCalculatedTimebarPositions();
    this.componentTimebarPositions = componentTimebarPositions || this.getCalculatedTripComponentTimebarPositions();
  }

  getAriaLabelText(): string {
    return this.ariaLabelText;
  }

  getBookingSources(): string[] {
    return this.bookingSources;
  }

  getTrip(): Trip {
    return this.trip;
  }

  getLowestFare(): number {
    return this.lowestFare;
  }

  getPain(): number {
    return this.pain;
  }

  getTimebarPosition(): TimebarPosition {
    return this.timebarPosition;
  }

  getTripComponentsWithPositions(): { tripComponent: TripComponent; layout: TimebarPosition }[] {
    return this.getTrip()
      .getTripComponents()
      .map((tripComponent, index) => {
        return { tripComponent, layout: this.componentTimebarPositions[index as number] };
      });
  }

  getCalculatedPain(): number {
    const tripCost = this.trip.getCalculatedPain(this.cabin);
    return Math.pow(this.lowestFare, 1.05) + tripCost;
  }

  getCalculatedAriaLabelText(): string {
    const airlines = this.getTrip().getCarriers();
    const airlineText = airlines.length === 1 ? this.getTrip().getDisplayCarriers() : "multiple airlines";

    const layoverCount = this.getTrip().getLayoverCount();
    const flightTypeText = layoverCount === 0 ? "direct" : "with multiple flights";

    let tripText = `A ${this.getLowestFare()} dollar trip flying ${flightTypeText} on ${airlineText} from ${this.getTrip()
      .getDepartureLocation()
      .getCode()} at ${this.getTrip().getDisplayDepartureTime()} to ${this.getTrip()
      .getArrivalLocation()
      .getCode()} at ${this.getTrip().getDisplayArrivalTime()}.`;

    if (layoverCount !== 0) {
      const texts = this.getTrip()
        .getTripComponents()
        .map((tripComponent) => {
          return tripComponent.getObject().getAriaLabelText();
        });
      const tripComponentText = texts.join(" ");
      tripText = `${tripText} The details of the individual flights are as follows: ${tripComponentText}`;
    }

    return tripText;
  }

  getCalculatedTimebarPositions(): TimebarPosition {
    const departureTimeInTripStartTz = this.getTrip().getDepartureDateTime();
    const arrivalTimeInTripStartTz = addMinutes(departureTimeInTripStartTz, this.getTrip().getDurationMinutes());

    return getTimebarPositions({
      containerStartTime: this.containerInfo.earliestTime,
      containerEndTime: this.containerInfo.latestTime,
      timebarStartTime: departureTimeInTripStartTz,
      timebarEndTime: arrivalTimeInTripStartTz,
    });
  }

  getCalculatedTripComponentTimebarPositions(): TimebarPosition[] {
    const earliestTime = this.getTrip().getDepartureDateTime();
    const latestTime = addMinutes(earliestTime, this.getTrip().getDurationMinutes());

    return this.getTrip()
      .getTripComponents()
      .map((tripComponent) => {
        const isLayover = tripComponent.getType() === "LAYOVER";
        const { startTime, endTime } = isLayover
          ? {
              startTime: tripComponent.getObject().getArrivalTripStartDateTime(),
              endTime: tripComponent.getObject().getDepartureTripStartDateTime(),
            }
          : {
              startTime: tripComponent.getObject().getDepartureTripStartDateTime(),
              endTime: tripComponent.getObject().getArrivalTripStartDateTime(),
            };

        return getTimebarPositions({
          containerStartTime: earliestTime,
          containerEndTime: latestTime,
          timebarStartTime: startTime,
          timebarEndTime: endTime,
        });
      });
  }

  isDominatableByTrip(otherTrip: DisplayableTrip): boolean {
    return [
      // not the same trip
      this.getTrip().getId() !== otherTrip.getTrip().getId(),
      // basics are equal
      this.getTrip().getCarriers().length === 1,
      otherTrip.getTrip().getCarriers().length === 1, // this is implicit, but we want fast failures...
      this.getTrip().getCarriers().length === otherTrip.getTrip().getCarriers().length,
      this.getTrip().getCarriers()[0] === otherTrip.getTrip().getCarriers()[0],
      this.getTrip().getDepartureAirport().isEqual(otherTrip.getTrip().getDepartureAirport()),
      this.getTrip().getArrivalAirport().isEqual(otherTrip.getTrip().getArrivalAirport()),
      // other trip costs more
      otherTrip.getLowestFare() >= this.getLowestFare(),
      // other trip leaves earlier
      otherTrip.getTrip().getDepartureDateTime() <= this.getTrip().getDepartureDateTime(),
      // other trip arrives later
      otherTrip.getTrip().getArrivalDateTime() >= this.getTrip().getArrivalDateTime(),
    ].every((value) => value);
  }

  addDominatedTripId(badTripId: string): void {
    if (!this.dominatedTripIds.includes(badTripId)) {
      this.dominatedTripIds.push(badTripId);
    }
  }

  getDominatedTripIds(): string[] {
    return this.dominatedTripIds;
  }

  resetDominatedTripIds(): void {
    this.dominatedTripIds = [];
  }

  isEqual(otherTrip: DisplayableTrip): boolean {
    return this.getLowestFare() === otherTrip.getLowestFare() && this.getTrip().isEqual(otherTrip.getTrip());
  }

  isAvailableViaBookingSite(bookingSites: string[] | undefined): boolean {
    if (bookingSites && bookingSites.length >= 1) {
      return this.bookingSources.every(Set.prototype.has, new Set(bookingSites));
    }
    return true;
  }
}
