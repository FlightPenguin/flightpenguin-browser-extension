import { getIntervalIncrement } from "./getIntervalIncrement";

describe("getIntervalIncrement happy path", () => {
  it("has a large increment for hours above 144", () => {
    const value = getIntervalIncrement(145);
    expect(value).toEqual(12);
  });

  it("has a medium increment for hours above 72", () => {
    const value = getIntervalIncrement(73);
    expect(value).toEqual(6);
  });

  it("has a small increment for hours equal to or below 24", () => {
    const value = getIntervalIncrement(24);
    expect(value).toEqual(2);
  });
});
