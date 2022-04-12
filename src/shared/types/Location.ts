import { getParsedNumber } from "./utilities/getParsedNumber";

export interface LocationInput {
  name?: string;
  code: string;
  type: "AIRPORT" | "CITY";
  geopoint?: string;
  timezone?: string;
  timezoneOffsetFromGMT?: number | string;
}

export class Location {
  private name: string | undefined;
  private code: string;
  private type: "AIRPORT" | "CITY";
  private geopoint: string | undefined;
  private timezone: string | undefined;
  private timezoneOffsetFromGMT: number | undefined;

  constructor({ code, geopoint, name, timezone, timezoneOffsetFromGMT, type }: LocationInput) {
    this.code = code;
    this.geopoint = geopoint;
    this.name = name;
    this.timezone = timezone;
    this.timezoneOffsetFromGMT =
      timezoneOffsetFromGMT === undefined ? timezoneOffsetFromGMT : getParsedNumber(timezoneOffsetFromGMT);
    this.type = type;
  }

  getName(): string | undefined {
    return this.name;
  }

  getCode(): string {
    return this.code;
  }

  getType(): string {
    return this.type;
  }
}
