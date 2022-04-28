import { LayoverFactory, LayoverFactoryInput } from "./factories/Layover";
import { Layover, LayoverInput } from "./Layover";
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
const layoverObjInput: LayoverInput = {
  ...layoverInput,
  arrivalTripStartDateTime: layoverInput.arrivalLocalDateTime,
  departureTripStartDateTime: layoverInput.departureLocalDateTime,
};
const expectedDescriptionText = `Layover in MIA
Begins at 3:45am local time
Ends at 6:58am local time
Layover duration of 3h 13m`;

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

  it("getAriaLabelText works", () => {
    const layover = LayoverFactory.build({}, { transient: layoverInput });
    const value = layover.getAriaLabelText();
    expect(value).toEqual("A layover in MIA lasting for 3h 13m.");
  });

  it("getCalculatedDisplayDescriptionText works", () => {
    const layover = LayoverFactory.build({}, { transient: layoverInput });
    const value = layover.getCalculatedDisplayDescriptionText();
    expect(value).toEqual(expectedDescriptionText);
  });

  it("getDisplayDescriptionText works", () => {
    const layover = LayoverFactory.build({}, { transient: layoverInput });
    const value = layover.getDisplayDescriptionText();
    expect(value).toEqual(expectedDescriptionText);
  });
});

describe("Layover constructor tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("has ariaLabelText defined as an argument", () => {
    const getCalcMock = jest.spyOn(Layover.prototype, "getCalculatedAriaLabelText");

    new Layover({ ...layoverObjInput, ariaLabelText: "10:31pm" });
    expect(getCalcMock).toHaveBeenCalledTimes(0);
  });

  it("has ariaLabelText not defined as an argument", () => {
    const getCalcMock = jest.spyOn(Layover.prototype, "getCalculatedAriaLabelText");

    new Layover({ ...layoverObjInput });
    expect(getCalcMock).toHaveBeenCalledTimes(1);
  });

  it("has arrivalLocalDisplayTime defined as an argument", () => {
    const getCalcMock = jest.spyOn(Layover.prototype, "getCalculatedDisplayArrivalLocalTime");

    new Layover({ ...layoverObjInput, arrivalLocalDisplayTime: "10:31pm" });
    expect(getCalcMock).toHaveBeenCalledTimes(0);
  });

  it("has arrivalLocalDisplayTime not defined as an argument", () => {
    const getCalcMock = jest.spyOn(Layover.prototype, "getCalculatedDisplayArrivalLocalTime");

    new Layover({ ...layoverObjInput });
    expect(getCalcMock).toHaveBeenCalledTimes(1);
  });

  it("has arrivalTripStartDisplayTime defined as an argument", () => {
    const getCalcMock = jest.spyOn(Layover.prototype, "getCalculatedDisplayArrivalTripStartTime");

    new Layover({ ...layoverObjInput, arrivalTripStartDisplayTime: "10:31pm" });
    expect(getCalcMock).toHaveBeenCalledTimes(0);
  });

  it("has arrivalTripStartDisplayTime not defined as an argument", () => {
    const getCalcMock = jest.spyOn(Layover.prototype, "getCalculatedDisplayArrivalTripStartTime");

    new Layover({ ...layoverObjInput });
    expect(getCalcMock).toHaveBeenCalledTimes(1);
  });

  it("has departureLocalDisplayTime defined as an argument", () => {
    const getCalcMock = jest.spyOn(Layover.prototype, "getCalculatedDisplayDepartureLocalTime");

    new Layover({ ...layoverObjInput, departureLocalDisplayTime: "10:31pm" });
    expect(getCalcMock).toHaveBeenCalledTimes(0);
  });

  it("has departureLocalDisplayTime not defined as an argument", () => {
    const getCalcMock = jest.spyOn(Layover.prototype, "getCalculatedDisplayDepartureLocalTime");

    new Layover({ ...layoverObjInput });
    expect(getCalcMock).toHaveBeenCalledTimes(1);
  });

  it("has departureTripStartDisplayTime defined as an argument", () => {
    const getCalcMock = jest.spyOn(Layover.prototype, "getCalculatedDisplayDepartureTripStartTime");

    new Layover({ ...layoverObjInput, departureTripStartDisplayTime: "10:31pm" });
    expect(getCalcMock).toHaveBeenCalledTimes(0);
  });

  it("has departureTripStartDisplayTime not defined as an argument", () => {
    const getCalcMock = jest.spyOn(Layover.prototype, "getCalculatedDisplayDepartureTripStartTime");

    new Layover({ ...layoverObjInput });
    expect(getCalcMock).toHaveBeenCalledTimes(1);
  });

  it("has durationDisplay defined as an argument", () => {
    const getCalcMock = jest.spyOn(Layover.prototype, "getCalculatedDisplayDuration");

    new Layover({ ...layoverObjInput, durationDisplay: "1h 31m" });
    expect(getCalcMock).toHaveBeenCalledTimes(0);
  });

  it("has durationDisplay not defined as an argument", () => {
    const getCalcMock = jest.spyOn(Layover.prototype, "getCalculatedDisplayDuration");

    new Layover({ ...layoverObjInput });
    expect(getCalcMock).toHaveBeenCalledTimes(1);
  });

  it("has id defined as an argument", () => {
    const getCalcMock = jest.spyOn(Layover.prototype, "getCalculatedId");

    new Layover({ ...layoverObjInput, id: "abcd1234" });
    expect(getCalcMock).toHaveBeenCalledTimes(0);
  });

  it("has id not defined as an argument", () => {
    const getCalcMock = jest.spyOn(Layover.prototype, "getCalculatedId");

    new Layover({ ...layoverObjInput });
    expect(getCalcMock).toHaveBeenCalledTimes(1);
  });

  it("has descriptionDisplayText defined as an argument", () => {
    const getCalcMock = jest.spyOn(Layover.prototype, "getCalculatedDisplayDescriptionText");

    new Layover({ ...layoverObjInput, descriptionDisplayText: "abcd1234" });
    expect(getCalcMock).toHaveBeenCalledTimes(0);
  });

  it("has descriptionDisplayText not defined as an argument", () => {
    const getCalcMock = jest.spyOn(Layover.prototype, "getCalculatedDisplayDescriptionText");

    new Layover({ ...layoverObjInput });
    expect(getCalcMock).toHaveBeenCalledTimes(1);
  });
});
