import { CabinType } from "../../../background/constants";
import { Trip, TripInput } from "./Trip";

export interface DisplayableTripInput {
  cabin: CabinType;
  lowestFare: number;
  trip: Trip | TripInput;
}

export class DisplayableTrip {
  private cabin: CabinType;
  private lowestFare: number;
  private pain: number;
  private trip: Trip;

  constructor({ cabin, lowestFare, trip }: DisplayableTripInput) {
    this.cabin = cabin;
    this.lowestFare = lowestFare;
    this.trip = trip.constructor.name === "Trip" ? (trip as Trip) : new Trip(trip as TripInput);

    this.pain = this.getCalculatedPain();
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

  getCalculatedPain(): number {
    const tripCost = this.trip.getCalculatedPain(this.cabin);
    return Math.pow(this.lowestFare, 1.05) + tripCost;
  }
}
