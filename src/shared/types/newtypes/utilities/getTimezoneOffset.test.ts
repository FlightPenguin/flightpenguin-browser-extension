import { addHours, startOfToday } from "date-fns";

import { getTimezoneOffset } from "./getTimezoneOffset";

describe("happy path", () => {
  it("has no offset", () => {
    const departureDateTime = startOfToday();
    const arrivalDateTime = addHours(startOfToday(), 2);
    const value = getTimezoneOffset(arrivalDateTime, departureDateTime, 120);
    expect(value).toEqual(0);
  });

  it("is ahead of departure time", () => {
    const departureDateTime = startOfToday();
    const arrivalDateTime = addHours(startOfToday(), 2);
    const value = getTimezoneOffset(arrivalDateTime, departureDateTime, 60);
    expect(value).toEqual(-60);
  });

  it("is behind departure time", () => {
    const departureDateTime = startOfToday();
    const arrivalDateTime = addHours(startOfToday(), 2);
    const value = getTimezoneOffset(arrivalDateTime, departureDateTime, 180);
    expect(value).toEqual(60);
  });
});
