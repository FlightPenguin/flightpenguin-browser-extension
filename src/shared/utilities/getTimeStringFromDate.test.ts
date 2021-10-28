import { getTimeStringFromDate } from "./getTimeStringFromDate";

describe("getTimeStringFromDate happy path", () => {
  it("is just the date", () => {
    const value = getTimeStringFromDate({ date: new Date(2020, 0, 1, 4, 20, 0, 0) });
    expect(value).toEqual("4:20am");
  });

  it("has a departure date, but same day", () => {
    const value = getTimeStringFromDate({
      date: new Date(2020, 0, 1, 4, 20, 0, 0),
      previousFlightDate: new Date(2020, 0, 1, 0, 1, 0, 0),
    });
    expect(value).toEqual("4:20am");
  });

  it("has a departure date, from a different day", () => {
    const value = getTimeStringFromDate({
      date: new Date(2020, 0, 1, 4, 20, 0, 0),
      previousFlightDate: new Date(2019, 11, 31, 23, 45, 0, 0),
    });
    expect(value).toEqual("4:20am+1");
  });
});
