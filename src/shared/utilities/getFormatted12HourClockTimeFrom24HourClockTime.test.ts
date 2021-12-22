import { getFormatted12HourClockTimeFrom24HourClockTime } from "./getFormatted12HourClockTimeFrom24HourClockTime";

describe("getFormatted12HourClockTimeFrom24HourClockTime happy path", () => {
  it("morning", () => {
    const value = getFormatted12HourClockTimeFrom24HourClockTime("03:31");
    expect(value).toEqual("3:31am");
  });

  it("midnight-ish", () => {
    const value = getFormatted12HourClockTimeFrom24HourClockTime("00:14");
    expect(value).toEqual("12:14am");
  });

  it("midnight", () => {
    const value = getFormatted12HourClockTimeFrom24HourClockTime("00:00");
    expect(value).toEqual("12:00am");
  });

  it("noon-ish", () => {
    const value = getFormatted12HourClockTimeFrom24HourClockTime("12:11");
    expect(value).toEqual("12:11pm");
  });

  it("noon", () => {
    const value = getFormatted12HourClockTimeFrom24HourClockTime("12:00");
    expect(value).toEqual("12:00pm");
  });

  it("afternoon", () => {
    const value = getFormatted12HourClockTimeFrom24HourClockTime("23:18");
    expect(value).toEqual("11:18pm");
  });

  it("excess days", () => {
    const value = getFormatted12HourClockTimeFrom24HourClockTime("23:18+1");
    expect(value).toEqual("11:18pm+1");
  });
});
