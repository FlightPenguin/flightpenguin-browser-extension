import { getCabinMultiplier } from "./getCabinMultiplier";

describe("getCabinMultiplier happy path", () => {
  it("econ", () => {
    const value = getCabinMultiplier("econ");
    expect(value).toEqual(1);
  });

  it("prem_econ", () => {
    const value = getCabinMultiplier("prem_econ");
    expect(value).toEqual(1.25);
  });

  it("business", () => {
    const value = getCabinMultiplier("business");
    expect(value).toEqual(2);
  });

  it("first", () => {
    const value = getCabinMultiplier("first");
    expect(value).toEqual(5);
  });

  it("default", () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      getCabinMultiplier("octopus");
    }).toThrow();
  });
});
