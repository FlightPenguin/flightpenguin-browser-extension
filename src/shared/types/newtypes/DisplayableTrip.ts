import { Trip, TripInput } from "./Trip";

export interface DisplayableTripInput {
  trip: Trip | TripInput;
  lowestFare: number;
}

export class DisplayableTrip {
  private trip: Trip;
  private lowestFare: number;

  constructor({ trip, lowestFare }: DisplayableTripInput) {
    this.trip = trip.constructor.name === "Trip" ? (trip as Trip) : new Trip(trip as TripInput);
    this.lowestFare = lowestFare;
  }

  getTrip(): Trip {
    return this.trip;
  }

  getLowestFare(): number {
    return this.lowestFare;
  }
}
