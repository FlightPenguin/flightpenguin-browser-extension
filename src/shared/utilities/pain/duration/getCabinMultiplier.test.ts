import { getCabinMultiplier } from "./getCabinMultiplier";

describe("getCabinMultiplier happy path tests", () => {
  it("economy", () => {
    const value = getCabinMultiplier("econ");
    expect(value).toBe(1);
  });

  it("premium economy", () => {
    const value = getCabinMultiplier("prem_econ");
    expect(value).toBe(1);
  });

  it("business", () => {
    const value = getCabinMultiplier("business");
    expect(value).toBe(2);
  });

  it("first class", () => {
    const value = getCabinMultiplier("first");
    expect(value).toBe(5);
  });
});
