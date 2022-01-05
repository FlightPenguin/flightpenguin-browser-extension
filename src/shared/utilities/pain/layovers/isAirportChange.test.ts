import { isAirportChange } from "./isAirportChange";

describe("isAirportChange happy path", () => {
  it("has no airport change", () => {
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

    const value = isAirportChange(layover);
    expect(value).toEqual(false);
  });

  it("has airport change", () => {
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
      to: "DEN",
      timezoneOffset: 0,
      isLayoverStop: true,
      operatingAirline: { code: "Layover", display: "Layover at LAS.", color: "transparent" },
    };

    const value = isAirportChange(layover);
    expect(value).toEqual(true);
  });
});
