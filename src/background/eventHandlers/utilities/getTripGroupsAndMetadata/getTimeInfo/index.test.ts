import { FlightSearchFormData } from "../../../../../shared/types/FlightSearchFormData";
import { getParsedISODate } from "../../../../../shared/types/utilities/getParsedISODate";
import { getTimeInfo } from ".";

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

describe("getTimeInfo happy path", () => {
  it("works", () => {
    const value = getTimeInfo([[]], formData);
    expect(value).toEqual([
      {
        earliestTime: getParsedISODate("2022-03-31T22:00:00.000Z"),
        intervals: [22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50],
        latestTime: getParsedISODate("2022-04-02T02:00:00.000Z"),
      },
    ]);
  });
});
