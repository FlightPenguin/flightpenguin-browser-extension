import { getCostPerMinute } from "./getCostPerMinute";

describe("getCostPerMinute happy path", () => {
  it("flat multiplier", () => {
    const value = getCostPerMinute(1);
    expect(value).toBeCloseTo(0.4167);
  });

  it("big multiplier", () => {
    const value = getCostPerMinute(3);
    expect(value).toBeCloseTo(1.25);
  });
});
