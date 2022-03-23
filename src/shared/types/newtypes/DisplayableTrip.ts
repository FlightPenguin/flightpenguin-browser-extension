import { Trip, TripInput } from "./Trip";

export interface DisplayableTripInput {
  trip: Trip | TripInput;
  lowestFare: number;
  itineraryPainScore: number;
}

export class DisplayableTrip {
  private trip: Trip;
  private lowestFare: number;
  private itineraryPainScore: number;

  constructor({ trip, lowestFare, itineraryPainScore }: DisplayableTripInput) {
    this.trip = trip.constructor.name === "Trip" ? (trip as Trip) : new Trip(trip as TripInput);
    this.lowestFare = lowestFare;
    this.itineraryPainScore = itineraryPainScore;
  }

  getTrip(): Trip {
    return this.trip;
  }

  getLowestFare(): number {
    return this.lowestFare;
  }

  getItineraryPain(): number {
    return this.itineraryPainScore;
  }
}
