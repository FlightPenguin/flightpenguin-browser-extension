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

describe("getPositionByTick invalid input", () => {
  it("has NaN in value", () => {
    expect(() => {
      getPositionByTick({
        value: NaN,
        intervals: [0, 4],
        flightTimeContainerWidth: 1117,
        applyAdjustment: false,
      });
    }).toThrow("Invalid value(s) for value (NaN) in getPositionByTick");
  });

  it("has NaN for intervals", () => {
    expect(() => {
      getPositionByTick({
        value: 4,
        intervals: [0, NaN],
        flightTimeContainerWidth: 1117,
        applyAdjustment: false,
      });
    }).toThrow("Invalid value(s) for intervals (0,NaN) in getPositionByTick");
  });

  it("has NaN for flightTimeContainerWidth", () => {
    expect(() => {
      getPositionByTick({
        value: 4,
        intervals: [0, 4],
        flightTimeContainerWidth: NaN,
        applyAdjustment: false,
      });
    }).toThrow("Invalid value(s) for flightTimeContainerWidth (NaN) in getPositionByTick");
  });

  it("fails many with NaN", () => {
    expect(() => {
      getPositionByTick({
        value: NaN,
        intervals: [0, NaN],
        flightTimeContainerWidth: NaN,
        applyAdjustment: false,
      });
    }).toThrow(
      "Invalid value(s) for value (NaN), flightTimeContainerWidth (NaN), intervals (0,NaN) in getPositionByTick",
    );
  });
});
