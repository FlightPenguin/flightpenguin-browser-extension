import { getPositionByTick } from "./getPositionByTick";

describe("getPositionByTick with adjustment", () => {
  it("first tick", () => {
    const value = getPositionByTick({ value: 0, intervals: [0, 4], flightTimeContainerWidth: 1117 });
    expect(value).toBe(-42);
  });

  it("last tick", () => {
    const value = getPositionByTick({ value: 16, intervals: [0, 4], flightTimeContainerWidth: 1117 });
    expect(value).toBe(1075);
  });

  it("inner tick", () => {
    const value = getPositionByTick({ value: 4, intervals: [0, 4], flightTimeContainerWidth: 1117 });
    expect(value).toBe(237.25);
  });
});

describe("getPositionByTick without adjustment", () => {
  it("first tick", () => {
    const value = getPositionByTick({
      value: 0,
      intervals: [0, 4],
      flightTimeContainerWidth: 1117,
      applyAdjustment: false,
    });
    expect(value).toBe(0);
  });

  it("last tick", () => {
    const value = getPositionByTick({
      value: 16,
      intervals: [0, 4],
      flightTimeContainerWidth: 1117,
      applyAdjustment: false,
    });
    expect(value).toBe(1117);
  });

  it("inner tick", () => {
    const value = getPositionByTick({
      value: 4,
      intervals: [0, 4],
      flightTimeContainerWidth: 1117,
      applyAdjustment: false,
    });
    expect(value).toBe(279.25);
  });
});
