import { isAlphaKeyboardInput } from "./isAlphaKeyboardInput";

describe("isAlphaKeyboardInput happy path", () => {
  it("passed uppercase", () => {
    const event = { charCode: 65 } as KeyboardEvent;
    const value = isAlphaKeyboardInput(event);
    expect(value).toEqual(true);
  });

  it("passed lowercase", () => {
    const event = { charCode: 65 } as KeyboardEvent;
    const value = isAlphaKeyboardInput(event);
    expect(value).toEqual(true);
  });

  it("we are nice and allow the enter key for UX reasons", () => {
    const event = { charCode: 13 } as KeyboardEvent;
    const value = isAlphaKeyboardInput(event);
    expect(value).toEqual(true);
  });

  it("failed whitespace", () => {
    const event = { charCode: 32 } as KeyboardEvent;
    const value = isAlphaKeyboardInput(event);
    expect(value).toEqual(false);
  });
});
