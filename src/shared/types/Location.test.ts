import { AirportFactory } from "./factories/Location";

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
});
