import { CabinType } from "../../background/constants";
import { DisplayableTrip } from "./DisplayableTrip";
import { Trip, TripInput } from "./Trip";
import { TripSource, TripSourceInput } from "./TripSource";

export interface ItineraryInput {
  sources: TripSourceInput[];
  trips: TripInput[];
  cabin: CabinType;

  id?: string;
  pain?: number;
}

export class Itinerary {
  private sources: TripSource[];
  private trips: Trip[];
  private cabin: CabinType;

  private id: string;
  private pain: number;

  constructor({ sources, trips, cabin, id, pain }: ItineraryInput) {
    this.sources = sources.map((source) => new TripSource(source));
    this.trips = trips.map((trip) => new Trip(trip));
    this.cabin = cabin;

    this.id = id || this.getCalculatedFlightPenguinId();
    this.pain = pain === undefined ? this.getCalculatedPain() : pain;
  }

  getCabin(): CabinType {
    return this.cabin;
  }

  getId(): string {
    return this.id;
  }

  getPain(): number {
    return this.pain;
  }

  getTrips(): Trip[] {
    return this.trips;
  }

  getTopSource(): TripSource {
    const sources = [...this.sources].sort((firstSource, secondSource) => {
      return firstSource.getFare() - secondSource.getFare();
    });
    return sources[0];
  }

  getCalculatedPain(): number {
    const tripsCost = this.trips
      .map((trip) => {
        return trip.getCalculatedPain(this.cabin);
      })
      .reduce((a, b) => {
        return a + b;
      });

    return Math.pow(this.getTopSource().getFare(), 1.05) + tripsCost;
  }

  addOrUpdateSource(source: TripSource): void {
    const index = this.sources.findIndex((existing) => {
      return existing.getDisplayName() === source.getDisplayName();
    });
    if (index >= 0) {
      const existingSource = this.sources[index];
      if (existingSource.getName() === source.getName()) {
        // if sources have identical names, take the latest copy
        // page may have died, etc.  Recent is better
        this.sources[index] = source;
      } else {
        // a metasearch engine is returning data for an OTA we search.
        const bestSource = existingSource.getFare() > source.getFare() ? source : existingSource;
        this.sources[index] = bestSource;
      }
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

  getMaxIndexMatch(selectedTrips: DisplayableTrip[]): number {
    if (selectedTrips.length === 0) {
      return 0;
    }

    let index = 0;
    let matching = true;

    while (matching) {
      const itineraryTrip = this.trips[index];
      const selectedTrip = selectedTrips[index] && selectedTrips[index].getTrip();
      matching = selectedTrip && itineraryTrip.getId() === selectedTrip.getId();
      if (matching) {
        index += 1;
      }
    }
    return index;
  }

  isDenyListed(): boolean {
    let deny = false;
    this.trips.forEach((trip) => {
      if (trip.getCarriers().includes("Southwest") || trip.getCarriers().includes("WN")) {
        deny = true;
      }
    });
    return deny;
  }
}
