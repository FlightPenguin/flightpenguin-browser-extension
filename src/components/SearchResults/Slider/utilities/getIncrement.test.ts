import { getIncrement } from "./getIncrement";

describe("getIncrement happy path tests", () => {
  it("starts with zero", () => {
    const value = getIncrement([0, 4]);
    expect(value).toBe(4);
  });

  it("starts with number > 0", () => {
    const value = getIncrement([2, 5]);
    expect(value).toBe(3);
  });

  it("too short", () => {
    const value = getIncrement([]);
    expect(value).toBe(0);
  });
});
