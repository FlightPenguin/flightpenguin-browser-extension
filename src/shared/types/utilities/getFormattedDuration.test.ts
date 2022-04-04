import { getFormattedDuration } from "./getFormattedDuration";

describe("happy path", () => {
  it("has hours and minutes", () => {
    const value = getFormattedDuration(61);
    expect(value).toEqual("1h 1m");
  });

  it("has hours and no minutes", () => {
    const value = getFormattedDuration(60);
    expect(value).toEqual("1h");
  });

  it("has no hours and minutes", () => {
    const value = getFormattedDuration(35);
    expect(value).toEqual("35m");
  });
});
