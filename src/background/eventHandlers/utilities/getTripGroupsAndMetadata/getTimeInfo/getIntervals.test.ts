import { getParsedISODate } from "../../../../../shared/types/utilities/getParsedISODate";
import { getIntervals } from "./getIntervals";

describe("getIntervals happy path", () => {
  it("includes the latest time when % increment !== 0", () => {
    const value = getIntervals(
      getParsedISODate("2022-04-07T00:00:00.000Z"),
      getParsedISODate("2022-04-07T12:00:00.000Z"),
      3,
    );
    expect(value).toEqual({ intervals: [0, 3, 6, 9, 12] });
  });

  it("does not go over the latest time when % increment !== 0", () => {
    const value = getIntervals(
      getParsedISODate("2022-04-07T00:00:00.000Z"),
      getParsedISODate("2022-04-07T13:00:00.000Z"),
      2,
    );
    expect(value).toEqual({ intervals: [0, 2, 4, 6, 8, 10, 12] });
  });
});
