import { LayoverFactory, LayoverFactoryInput } from "./factories/Layover";
import { LocationInput } from "./Location";
import { getParsedISODate } from "./utilities/getParsedISODate";

const layoverInput: LayoverFactoryInput = {
  arrivalLocalDateTime: getParsedISODate("2022-04-07T03:45:00.000Z"),
  arrivalLocation: { name: "Miami International Airport", code: "MIA", type: "AIRPORT" } as LocationInput,
  departureLocalDateTime: getParsedISODate("2022-04-07T06:58:00.000Z"),
  departureLocation: { name: "Miami International Airport", code: "MIA", type: "AIRPORT" } as LocationInput,
  durationMinutes: 193,
  elapsedTimezoneOffset: 60,
};

describe("Layover happy path", () => {
  it("getAirline works", () => {
    const layover = LayoverFactory.build({}, { transient: layoverInput });
    expect(JSON.parse(JSON.stringify(layover.getAirline()))).toEqual({ color: "#DFCCFB", name: "Layover in MIA" });
  });

  it("getArrivalLocalDateTime works", () => {
    const layover = LayoverFactory.build({}, { transient: layoverInput });
    expect(layover.getArrivalLocalDateTime()).toEqual(getParsedISODate("2022-04-07T03:45:00.000Z"));
  });

  it("getArrivalLocation works", () => {
    const flight = LayoverFactory.build({}, { transient: layoverInput });
    expect(JSON.parse(JSON.stringify(flight.getArrivalLocation()))).toEqual({
      code: "MIA",
      name: "Miami International Airport",
      type: "AIRPORT",
    });
  });

  it("getArrivalTripStartDateTime works", () => {
    const layover = LayoverFactory.build({}, { transient: layoverInput });
    expect(layover.getArrivalTripStartDateTime()).toEqual(getParsedISODate("2022-04-07T04:45:00.000Z"));
  });

  it("getDepartureLocalDateTime works", () => {
    const layover = LayoverFactory.build({}, { transient: layoverInput });
    expect(layover.getDepartureLocalDateTime()).toEqual(getParsedISODate("2022-04-07T06:58:00.000Z"));
  });

  it("getDepartureLocation works", () => {
    const flight = LayoverFactory.build({}, { transient: layoverInput });
    expect(JSON.parse(JSON.stringify(flight.getDepartureLocation()))).toEqual({
      code: "MIA",
      name: "Miami International Airport",
      type: "AIRPORT",
    });
  });

  it("getDepartureTripStartDateTime works", () => {
    const layover = LayoverFactory.build({}, { transient: layoverInput });
    expect(layover.getDepartureTripStartDateTime()).toEqual(getParsedISODate("2022-04-07T07:58:00.000Z"));
  });

  // TODO: Display times - date-fns doesn't like timezones and this only matters in testing...

  it("getDisplayDuration works", () => {
    // TODO: Mock and count call
    const layover = LayoverFactory.build({}, { transient: layoverInput });
    expect(layover.getDisplayDuration()).toEqual("3h 13m");
  });

  it("getDurationMinutes works", () => {
    const layover = LayoverFactory.build({}, { transient: layoverInput });
    expect(layover.getDurationMinutes()).toEqual(193);
  });

  it("getId works", () => {
    const layover = LayoverFactory.build({}, { transient: layoverInput });
    expect(layover.getId()).toEqual("1649314680000-1649303100000-MIA");
  });

  it("getType works", () => {
    const layover = LayoverFactory.build({}, { transient: layoverInput });
    expect(layover.getType()).toEqual("LAYOVER");
  });

  it("getTimezoneOffset works", () => {
    // TODO: Mock and count call
    const layover = LayoverFactory.build({}, { transient: layoverInput });
    expect(layover.getTimezoneOffset()).toEqual(0);
  });

  it("getCalculatedId works", () => {
    const layover = LayoverFactory.build({}, { transient: layoverInput });
    expect(layover.getCalculatedId()).toEqual("1649314680000-1649303100000-MIA");
  });

  it("getCalculatedPain works", () => {
    // TODO: Mock each fxn, count calls, and do math with return values...
    const layover = LayoverFactory.build({}, { transient: layoverInput });
    expect(layover.getCalculatedPain("econ")).toEqual(243.75);
  });

  it("isTransfer", () => {
    const layover = LayoverFactory.build({}, { transient: layoverInput });
    expect(layover.isTransfer()).toEqual(false);
  });

  it("getTimebarPositions works", () => {
    // TODO: Mock and count call
    const layover = LayoverFactory.build({}, { transient: layoverInput });
    expect(
      layover.getTimebarPositions({
        containerStartTime: getParsedISODate("2022-04-07T00:00:00.000Z"),
        containerEndTime: getParsedISODate("2022-04-08T00:00:00.000Z"),
        containerWidth: 1024,
      }),
    ).toEqual({ startX: 202.35, width: 137.03 });
  });

  it("getAriaLabelText works", () => {
    const layover = LayoverFactory.build({}, { transient: layoverInput });
    const value = layover.getAriaLabelText();
    expect(value).toEqual("A layover in MIA lasting for 3h 13m.");
  });
});
