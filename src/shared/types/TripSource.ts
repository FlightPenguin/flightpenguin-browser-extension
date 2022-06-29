import { BookingSiteMap } from "../nameMaps/bookingSiteMap";
import { getParsedNumber } from "./utilities/getParsedNumber";

export interface TripSourceInput {
  displayNames?: string[];
  fare: number | string;
  id?: string | null;
  isFirstParty: boolean;
  name: string;
}

export class TripSource {
  private displayNames: string[];
  private fare: number;
  private id: string | null;
  private isFirstParty: boolean;
  private name: string;

  constructor({ id, fare, name, displayNames, isFirstParty }: TripSourceInput) {
    this.fare = getParsedNumber(fare);
    this.id = id || null;
    this.name = name;
    this.displayNames = this.getCalculatedDisplayNames(name, displayNames);
    this.isFirstParty = isFirstParty;
  }

  getDisplayName(): string {
    const lf = new Intl.ListFormat("en");
    return lf.format(this.displayNames);
  }

  getDisplayNames(): string[] {
    return this.displayNames;
  }

  getFare(): number {
    return this.fare;
  }

  getId(): string | null {
    return this.id;
  }

  getIsFirstParty(): boolean {
    return this.isFirstParty;
  }

  getName(): string {
    return this.name;
  }

  getCalculatedDisplayNames(name: string, displayNames: string[] | undefined): string[] {
    if (!displayNames) {
      return [name];
    }

    const map = new BookingSiteMap();
    return displayNames.map((name) => {
      const overrideName = map.getMatch(name);
      return overrideName?.name || name;
    });
  }
}
