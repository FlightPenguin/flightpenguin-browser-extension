import { getDurationInMinutes } from "./getDurationInMinutes";

describe("happy path tests", () => {
  test("full duration", () => {
    const value = getDurationInMinutes("1h15m");
    expect(value).toEqual(75);
  });

  test("overnight duration", () => {
    const value = getDurationInMinutes("25h15m");
    expect(value).toEqual(1515);
  });

  test("just minutes", () => {
    const value = getDurationInMinutes("15m");
    expect(value).toEqual(15);
  });

  test("just hour", () => {
    const value = getDurationInMinutes("1h");
    expect(value).toEqual(60);
  });
});
