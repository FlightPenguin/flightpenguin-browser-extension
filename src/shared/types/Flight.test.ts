import { AirlineInput } from "./Airline";
import { FlightFactory } from "./factories/Flight";
import { FlightInput } from "./Flight";
import { LocationInput } from "./Location";
import { getParsedISODate } from "./utilities/getParsedISODate";

const flightInput: FlightInput = {
  arrivalLocalDateTime: getParsedISODate("2022-04-07T04:58:00.000Z"),
  arrivalLocation: { name: "Denver International Airport", code: "DEN", type: "AIRPORT" } as LocationInput,
  departureLocalDateTime: getParsedISODate("2022-04-07T03:45:00.000Z"),
  departureLocation: { name: "Port Columbus International Airport", code: "CMH", type: "AIRPORT" } as LocationInput,
  durationMinutes: 193,
  elapsedTimezoneOffset: 0,
  marketingAirline: { name: "United" } as AirlineInput,
};

describe("Flight happy path", () => {
  it("returns marketing airline with no operating airline", () => {
    const flight = FlightFactory.build({}, { transient: flightInput });
    expect(flight.getAirline()).toEqual({ name: "United", code: "UA", color: "#235EA6" });
  });

  it("returns operating airline with an operating airline", () => {
    const flight = FlightFactory.build(
      {},
      { transient: { ...flightInput, operatingAirline: { name: "jetBlue" } as AirlineInput } },
    );
    expect(flight.getAirline()).toEqual({ name: "jetBlue", code: "B6", color: "#5F90C8" });
  });

  it("getArrivalLocalDateTime works", () => {
    const flight = FlightFactory.build({}, { transient: flightInput });
    expect(flight.getArrivalLocalDateTime()).toEqual(getParsedISODate("2022-04-07T04:58:00.000Z"));
  });

  it("getArrivalLocation works", () => {
    const flight = FlightFactory.build({}, { transient: flightInput });
    expect(JSON.parse(JSON.stringify(flight.getArrivalLocation()))).toEqual({
      code: "DEN",
      name: "Denver International Airport",
      type: "AIRPORT",
    });
  });

  it("getArrivalTripStartDateTime works", () => {
    const flight = FlightFactory.build({}, { transient: flightInput });
    expect(flight.getArrivalTripStartDateTime()).toEqual(getParsedISODate("2022-04-07T06:58:00.000Z"));
  });

  it("getDepartureLocalDateTime works", () => {
    const flight = FlightFactory.build({}, { transient: flightInput });
    expect(flight.getDepartureLocalDateTime()).toEqual(getParsedISODate("2022-04-07T03:45:00.000Z"));
  });

  it("getDepartureLocation works", () => {
    const flight = FlightFactory.build({}, { transient: flightInput });
    expect(JSON.parse(JSON.stringify(flight.getDepartureLocation()))).toEqual({
      name: "Port Columbus International Airport",
      code: "CMH",
      type: "AIRPORT",
    });
  });

  it("getDepartureTripStartDateTime works", () => {
    const flight = FlightFactory.build({}, { transient: flightInput });
    expect(flight.getDepartureTripStartDateTime()).toEqual(getParsedISODate("2022-04-07T03:45:00.000Z"));
  });

  // TODO: Display times - date-fns doesn't like timezones and this only matters in testing...

  it("getDisplayDuration works", () => {
    // TODO: Mock and count call
    const flight = FlightFactory.build({}, { transient: flightInput });
    expect(flight.getDisplayDuration()).toEqual("3h 13m");
  });

  it("getDurationMinutes works", () => {
    const flight = FlightFactory.build({}, { transient: flightInput });
    expect(flight.getDurationMinutes()).toEqual(193);
  });

  it("getId works", () => {
    const flight = FlightFactory.build({}, { transient: flightInput });
    expect(flight.getId()).toEqual("1649303100000-1649307480000-United");
  });

  it("getTimezoneOffset works", () => {
    // TODO: Mock and count call
    const flight = FlightFactory.build({}, { transient: flightInput });
    expect(flight.getTimezoneOffset()).toEqual(-120);
  });

  it("getCalculatedArrivalTripStartDateTime works", () => {
    const flight = FlightFactory.build({}, { transient: flightInput });
    expect(
      flight.getCalculatedArrivalTripStartDateTime(
        flightInput.departureLocalDateTime as Date,
        flightInput.durationMinutes as number,
      ),
    ).toEqual(getParsedISODate("2022-04-07T06:58:00.000Z"));
  });

  it("getCalculatedDepartureTripStartDateTime works", () => {
    const flight = FlightFactory.build({}, { transient: flightInput });
    expect(flight.getCalculatedDepartureTripStartDateTime(flightInput.departureLocalDateTime as Date, 60)).toEqual(
      getParsedISODate("2022-04-07T02:45:00.000Z"),
    );
  });

  it("getCalculatedId works", () => {
    const flight = FlightFactory.build({}, { transient: flightInput });
    expect(
      flight.getCalculatedId(
        flight.getAirline(),
        flightInput.departureLocalDateTime as Date,
        flightInput.arrivalLocalDateTime as Date,
      ),
    ).toEqual("1649303100000-1649307480000-United");
  });

  it("getCalculatedPain works", () => {
    // TODO: Mock each fxn, count calls, and do math with return values...
    const flight = FlightFactory.build({}, { transient: flightInput });
    expect(flight.getCalculatedPain("econ")).toEqual(81.25);
  });

  it("getTimebarPositions works", () => {
    // TODO: Mock and count call
    const flight = FlightFactory.build({}, { transient: flightInput });
    expect(
      flight.getTimebarPositions({
        containerStartTime: getParsedISODate("2022-04-07T00:00:00.000Z"),
        containerEndTime: getParsedISODate("2022-04-08T00:00:00.000Z"),
        containerWidth: 1024,
      }),
    ).toEqual({ startX: 159.75, width: 137.03 });
  });

  it("getAriaLabelText works", () => {
    const flight = FlightFactory.build({}, { transient: flightInput });
    const value = flight.getAriaLabelText();
    expect(value).toEqual("United flight leaving CMH at 3:45am and arriving in DEN at 4:58am.");
  });
});