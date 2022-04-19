import { Airline } from "./Airline";
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

describe("constructor", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("calls AirlineMap.getAirlineDetails when missing required field", () => {
    const getAirlineInfoMock = jest.spyOn(Airline.prototype, "getAirlineInfo");

    new Airline({ name: "MeowAir" });
    expect(getAirlineInfoMock).toHaveBeenCalledWith("MeowAir");
  });

  it("does not call AirlineMap.getAirlineDetails when having a generic match", () => {
    const getAirlineInfoMock = jest.spyOn(Airline.prototype, "getAirlineInfo");

    new Airline({ name: "MeowAir", color: "#000000" });
    expect(getAirlineInfoMock).toHaveBeenCalledTimes(0);
  });

  it("does not call AirlineMap.getAirlineDetails when having a full match", () => {
    const getAirlineInfoMock = jest.spyOn(Airline.prototype, "getAirlineInfo");

    new Airline({ name: "MeowAir", color: "#000000", code: "CAT", alliance: "Feline Alliance" });
    expect(getAirlineInfoMock).toHaveBeenCalledTimes(0);
  });
});
