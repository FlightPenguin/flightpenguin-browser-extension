import { getTimeDetailsFromString } from "./getTimeDetailsFromString";

describe("getTimeDetailsFromString happy path", () => {
  it("midnight", () => {
    const value = getTimeDetailsFromString("12:15am");
    expect(value).toEqual({
      hours: 0,
      minutes: 15,
      excessDays: "",
      displayHours: 12,
      timeOfDay: "am",
      excessDayCount: 0,
    });
  });

  it("morning", () => {
    const value = getTimeDetailsFromString("2:05am");
    expect(value).toEqual({
      hours: 2,
      minutes: 5,
      excessDays: "",
      displayHours: 2,
      timeOfDay: "am",
      excessDayCount: 0,
    });
  });

  it("noon", () => {
    const value = getTimeDetailsFromString("12:00pm");
    expect(value).toEqual({
      hours: 12,
      minutes: 0,
      excessDays: "",
      displayHours: 12,
      timeOfDay: "pm",
      excessDayCount: 0,
    });
  });

  it("afternoon", () => {
    const value = getTimeDetailsFromString("1:09pm");
    expect(value).toEqual({
      hours: 13,
      minutes: 9,
      excessDays: "",
      displayHours: 1,
      timeOfDay: "pm",
      excessDayCount: 0,
    });
  });

  it("tomorrow morning", () => {
    const value = getTimeDetailsFromString("12:02am+1");
    expect(value).toEqual({
      hours: 24,
      minutes: 2,
      excessDays: "",
      displayHours: 12,
      timeOfDay: "am",
      excessDayCount: 0,
    });
  });

  it("tomorrow afternoon", () => {
    const value = getTimeDetailsFromString("12:02pm+1");
    expect(value).toEqual({
      hours: 36,
      minutes: 2,
      excessDays: "",
      displayHours: 12,
      timeOfDay: "pm",
      excessDayCount: 0,
    });
  });

  it("yesterday", () => {
    const value = getTimeDetailsFromString("12:02pm-1");
    expect(value).toEqual({
      hours: -12,
      minutes: 2,
      excessDays: "",
      displayHours: 12,
      timeOfDay: "pm",
      excessDayCount: 0,
    });
  });
});
