import AirlineMap from "../nameMaps/airlineMap";

export interface AirlineInput {
  name: string;
  code?: string;
  color?: string;
  alliance?: string;
}

export class Airline {
  private code: string;
  private color: string;
  private name: string;
  private alliance: string;

  constructor({ name: inputName }: AirlineInput) {
    const { alliance, code, color, display } = AirlineMap.getAirlineDetails(inputName);

    this.code = code;
    this.color = color;
    this.name = display;
    this.alliance = alliance;
  }

  getCode(): string {
    return this.code;
  }

  getColor(): string {
    return this.color;
  }

  getName(): string {
    return this.name;
  }

  getAlliance(): string {
    return this.alliance;
  }
}
