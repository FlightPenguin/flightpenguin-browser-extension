import { Trip } from "./Trip";

export interface DisplayableTripInput {
  trip: Trip;
  lowestFare: number;
}

export class DisplayableTrip {
  private trip: Trip;
  private lowestFare: number;

  constructor({ trip, lowestFare }: DisplayableTripInput) {
    this.trip = trip;
    this.lowestFare = lowestFare;
  }

  getTrip(): Trip {
    return this.trip;
  }

  getLowestFare(): number {
    return this.lowestFare;
  }
}
