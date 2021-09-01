interface FlightSegmentInput {
  fromTime: string;
  toTime: string;
  from: string;
  to: string;
  isLayoverStop: boolean;
  operatingAirline: {
    display: string;
    color: string;
  };
  layout: {
    startPosition: number;
    width: number;
  };
}

export class FlightSegment {
  fromTime: string;
  toTime: string;
  from: string;
  to: string;
  isLayoverStop: boolean;
  operatingAirline: {
    display: string;
    color: string;
  };
  layout: {
    startPosition: number;
    width: number;
  };
  name: string;
  id: string;

  constructor({ fromTime, toTime, from, to, isLayoverStop, operatingAirline, layout }: FlightSegmentInput) {
    this.fromTime = fromTime;
    this.toTime = toTime;
    this.from = from;
    this.to = to;
    this.isLayoverStop = isLayoverStop;
    this.operatingAirline = operatingAirline;
    this.layout = layout;
    this.name = this.getDisplayName();
    this.id = this.getSegmentId();
  }

  getDisplayName() {
    let name = `${this.operatingAirline.display} ${this.fromTime} `;
    if (!this.isLayoverStop) {
      name += `(${this.from}) `;
    }
    name += `- ${this.toTime}`;
    if (!this.isLayoverStop) {
      name += ` (${this.to})`;
    }
    return name;
  }

  getSegmentId() {
    return `${this.operatingAirline.display}-${this.fromTime}-${this.toTime}`;
  }
}
