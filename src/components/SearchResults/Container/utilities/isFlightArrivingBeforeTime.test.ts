import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";
import { isFlightArrivingBeforeTime } from "./isFlightArrivingBeforeTime";

const flight: ProcessedFlightSearchResult = {
  fromTime: "8:00am",
  fromDateTime: new Date(2020, 10, 1, 8, 0, 0, 0),
  fromLocalTime: "8:00am",
  toTime: "9:30am",
  toDateTime: new Date(2020, 10, 1, 9, 30, 0, 0),
  toLocalTime: "9:30am",
  toLocalDateTime: new Date(2020, 10, 1, 9, 30, 0, 0),
  fromTimeDetails: {
    hours: 8,
    displayHours: 8,
    minutes: 0,
    timeOfDay: "am",
    excessDays: null,
  },
  toTimeDetails: {
    hours: 9,
    displayHours: 9,
    minutes: 30,
    timeOfDay: "am",
    excessDays: null,
  },
  operatingAirline: {
    display: "Southwest",
    color: "#F6C04D",
    code: "WN",
  },
  id: "8:00am-9:30am-Southwest",
  duration: "1h 30m",
  durationMinutes: 90,
  layovers: [],
  itinIds: ["8:00am-9:30am-Southwest-1:00pm-2:30pm-Southwest"],
  timezoneOffset: 0,
  pain: 14,
};
describe("isFlightArrivingBeforeTime happy path", () => {
  it("no time", () => {
    const value = isFlightArrivingBeforeTime({ flight, datetime: null });
    expect(value).toEqual(true);
  });

  it("arrival time before filter", () => {
    const value = isFlightArrivingBeforeTime({
      flight,
      datetime: new Date(2020, 10, 1, 9, 15, 0, 0),
    });
    expect(value).toEqual(false);
  });

  it("arrival time equals filter", () => {
    const value = isFlightArrivingBeforeTime({
      flight,
      datetime: new Date(2020, 10, 1, 9, 30, 0, 0),
    });
    expect(value).toEqual(true);
  });

  it("arrival time after filter", () => {
    const value = isFlightArrivingBeforeTime({
      flight,
      datetime: new Date(2020, 10, 1, 9, 45, 0, 0),
    });
    expect(value).toEqual(true);
  });
});