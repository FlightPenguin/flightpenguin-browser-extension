import { getCalculatedDuration } from "./getCalculatedDuration";

describe("getCalculatedDuration happy path", () => {
  it("handles hours and minutes", () => {
    const value = getCalculatedDuration(
      { hours: 10, minutes: 5, excessDays: null, displayHours: 10, timeOfDay: "am" },
      { hours: 11, minutes: 45, excessDays: null, displayHours: 11, timeOfDay: "am" },
    );
    expect(value).toEqual({ duration: "1h 40m", durationInMinutes: 100 });
  });

  it("handles just minutes", () => {
    const value = getCalculatedDuration(
      { hours: 10, minutes: 5, excessDays: null, displayHours: 10, timeOfDay: "am" },
      { hours: 10, minutes: 45, excessDays: null, displayHours: 10, timeOfDay: "am" },
    );
    expect(value).toEqual({ duration: "40m", durationInMinutes: 40 });
  });

  it("handles just hours", () => {
    const value = getCalculatedDuration(
      { hours: 10, minutes: 5, excessDays: null, displayHours: 10, timeOfDay: "am" },
      { hours: 11, minutes: 5, excessDays: null, displayHours: 11, timeOfDay: "am" },
    );
    expect(value).toEqual({ duration: "1h", durationInMinutes: 60 });
  });

  it("handles bass ackwards days", () => {
    const value = getCalculatedDuration(
      { hours: 11, minutes: 5, excessDays: null, displayHours: 11, timeOfDay: "am" },
      { hours: 10, minutes: 5, excessDays: null, displayHours: 10, timeOfDay: "am" },
    );
    expect(value).toEqual({ duration: "23h", durationInMinutes: 1380 });
  });
});
