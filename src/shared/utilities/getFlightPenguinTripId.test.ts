import { getFlightPenguinTripId } from "./getFlightPenguinTripId";

describe("getFlightPenguinTripId happy path", () => {
  it("works with just departure flight", () => {
    const value = getFlightPenguinTripId("abcd1234", "");
    expect(value).toEqual("abcd1234");
  });

  it("works with return flight", () => {
    const value = getFlightPenguinTripId("abcd1234", "bcde2345");
    expect(value).toEqual("abcd1234-bcde2345");
  });
});
