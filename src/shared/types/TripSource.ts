import { getParsedNumber } from "./utilities/getParsedNumber";

export interface TripSourceInput {
  fare: number | string;
  id?: string | null;
  name: string;
}

export class TripSource {
  private fare: number;
  private id: string | null;
  private name: string;

  constructor({ id, fare, name }: TripSourceInput) {
    this.fare = getParsedNumber(fare);
    this.id = id || null;
    this.name = name;
  }

  getFare(): number {
    return this.fare;
  }

  getId(): string | null {
    return this.id;
  }

  getName(): string {
    return this.name;
  }
}
