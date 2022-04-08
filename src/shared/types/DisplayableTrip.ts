import { CabinType } from "../../background/constants";
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

  getAriaLabelText(): string {
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
}
