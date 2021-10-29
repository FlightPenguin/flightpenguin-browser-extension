interface FlightSegmentInput {
  fromTime: string;
  fromLocalTime: string;
  toTime: string;
  toLocalTime: string;
  duration: string;
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
  fromLocalTime: string;
  toTime: string;
  toLocalTime: string;
  duration: string;
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
  id: string;

  constructor({
    fromTime,
    fromLocalTime,
    toTime,
    toLocalTime,
    duration,
    from,
    to,
    isLayoverStop,
    operatingAirline,
    layout,
  }: FlightSegmentInput) {
    this.fromTime = fromTime;
    this.fromLocalTime = fromLocalTime;
    this.toTime = toTime;
    this.toLocalTime = toLocalTime;
    this.duration = duration;
    this.from = from;
    this.to = to;
    this.isLayoverStop = isLayoverStop;
    this.operatingAirline = operatingAirline;
    this.layout = layout;
    this.id = this.getSegmentId();
  }

  getSegmentId() {
    return `${this.operatingAirline.display}-${this.fromTime}-${this.toTime}`;
  }
}
