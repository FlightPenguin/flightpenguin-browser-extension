import { PROVIDER_DISPLAY_NAMES_MAP } from "../../background/constants";
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
    this.displayNames = displayNames && displayNames.length ? displayNames : [name];
    this.isFirstParty = isFirstParty;
  }

  getDisplayName(): string {
    const lf = new Intl.ListFormat("en");
    return lf.format(
      this.displayNames.map((name) => {
        const overrideName: string | undefined = PROVIDER_DISPLAY_NAMES_MAP[name];
        return overrideName || name;
      }),
    );
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
}
