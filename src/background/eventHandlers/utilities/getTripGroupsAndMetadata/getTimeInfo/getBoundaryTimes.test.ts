import { getParsedISODate } from "../../../../../shared/types/utilities/getParsedISODate";
import { getBoundaryTimes } from "./getBoundaryTimes";

describe("getBoundaryTimes happy path", () => {
  it("adds a full interval onto the front and back", () => {
    const value = getBoundaryTimes(
      getParsedISODate("2022-04-07T00:00:00.000Z"),
      getParsedISODate("2022-04-07T12:00:00.000Z"),
      4,
    );
    expect(value).toEqual({
      lowerBoundary: getParsedISODate("2022-04-06T20:00:00.000Z"),
      upperBoundary: getParsedISODate("2022-04-07T16:00:00.000Z"),
    });
  });

  it("ensures the interval boundary exactly fits the window", () => {
    const value = getBoundaryTimes(
      getParsedISODate("2022-04-07T00:00:00.000Z"),
      getParsedISODate("2022-04-07T13:00:00.000Z"),
      4,
    );
    expect(value).toEqual({
      lowerBoundary: getParsedISODate("2022-04-06T20:00:00.000Z"),
      upperBoundary: getParsedISODate("2022-04-07T20:00:00.000Z"),
    });
  });
});
