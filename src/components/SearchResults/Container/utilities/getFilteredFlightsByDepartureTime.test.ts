import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";
import { getFilteredFlightsByDepartureTime } from "./getFilteredFlightsByDepartureTime";

const testFlights: ProcessedFlightSearchResult[] = [
  {
    fromTime: "8:00am",
    fromDateTime: new Date(2020, 10, 1, 8, 0, 0, 0),
    toTime: "9:30am",
    toDateTime: new Date(2020, 10, 1, 9, 30, 0, 0),
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
  },
];

describe("getFilteredFlightsByDepartureTime happy path", () => {
  it("no flights", () => {
    const value = getFilteredFlightsByDepartureTime({ flights: [], datetime: new Date(2020, 10, 1, 0, 0, 0, 0) });
    expect(value).toEqual([]);
  });

  it("no time", () => {
    const value = getFilteredFlightsByDepartureTime({ flights: [], datetime: null });
    expect(value).toEqual([]);
  });

  it("departure time before filter", () => {
    const value = getFilteredFlightsByDepartureTime({
      flights: testFlights,
      datetime: new Date(2020, 10, 1, 8, 15, 0, 0),
    });
    expect(value).toEqual([]);
  });

  it("departure time equals filter", () => {
    const value = getFilteredFlightsByDepartureTime({
      flights: testFlights,
      datetime: new Date(2020, 10, 1, 8, 0, 0, 0),
    });
    expect(value).toEqual(testFlights);
  });

  it("departure time after filter", () => {
    const value = getFilteredFlightsByDepartureTime({
      flights: testFlights,
      datetime: new Date(2020, 10, 1, 7, 45, 0, 0),
    });
    expect(value).toEqual(testFlights);
  });
});
