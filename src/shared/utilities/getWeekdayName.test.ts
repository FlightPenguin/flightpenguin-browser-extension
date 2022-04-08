import { getWeekdayName } from "./getWeekdayName";

describe("getWeekdayName happy path", () => {
  it("sunday", () => {
    const date = new Date(2022, 3, 3);
    const value = getWeekdayName(date);
    expect(value).toEqual("Sunday");
  });

  it("monday", () => {
    const date = new Date(2022, 3, 4);
    const value = getWeekdayName(date);
    expect(value).toEqual("Monday");
  });

  it("tuesday", () => {
    const date = new Date(2022, 3, 5);
    const value = getWeekdayName(date);
    expect(value).toEqual("Tuesday");
  });

  it("wed", () => {
    const date = new Date(2022, 3, 6);
    const value = getWeekdayName(date);
    expect(value).toEqual("Wednesday");
  });

  it("thurs", () => {
    const date = new Date(2022, 3, 7);
    const value = getWeekdayName(date);
    expect(value).toEqual("Thursday");
  });

  it("fri", () => {
    const date = new Date(2022, 3, 8);
    const value = getWeekdayName(date);
    expect(value).toEqual("Friday");
  });

  it("sat", () => {
    const date = new Date(2022, 3, 9);
    const value = getWeekdayName(date);
    expect(value).toEqual("Saturday");
  });
});
