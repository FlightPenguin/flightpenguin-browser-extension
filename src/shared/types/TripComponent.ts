import { Flight, FlightInput } from "./Flight";
import { Layover, LayoverInput } from "./Layover";

export interface TripComponentInput {
  object: FlightInput | LayoverInput;
  type: "FLIGHT" | "LAYOVER";
}

export class TripComponent {
  private object: Flight | Layover;
  private type: "FLIGHT" | "LAYOVER";

  constructor({ object, type }: TripComponentInput) {
    this.type = type;
    this.object = type === "LAYOVER" ? new Layover(object as LayoverInput) : new Flight(object as FlightInput);
  }

  getType(): string {
    return this.type;
  }

  getObject(): Flight | Layover {
    return this.object;
  }
}
