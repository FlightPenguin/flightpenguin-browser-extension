import { getTimezoneOffset } from "./getTimezoneOffset";

describe("getTimezoneOffset happy path", () => {
  it("handles no offset", () => {
    const value = getTimezoneOffset("12:14am", "2:22am", "2h8m");
    expect(value).toEqual(0);
  });

  it("handles negative offset", () => {
    const value = getTimezoneOffset("12:14am", "2:22am", "1h8m");
    expect(value).toEqual(-60);
  });

  it("handles positive offset", () => {
    const value = getTimezoneOffset("12:14am", "2:22am", "3h8m");
    expect(value).toEqual(60);
  });

  it("handles endsNextDay", () => {
    const value = getTimezoneOffset("12:14am", "2:22am+1", "27h8m");
    expect(value).toEqual(60);
  });

  it("handles startsNextDay", () => {
    const value = getTimezoneOffset("12:14am+1", "2:22am", "2h8m");
    expect(value).toEqual(0);
  });

  it("handles startsNextDay & endsNextDay", () => {
    const value = getTimezoneOffset("12:14pm+1", "2:22+1pm", "25h8m");
    expect(value).toEqual(-60);
  });
});
