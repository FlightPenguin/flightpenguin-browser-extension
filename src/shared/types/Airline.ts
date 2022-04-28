import AirlineMap from "../nameMaps/airlineMap";

export interface AirlineInput {
  name: string;
  code?: string;
  color?: string;
  alliance?: string;
}

export class Airline {
  private code: string | undefined;
  private color: string;
  private name: string;
  private alliance: string | undefined;

  constructor(airlineInfo: AirlineInput) {
    if (!airlineInfo.color) {
      airlineInfo = this.getAirlineInfo(airlineInfo.name);
    }

    this.code = airlineInfo.code;
    this.color = airlineInfo.color as string;
    this.name = airlineInfo.name;
    this.alliance = airlineInfo.alliance;
  }

  getCode(): string | undefined {
    return this.code;
  }

  getColor(): string {
    return this.color;
  }

  getName(): string {
    return this.name;
  }

  getAlliance(): string | undefined {
    return this.alliance;
  }

  getAirlineInfo(input: string): {
    name: string;
    code?: string;
    color: string;
    alliance?: string;
  } {
    return AirlineMap.getAirlineDetails(input);
  }
}
