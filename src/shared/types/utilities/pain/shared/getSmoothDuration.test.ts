import { getSmoothDuration } from "./getSmoothDuration";

describe("getStepSize happy path", () => {
  it("short flight, on ceiling", () => {
    const value = getSmoothDuration(180);
    expect(value).toEqual(180);
  });

  it("short flight, in middle", () => {
    const value = getSmoothDuration(177);
    expect(value).toEqual(180);
  });

  it("short flight, at bottom", () => {
    const value = getSmoothDuration(176);
    expect(value).toEqual(180);
  });

  it("long flight, on ceiling", () => {
    const value = getSmoothDuration(300);
    expect(value).toEqual(300);
  });

  it("long flight, in middle", () => {
    const value = getSmoothDuration(295);
    expect(value).toEqual(300);
  });

  it("long flight, at bottom", () => {
    const value = getSmoothDuration(291);
    expect(value).toEqual(300);
  });
});
