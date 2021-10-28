import { getFormatted12HourClockTimeFromTimeDetails } from "./getFormatted12HourClockTimeFromTimeDetails";

describe("getFormatted12HourClockTimeFromTimeDetails happy path test", () => {
  it("morning time", () => {
    const value = getFormatted12HourClockTimeFromTimeDetails({
      timeDetails: {
        hours: 1,
        minutes: 15,
        excessDays: null,
        timeOfDay: "am",
        displayHours: 1,
      },
    });
    expect(value).toEqual("1:15am");
  });

  it("single digit minutes", () => {
    const value = getFormatted12HourClockTimeFromTimeDetails({
      timeDetails: {
        hours: 1,
        minutes: 5,
        excessDays: null,
        timeOfDay: "am",
        displayHours: 1,
      },
    });
    expect(value).toEqual("1:05am");
  });

  it("display hours does not equal hours", () => {
    const value = getFormatted12HourClockTimeFromTimeDetails({
      timeDetails: {
        hours: 13,
        minutes: 15,
        excessDays: null,
        timeOfDay: "pm",
        displayHours: 1,
      },
    });
    expect(value).toEqual("1:15pm");
  });

  it("has excess days", () => {
    const value = getFormatted12HourClockTimeFromTimeDetails({
      timeDetails: {
        hours: 1,
        minutes: 20,
        excessDays: "+2",
        timeOfDay: "am",
        displayHours: 1,
      },
    });
    expect(value).toEqual("1:20am+2");
  });
});
