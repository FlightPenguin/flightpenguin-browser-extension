import { Trip, TripInput } from "./Trip";
import { TripSource, TripSourceInput } from "./TripSource";

export interface ItineraryInput {
  source: TripSourceInput;
  trips: TripInput[];
}

export class Itinerary {
  private sources: TripSource[];
  private trips: Trip[];
  private pain: number;

  constructor({ source, trips }: ItineraryInput) {
    this.sources = [new TripSource(source)];
    this.trips = trips.map((trip) => new Trip(trip));
    this.pain = this.getCalculatedPain();
  }

  getPain(): number {
    return this.pain;
  }

  getTopSource(): TripSource {
    const sources = [...this.sources].sort((firstSource, secondSource) => {
      return firstSource.getFare() - secondSource.getFare();
    });
    return sources[0];
  }

  getCalculatedPain(): number {
    return this.trips
      .map((trip) => {
        return trip.getPain();
      })
      .reduce((currentTotal, a) => currentTotal + a, 0);
  }

  addSource(source: TripSource): void {
    this.sources.push(source);
  }
}
