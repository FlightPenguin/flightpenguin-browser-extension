import { getSmoothDuration } from "./getSmoothDuration";

describe("getSmoothDuration happy path tests", () => {
  test("short flight", () => {
    const result = getSmoothDuration("1h 40m");
    expect(result).toBe(90);
  });

  test("short flight upper boundary", () => {
    const result = getSmoothDuration("4h 0m");
    expect(result).toBe(240);
  });

  test("medium flight", () => {
    const result = getSmoothDuration("5h 25m");
    expect(result).toBe(300);
  });

  test("medium flight upper boundary", () => {
    const result = getSmoothDuration("8h 0m");
    expect(result).toBe(480);
  });

  test("long flight", () => {
    const result = getSmoothDuration("8h 20m");
    expect(result).toBe(480);
  });
});
