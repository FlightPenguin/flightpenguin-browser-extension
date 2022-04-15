import { AirportFactory, CityFactory } from "./factories/Location";

describe("Location happy path", () => {
  it("getName functions", () => {
    const location = AirportFactory.build(
      {},
      {
        transient: {
          name: "Port Columbus International Airport",
        },
      },
    );
    expect(location.getName()).toEqual("Port Columbus International Airport");
  });

  it("getCode functions", () => {
    const location = AirportFactory.build(
      {},
      {
        transient: {
          code: "CMH",
        },
      },
    );
    expect(location.getCode()).toEqual("CMH");
  });

  it("getType functions", () => {
    const location = AirportFactory.build();
    expect(location.getType()).toEqual("AIRPORT");
  });

  it("isEqual is true when equal", () => {
    const location1 = AirportFactory.build({}, { transient: { code: "ZZZ" } });
    const location2 = AirportFactory.build({}, { transient: { code: "ZZZ" } });
    expect(location1.isEqual(location2)).toEqual(true);
    expect(location2.isEqual(location1)).toEqual(true);
  });

  it("isEqual is false with differing types", () => {
    const location1 = CityFactory.build({}, { transient: { code: "ZZZ" } });
    const location2 = AirportFactory.build({}, { transient: { code: "ZZZ" } });
    expect(location1.isEqual(location2)).toEqual(false);
    expect(location2.isEqual(location1)).toEqual(false);
  });

  it("isEqual is false with differing codes", () => {
    const location1 = AirportFactory.build({}, { transient: { code: "ZZZ" } });
    const location2 = AirportFactory.build({}, { transient: { code: "AAA" } });
    expect(location1.isEqual(location2)).toEqual(false);
    expect(location2.isEqual(location1)).toEqual(false);
  });
});
