import { isFlightThroughCity } from "./isFlightThroughCity";

describe("isFlightThroughCity happy path", () => {
  it("cities undefined", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = isFlightThroughCity({ flight: {}, cities: undefined });
    expect(value).toEqual(true);
  });

  it("cities empty", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = isFlightThroughCity({ flight: {}, cities: [] });
    expect(value).toEqual(true);
  });

  it("does not have city", () => {
    const value = isFlightThroughCity({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      flight: { layoverAirports: ["SFO", "DEN"] },
      cities: ["CMH", "CAK"],
    });
    expect(value).toEqual(false);
  });

  it("has some cities", () => {
    const value = isFlightThroughCity({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      flight: { layoverAirports: ["SFO", "DEN", "CMH"] },
      cities: ["SFO", "CAK"],
    });
    expect(value).toEqual(false);
  });

  it("has all cities", () => {
    const value = isFlightThroughCity({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      flight: { layoverAirports: ["SFO", "DEN", "CMH"] },
      cities: ["SFO", "DEN"],
    });
    expect(value).toEqual(true);
  });
});
