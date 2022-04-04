import { startOfToday } from "date-fns";

import { getParsedISODate } from "./getParsedISODate";

describe("happy path", () => {
  it("is date", () => {
    const value = getParsedISODate(startOfToday());
    expect(value).toEqual(startOfToday());
  });

  it("iso string", () => {
    const value = getParsedISODate(startOfToday().toISOString());
    expect(value).toEqual(startOfToday());
  });
});
