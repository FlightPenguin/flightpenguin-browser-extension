import { getValueInRange } from "./getValueInRange";

describe("getValueInRange happy path tests", () => {
  it("inside range", () => {
    const value = getValueInRange({ value: 1, minimumValue: 0, maximumValue: 2 });
    expect(value).toBe(1);
  });

  it("inclusive boundary min", () => {
    const value = getValueInRange({ value: 1, minimumValue: 1, maximumValue: 2 });
    expect(value).toBe(1);
  });

  it("inclusive boundary max", () => {
    const value = getValueInRange({ value: 2, minimumValue: 0, maximumValue: 2 });
    expect(value).toBe(2);
  });

  it("outside boundary max", () => {
    const value = getValueInRange({ value: 3, minimumValue: 0, maximumValue: 2 });
    expect(value).toBe(2);
  });

  it("outside boundary min", () => {
    const value = getValueInRange({ value: 0, minimumValue: 2, maximumValue: 4 });
    expect(value).toBe(2);
  });
});
