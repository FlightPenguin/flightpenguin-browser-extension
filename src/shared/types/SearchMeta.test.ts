import { FlightSearchFormData } from "./FlightSearchFormData";
import { getSearchTripMetaDefault } from "./SearchMeta";
import { getParsedISODate } from "./utilities/getParsedISODate";

const formData = {
  from: { value: "DTW", key: "", label: "", name: "", location: "", type: "AIRPORT" },
  to: { value: "NYC", key: "", label: "", name: "", location: "", type: "AIRPORT" },
  fromDate: "2022-04-01",
  toDate: "2022-05-01",
  numPax: 1,
  roundtrip: true,
  cabin: "econ",
  searchByPoints: false,
  pointsType: undefined,
} as FlightSearchFormData;

describe("getSearchTripMetaDefault happy path", () => {
  it("works with roundtrip first flight", () => {
    const value = getSearchTripMetaDefault({ ...formData }, 0);
    expect(value).toEqual({
      airlineCount: 0,
      airlines: {},
      airports: [],
      earliestTime: getParsedISODate("2022-04-01T00:00:00.000Z"),
      intervals: [0, 4, 8, 12, 16, 20, 24, 28],
      latestTime: getParsedISODate("2022-04-02T00:00:00.000Z"),
      layoverCounts: [],
    });
  });

  it("works with roundtrip second flight", () => {
    const value = getSearchTripMetaDefault({ ...formData }, 1);
    expect(value).toEqual({
      airlineCount: 0,
      airlines: {},
      airports: [],
      earliestTime: getParsedISODate("2022-05-01T00:00:00.000Z"),
      intervals: [0, 4, 8, 12, 16, 20, 24, 28],
      latestTime: getParsedISODate("2022-05-02T00:00:00.000Z"),
      layoverCounts: [],
    });
  });

  it("works with direct first flight", () => {
    const value = getSearchTripMetaDefault({ ...formData, roundtrip: false }, 0);
    expect(value).toEqual({
      airlineCount: 0,
      airlines: {},
      airports: [],
      earliestTime: getParsedISODate("2022-04-01T00:00:00.000Z"),
      intervals: [0, 4, 8, 12, 16, 20, 24, 28],
      latestTime: getParsedISODate("2022-04-02T00:00:00.000Z"),
      layoverCounts: [],
    });
  });
});
