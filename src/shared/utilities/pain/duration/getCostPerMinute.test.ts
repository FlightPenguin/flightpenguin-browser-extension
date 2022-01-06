import { getCostPerMinute } from "./getCostPerMinute";

describe("getCostPerMinute happy path tests", () => {
  it("multiplier 1", () => {
    const value = getCostPerMinute(1);
    expect(value).toBe(0.4166666666666667);
  });

  it(">1", () => {
    const value = getCostPerMinute(1.5);
    expect(value).toBe(0.625);
  });

  it("<1", () => {
    const value = getCostPerMinute(0.5);
    expect(value).toBe(0.20833333333333334);
  });
});
