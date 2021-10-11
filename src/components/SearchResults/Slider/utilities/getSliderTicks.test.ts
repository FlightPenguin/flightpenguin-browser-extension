import { getSliderTicks } from "./getSliderTicks";

describe("getSliderTicks happy path tests", () => {
  it("starts with zero", () => {
    const value = getSliderTicks({ intervals: [0, 4] });
    expect(value).toBe(16);
  });

  it("starts with number > 0", () => {
    const value = getSliderTicks({ intervals: [2, 5] });
    expect(value).toBe(12);
  });

  it("too short", () => {
    const value = getSliderTicks({ intervals: [] });
    expect(value).toBe(0);
  });
});
