import { getDateValueInRange } from "./getDateValueInRange";

const minimumDate = new Date(2020, 0, 1, 0, 0, 0, 0);
const maximumDate = new Date(2020, 0, 2, 0, 0, 0, 0);

describe("getDateValueInRange happy path tests", () => {
  it("inside range", () => {
    const datetime = new Date(2020, 0, 1, 1, 0, 0, 0);
    const value = getDateValueInRange({ value: datetime, minimumValue: minimumDate, maximumValue: maximumDate });
    expect(value).toEqual(datetime);
  });

  it("inclusive boundary min", () => {
    const value = getDateValueInRange({ value: minimumDate, minimumValue: minimumDate, maximumValue: maximumDate });
    expect(value).toEqual(minimumDate);
  });

  it("inclusive boundary max", () => {
    const value = getDateValueInRange({ value: maximumDate, minimumValue: minimumDate, maximumValue: maximumDate });
    expect(value).toEqual(maximumDate);
  });

  it("outside boundary max", () => {
    const datetime = new Date(2020, 0, 2, 0, 0, 0, 1);
    const value = getDateValueInRange({ value: datetime, minimumValue: minimumDate, maximumValue: maximumDate });
    expect(value).toEqual(maximumDate);
  });

  it("outside boundary min", () => {
    const datetime = new Date(2019, 11, 31, 23, 59, 59, 999);
    const value = getDateValueInRange({ value: datetime, minimumValue: minimumDate, maximumValue: maximumDate });
    expect(value).toEqual(minimumDate);
  });
});
