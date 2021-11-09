import { isValidDateInputString } from "./isValidDateInputString";

describe("isValidDateInputString happy path", () => {
  it("value is empty string", () => {
    const value = isValidDateInputString("");
    expect(value).toEqual(false);
  });

  it("value is invalid", () => {
    const value = isValidDateInputString("meow");
    expect(value).toEqual(false);
  });

  it("value is valid", () => {
    const value = isValidDateInputString("1985-07-04");
    expect(value).toEqual(true);
  });

  it("value is valid, but missing leading zeroes", () => {
    const value = isValidDateInputString("1985-7-4");
    expect(value).toEqual(true);
  });
});
