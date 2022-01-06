import { isOvernight } from "./isOvernight";

describe("isOvernight happy path", () => {
  it("not overnight", () => {
    const value = isOvernight(
      { hours: 19, displayHours: 7, minutes: 36, timeOfDay: "pm", excessDays: null, excessDayCount: 0 },
      { hours: 20, displayHours: 8, minutes: 30, timeOfDay: "pm", excessDays: null, excessDayCount: 0 },
    );
    expect(value).toEqual(false);
  });

  it("overnight", () => {
    const value = isOvernight(
      {
        hours: 23,
        displayHours: 11,
        minutes: 36,
        timeOfDay: "pm",
        excessDays: null,
        excessDayCount: 0,
      },
      { hours: 24, displayHours: 12, minutes: 40, timeOfDay: "pm", excessDays: null, excessDayCount: 0 },
    );
    expect(value).toEqual(true);
  });
});
