import { startOfToday } from "date-fns";
import MockDate from "mockdate";

import { getFauxDate } from "./getFauxDate";

describe("getFauxDate happy path", () => {
  beforeEach(() => {
    // not necessary, but useful as reference material
    MockDate.set("2020-01-01");
  });

  afterAll(() => {
    MockDate.reset();
  });

  it("has hours and minutes", () => {
    const input = {
      hours: 1,
      excessDays: null,
      excessDayCount: 0,
      minutes: 12,
      displayHours: 1,
      timeOfDay: "am",
    };
    const fauxDate = getFauxDate(input);
    const startOfDay = startOfToday();
    const value = fauxDate.valueOf() - startOfDay.valueOf();
    expect(value).toEqual(4320000);
  });

  it("has minutes", () => {
    const input = {
      hours: 0,
      excessDays: null,
      excessDayCount: 0,
      minutes: 12,
      displayHours: 12,
      timeOfDay: "am",
    };
    const fauxDate = getFauxDate(input);
    const startOfDay = startOfToday();
    const value = fauxDate.valueOf() - startOfDay.valueOf();
    expect(value).toEqual(720000);
  });

  it("has hours", () => {
    const input = {
      hours: 2,
      excessDays: null,
      excessDayCount: 0,
      minutes: 0,
      displayHours: 2,
      timeOfDay: "am",
    };
    const fauxDate = getFauxDate(input);
    const startOfDay = startOfToday();
    const value = fauxDate.valueOf() - startOfDay.valueOf();
    expect(value).toEqual(7200000);
  });
});
