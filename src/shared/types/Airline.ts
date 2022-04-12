import AirlineMap from "../nameMaps/airlineMap";

export interface AirlineInput {
  name: string;
  code?: string;
  color?: string;
}

export class Airline {
  private code: string;
  private color: string;
  private name: string;

  constructor({ name: inputName }: AirlineInput) {
    const { code, color, display } = AirlineMap.getAirlineDetails(inputName);

    this.code = code;
    this.color = color;
    this.name = display;
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
}
