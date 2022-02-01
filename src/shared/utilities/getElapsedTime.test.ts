import { getElapsedTime } from "./getElapsedTime";

describe("happy path", () => {
  it("regular morning time", () => {
    const value = getElapsedTime("3:00am", false);
    expect(value).toEqual({ hours: 3, minutes: 0 });
  });

  it("regular afternoon time", () => {
    const value = getElapsedTime("3:04pm", false);
    expect(value).toEqual({ hours: 15, minutes: 4 });
  });

  it("noon", () => {
    const value = getElapsedTime("12:00pm", false);
    expect(value).toEqual({ hours: 12, minutes: 0 });
  });

  it("midnight", () => {
    const value = getElapsedTime("12:00am", false);
    expect(value).toEqual({ hours: 0, minutes: 0 });
  });

  it("positive excess days, do not add", () => {
    const value = getElapsedTime("9:10pm+1", false);
    expect(value).toEqual({ hours: 21, minutes: 10 });
  });

  it("negative excess days, do not add", () => {
    const value = getElapsedTime("9:10pm-1", false);
    expect(value).toEqual({ hours: 21, minutes: 10 });
  });

  it("no excess days, add", () => {
    const value = getElapsedTime("3:00pm", true);
    expect(value).toEqual({ hours: 15, minutes: 0 });
  });

  it("positive excess days, add", () => {
    const value = getElapsedTime("9:10pm+1", true);
    expect(value).toEqual({ hours: 45, minutes: 10 });
  });

  it("negative excess days, add", () => {
    const value = getElapsedTime("9:10pm-1", true);
    expect(value).toEqual({ hours: -3, minutes: 10 });
  });
});
