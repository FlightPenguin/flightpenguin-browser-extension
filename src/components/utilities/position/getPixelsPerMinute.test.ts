import { getPixelsPerMinute } from "./getPixelsPerMinute";

describe("getPixelsPerMinute invalid input", () => {
  it("has NaN for intervalCount", () => {
    expect(() => {
      getPixelsPerMinute({
        intervalCount: NaN,
        increment: 3,
        width: 600,
      });
    }).toThrow("Invalid value(s) for intervalCount (NaN) in getPixelsPerMinute");
  });

  it("has NaN for increment", () => {
    expect(() => {
      getPixelsPerMinute({
        intervalCount: 6,
        increment: NaN,
        width: 600,
      });
    }).toThrow("Invalid value(s) for increment (NaN) in getPixelsPerMinute");
  });

  it("has NaN for width", () => {
    expect(() => {
      getPixelsPerMinute({
        intervalCount: 6,
        increment: 3,
        width: NaN,
      });
    }).toThrow("Invalid value(s) for width (NaN) in getPixelsPerMinute");
  });

  it("fails many with NaN", () => {
    expect(() => {
      getPixelsPerMinute({
        intervalCount: NaN,
        increment: NaN,
        width: NaN,
      });
    }).toThrow("Invalid value(s) for intervalCount (NaN), increment (NaN), width (NaN) in getPixelsPerMinute");
  });
});
