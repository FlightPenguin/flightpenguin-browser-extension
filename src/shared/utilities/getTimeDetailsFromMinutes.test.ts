import { getTimeDetailsFromMinutes } from "./getTimeDetailsFromMinutes";

describe("getTimeDetailsFromMinutes happy path", () => {
  it("midnight", () => {
    const value = getTimeDetailsFromMinutes({ minutes: 15 });
    expect(value).toEqual({
      hours: 0,
      minutes: 15,
      excessDays: null,
      displayHours: 12,
      timeOfDay: "am",
      excessDayCount: 0,
    });
  });

  it("morning", () => {
    const value = getTimeDetailsFromMinutes({ minutes: 125 });
    expect(value).toEqual({
      hours: 2,
      minutes: 5,
      excessDays: null,
      displayHours: 2,
      timeOfDay: "am",
      excessDayCount: 0,
    });
  });

  it("noon", () => {
    const value = getTimeDetailsFromMinutes({ minutes: 720 });
    expect(value).toEqual({
      hours: 12,
      minutes: 0,
      excessDays: null,
      displayHours: 12,
      timeOfDay: "pm",
      excessDayCount: 0,
    });
  });

  it("afternoon", () => {
    const value = getTimeDetailsFromMinutes({ minutes: 789 });
    expect(value).toEqual({
      hours: 13,
      minutes: 9,
      excessDays: null,
      displayHours: 1,
      timeOfDay: "pm",
      excessDayCount: 0,
    });
  });

  it("tomorrow morning", () => {
    const value = getTimeDetailsFromMinutes({ minutes: 1442 });
    // not sure if this is actually right... should it be 24 hours and an excess days?
    expect(value).toEqual({
      hours: 0,
      minutes: 2,
      excessDays: "+1",
      displayHours: 12,
      timeOfDay: "am",
      excessDayCount: 1,
    });
  });

  it("tomorrow afternoon", () => {
    const value = getTimeDetailsFromMinutes({ minutes: 2162 });
    // not sure if this is actually right... should it be 24 hours and an excess days?
    expect(value).toEqual({
      hours: 12,
      minutes: 2,
      excessDays: "+1",
      displayHours: 12,
      timeOfDay: "pm",
      excessDayCount: 1,
    });
  });
});
