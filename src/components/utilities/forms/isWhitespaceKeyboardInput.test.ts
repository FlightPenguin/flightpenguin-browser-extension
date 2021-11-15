import { isWhitespaceKeyboardInput } from "./isWhitespaceKeyboardInput";

describe("isWhitespaceKeyboardInput happy path", () => {
  it("detects whitespace", () => {
    const event = { charCode: 32 } as KeyboardEvent;
    const value = isWhitespaceKeyboardInput(event);
    expect(value).toEqual(true);
  });

  it("we are nice and allow the enter key for UX reasons", () => {
    const event = { charCode: 13 } as KeyboardEvent;
    const value = isWhitespaceKeyboardInput(event);
    expect(value).toEqual(true);
  });

  it("does not allow non-whitespace", () => {
    const event = { charCode: 65 } as KeyboardEvent;
    const value = isWhitespaceKeyboardInput(event);
    expect(value).toEqual(false);
  });

  it("excludes tabs", () => {
    const event = { charCode: 9 } as KeyboardEvent;
    const value = isWhitespaceKeyboardInput(event);
    expect(value).toEqual(false);
  });
});
