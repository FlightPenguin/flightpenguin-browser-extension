import { getParsedNumber } from "./getParsedNumber";

describe("getParsedNumber happy path", () => {
  it("is number", () => {
    const value = getParsedNumber(5);
    expect(value).toEqual(5);
  });

  it("is string", () => {
    const value = getParsedNumber("5");
    expect(value).toEqual(5);
  });
});
