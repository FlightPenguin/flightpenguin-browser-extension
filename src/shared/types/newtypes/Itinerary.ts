import { Trip, TripInput } from "./Trip";
import { TripSource, TripSourceInput } from "./TripSource";

export interface ItineraryInput {
  sources: TripSourceInput[];
  trips: TripInput[];
}

export class Itinerary {
  private sources: TripSource[];
  private trips: Trip[];

  private id: string;
  private pain: number;

  constructor({ sources, trips }: ItineraryInput) {
    this.sources = sources.map((source) => new TripSource(source));
    this.trips = trips.map((trip) => new Trip(trip));

    this.id = this.getCalculatedFlightPenguinId();
    this.pain = this.getCalculatedPain();
  }

  getId(): string {
    return this.id;
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

  addOrUpdateSource(source: TripSource): void {
    const index = this.sources.findIndex((existing) => {
      return existing.getName() === source.getName();
    });
    if (index >= 0) {
      this.sources[index] = source;
    } else {
      this.sources.push(source);
    }
  }

  getCalculatedFlightPenguinId(): string {
    return this.trips
      .map((trip) => {
        return trip.getId();
      })
      .join("-");
  }
}
