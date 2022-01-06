import { getLayoverMultiplier } from "./getLayoverMultiplier";

describe("getLayoverMultiplier tests", () => {
  describe("not a layover", () => {
    it("is a normal carrier", () => {
      const layover = {
        duration: "4h31m",
        durationMinutes: 271,
        timezoneOffset: 180,
        fromLocalTime: "3:05pm",
        fromLocalTimeDetails: {
          hours: 15,
          displayHours: 3,
          minutes: 5,
          timeOfDay: "pm",
          excessDays: null,
          excessDayCount: 0,
        },
        fromTime: "3:05pm",
        fromTimeDetails: { hours: 15, displayHours: 3, minutes: 5, timeOfDay: "pm", excessDays: null },
        toTime: "7:36pm",
        toTimeDetails: { hours: 19, displayHours: 7, minutes: 36, timeOfDay: "pm", excessDays: null },
        toLocalTime: "4:36pm",
        toLocalTimeDetails: {
          hours: 16,
          displayHours: 4,
          minutes: 36,
          timeOfDay: "pm",
          excessDays: null,
          excessDayCount: 0,
        },
        from: "CMH",
        to: "LAS",
        operatingAirline: { display: "American", color: "#C5423E", code: "AA" },
        operatingAirlineDetails: { display: "American", color: "#C5423E", code: "AA" },
        isLayoverStop: false,
      };
      const value = getLayoverMultiplier(layover);
      expect(value).toEqual(1);
    });

    it("is an awful carrier", () => {
      const layover = {
        duration: "4h31m",
        durationMinutes: 271,
        timezoneOffset: 180,
        fromLocalTime: "3:05pm",
        fromLocalTimeDetails: {
          hours: 15,
          displayHours: 3,
          minutes: 5,
          timeOfDay: "pm",
          excessDays: null,
          excessDayCount: 0,
        },
        fromTime: "3:05pm",
        fromTimeDetails: { hours: 15, displayHours: 3, minutes: 5, timeOfDay: "pm", excessDays: null },
        toTime: "7:36pm",
        toTimeDetails: { hours: 19, displayHours: 7, minutes: 36, timeOfDay: "pm", excessDays: null },
        toLocalTime: "4:36pm",
        toLocalTimeDetails: {
          hours: 16,
          displayHours: 4,
          minutes: 36,
          timeOfDay: "pm",
          excessDays: null,
          excessDayCount: 0,
        },
        from: "CMH",
        to: "LAS",
        operatingAirline: { display: "Spirit", color: "#BBB140", code: "NK" },
        operatingAirlineDetails: { display: "Spirit", color: "#BBB140", code: "NK" },
        isLayoverStop: false,
      };
      const value = getLayoverMultiplier(layover);
      expect(value).toEqual(1.5);
    });
  });

  describe("is a layover", () => {
    it("normal layover", () => {
      const layover = {
        fromTime: "7:36pm",
        fromTimeDetails: { hours: 19, displayHours: 7, minutes: 36, timeOfDay: "pm", excessDays: null },
        fromLocalTime: "4:36pm",
        toTime: "8:40pm",
        toTimeDetails: { hours: 20, displayHours: 8, minutes: 40, timeOfDay: "pm", excessDays: null },
        toLocalTime: "5:40pm",
        duration: "1h4m",
        durationInMinutes: 64,
        from: "LAS",
        to: "LAS",
        timezoneOffset: 0,
        isLayoverStop: true,
        operatingAirline: { code: "Layover", display: "Layover at LAS.", color: "transparent" },
      };
      const value = getLayoverMultiplier(layover);
      expect(value).toEqual(2);
    });

    it("has airport change layover", () => {
      const layover = {
        fromTime: "7:36pm",
        fromTimeDetails: { hours: 19, displayHours: 7, minutes: 36, timeOfDay: "pm", excessDays: null },
        fromLocalTime: "4:36pm",
        toTime: "8:40pm",
        toTimeDetails: { hours: 20, displayHours: 8, minutes: 40, timeOfDay: "pm", excessDays: null },
        toLocalTime: "5:40pm",
        duration: "1h4m",
        durationInMinutes: 64,
        from: "LAS",
        to: "ZZZ",
        timezoneOffset: 0,
        isLayoverStop: true,
        operatingAirline: { code: "Layover", display: "Layover at LAS.", color: "transparent" },
      };
      const value = getLayoverMultiplier(layover);
      expect(value).toEqual(12);
    });

    it("overnight layover", () => {
      const layover = {
        fromTime: "11:36pm",
        fromTimeDetails: { hours: 23, displayHours: 11, minutes: 36, timeOfDay: "pm", excessDays: null },
        fromLocalTime: "11:36pm",
        toTime: "12:40am+1",
        toTimeDetails: { hours: 24, displayHours: 12, minutes: 40, timeOfDay: "pm", excessDays: null },
        toLocalTime: "12:40am+1",
        duration: "1h4m",
        durationInMinutes: 64,
        from: "LAS",
        to: "LAS",
        timezoneOffset: 0,
        isLayoverStop: true,
        operatingAirline: { code: "Layover", display: "Layover at LAS.", color: "transparent" },
      };
      const value = getLayoverMultiplier(layover);
      expect(value).toEqual(2.15);
    });

    it("short layover", () => {
      const layover = {
        fromTime: "7:36pm",
        fromTimeDetails: { hours: 19, displayHours: 7, minutes: 36, timeOfDay: "pm", excessDays: null },
        fromLocalTime: "4:36pm",
        toTime: "8:30pm",
        toTimeDetails: { hours: 20, displayHours: 8, minutes: 30, timeOfDay: "pm", excessDays: null },
        toLocalTime: "5:30pm",
        duration: "54m",
        durationInMinutes: 54,
        from: "LAS",
        to: "LAS",
        timezoneOffset: 0,
        isLayoverStop: true,
        operatingAirline: { code: "Layover", display: "Layover at LAS.", color: "transparent" },
      };
      const value = getLayoverMultiplier(layover);
      expect(value).toEqual(3);
    });

    it("long layover", () => {
      const layover = {
        fromTime: "6:36pm",
        fromTimeDetails: { hours: 18, displayHours: 6, minutes: 36, timeOfDay: "pm", excessDays: null },
        fromLocalTime: "6:36pm",
        toTime: "11:40pm",
        toTimeDetails: { hours: 23, displayHours: 11, minutes: 40, timeOfDay: "pm", excessDays: null },
        toLocalTime: "11:40pm",
        duration: "5h4m",
        durationInMinutes: 304,
        from: "LAS",
        to: "LAS",
        timezoneOffset: 0,
        isLayoverStop: true,
        operatingAirline: { code: "Layover", display: "Layover at LAS.", color: "transparent" },
      };
      const value = getLayoverMultiplier(layover);
      expect(value).toEqual(4);
    });
  });
});
