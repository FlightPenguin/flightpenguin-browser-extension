import { AirlineFactory } from "./factories/Airline";

describe("Airline name lookup successful", () => {
  it("getName works", () => {
    const airline = AirlineFactory.build({}, { transient: { name: "Sun Country Airlines" } });
    expect(airline.getName()).toEqual("Sun Country");
  });

  it("getColor works", () => {
    const airline = AirlineFactory.build({}, { transient: { name: "Sun Country Airlines" } });
    expect(airline.getColor()).toEqual("#D79A71");
  });

  it("getCode works", () => {
    const airline = AirlineFactory.build({}, { transient: { name: "Sun Country Airlines" } });
    expect(airline.getCode()).toEqual("SY");
  });
});

describe("Airline name lookup fails", () => {
  it("getName works", () => {
    const airline = AirlineFactory.build({}, { transient: { name: "Testfail Air" } });
    expect(airline.getName()).toEqual("Testfail Air");
  });

  it("getColor works", () => {
    const airline = AirlineFactory.build({}, { transient: { name: "Testfail Air" } });
    expect(airline.getColor()).toEqual("#DFCCFB");
  });

  it("getCode works", () => {
    const airline = AirlineFactory.build({}, { transient: { name: "Testfail Air" } });
    expect(airline.getCode()).toEqual(undefined);
  });
});
