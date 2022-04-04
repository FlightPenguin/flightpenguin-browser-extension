import { startOfToday } from "date-fns";

import { getFormattedTime } from "./getFormattedTime";

describe("happy path", () => {
  it("midnight", () => {
    const value = getFormattedTime(startOfToday());
    expect(value).toEqual("12:00am");
  });

  it("noon", () => {
    const date = startOfToday();
    date.setHours(12);
    const value = getFormattedTime(date);
    expect(value).toEqual("12:00pm");
  });

  it("morning", () => {
    const date = startOfToday();
    date.setHours(7);
    const value = getFormattedTime(date);
    expect(value).toEqual("7:00am");
  });

  it("afternoon", () => {
    const date = startOfToday();
    date.setHours(19);
    const value = getFormattedTime(date);
    expect(value).toEqual("7:00pm");
  });

  it("minutes", () => {
    const date = startOfToday();
    date.setHours(19);
    date.setMinutes(31);
    const value = getFormattedTime(date);
    expect(value).toEqual("7:31pm");
  });

  it("positive excess days", () => {
    const date = startOfToday();
    date.setHours(19);
    date.setMinutes(31);
    const value = getFormattedTime(date, 3);
    expect(value).toEqual("7:31pm+3");
  });

  it("negative excess days", () => {
    const date = startOfToday();
    date.setHours(19);
    date.setMinutes(31);
    const value = getFormattedTime(date, -3);
    expect(value).toEqual("7:31pm-3");
  });
});
