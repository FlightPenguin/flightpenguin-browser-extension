import { TripFactory } from "../../../../../shared/types/factories/Trip";
import { FlightSearchFormData } from "../../../../../shared/types/FlightSearchFormData";
import { getParsedISODate } from "../../../../../shared/types/utilities/getParsedISODate";
import { getEarliestAndLatestTimes, getEarliestTimeDefault } from "./getEarliestAndLatestTimes";

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

describe("getEarliestAndLatestTimes happy path", () => {
  it("works with trips", () => {
    const trip1 = TripFactory.build(
      {},
      {
        transient: {
          arrivalDateTime: getParsedISODate("2022-04-07T11:58:00.000Z"),
          departureDateTime: getParsedISODate("2022-04-07T04:45:00.000Z"),
        },
      },
    );
    const trip2 = TripFactory.build(
      {},
      {
        transient: {
          arrivalDateTime: getParsedISODate("2022-04-07T09:51:00.000Z"),
          departureDateTime: getParsedISODate("2022-04-07T05:00:00.000Z"),
        },
      },
    );

    const value = getEarliestAndLatestTimes(
      [
        { trip: trip1, cabin: "econ", lowestFare: 100 },
        { trip: trip2, cabin: "econ", lowestFare: 98 },
      ],
      formData,
      0,
    );
    expect(value).toEqual({
      earliestTime: getParsedISODate("2022-04-07T04:00:00.000Z"),
      latestTime: getParsedISODate("2022-04-07T12:00:00.000Z"),
    });
  });

  it("works without trips", () => {
    const value = getEarliestAndLatestTimes([], formData, 0);
    expect(value).toEqual({
      earliestTime: getParsedISODate("2022-04-01T00:00:00.000Z"),
      latestTime: getParsedISODate("2022-04-02T00:00:00.000Z"),
    });
  });
});

describe("getEarliestTimeDefault happy path", () => {
  it("first flight", () => {
    const value = getEarliestTimeDefault(formData, 0);
    expect(value).toEqual(getParsedISODate("2022-04-01T00:00:00.000Z"));
  });

  it("second flight", () => {
    const value = getEarliestTimeDefault(formData, 1);
    expect(value).toEqual(getParsedISODate("2022-05-01T00:00:00.000Z"));
  });
});
