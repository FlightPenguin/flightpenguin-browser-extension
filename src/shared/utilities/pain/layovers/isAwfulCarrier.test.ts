import { isAwfulCarrier } from "./isAwfulCarrier";

describe("isAwfulCarrier happy path", () => {
  it("is an awful carrier", () => {
    const flightLeg = {
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
      operatingAirline: { display: "Spirit", color: "#C5423E", code: "AA" },
      operatingAirlineDetails: { display: "Spirit", color: "#C5423E", code: "AA" },
      isLayoverStop: false,
    };
    const value = isAwfulCarrier(flightLeg);
    expect(value).toEqual(true);
  });

  it("is not an awful carrier", () => {
    const flightLeg = {
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
      operatingAirline: { display: "Uhhhmerican", color: "#C5423E", code: "AA" },
      operatingAirlineDetails: { display: "Uhhhmerican", color: "#C5423E", code: "AA" },
      isLayoverStop: false,
    };
    const value = isAwfulCarrier(flightLeg);
    expect(value).toEqual(false);
  });
});
