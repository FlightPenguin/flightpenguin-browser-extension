import { AirlineInput } from "./Airline";
import { TripFactory } from "./factories/Trip";
import { LocationInput } from "./Location";
import { TripComponentInput } from "./TripComponent";
import { getParsedISODate } from "./utilities/getParsedISODate";

const input = {
  arrivalDateTime: getParsedISODate("2022-04-07T05:58:00.000Z"),
  arrivalLocation: { name: "Denver International Airport", code: "DEN", type: "AIRPORT" } as LocationInput,
  departureDateTime: getParsedISODate("2022-04-07T03:45:00.000Z"),
  departureLocation: { name: "Port Columbus International Airport", code: "CMH", type: "AIRPORT" } as LocationInput,
  durationMinutes: 253,
  tripComponents: [
    {
      type: "FLIGHT",
      object: {
        arrivalLocalDateTime: getParsedISODate("2022-04-07T04:15:00.000Z"),
        arrivalLocation: { name: "Miami International Airport", code: "MIA", type: "AIRPORT" } as LocationInput,
        departureLocalDateTime: getParsedISODate("2022-04-07T03:45:00.000Z"),
        departureLocation: {
          name: "Port Columbus International Airport",
          code: "CMH",
          type: "AIRPORT",
        } as LocationInput,
        durationMinutes: 30,
        elapsedTimezoneOffset: 0,
        marketingAirline: { name: "United" } as AirlineInput,
      },
    } as TripComponentInput,
    {
      type: "FLIGHT",
      object: {
        arrivalLocalDateTime: getParsedISODate("2022-04-07T05:58:00.000Z"),
        arrivalLocation: { name: "Denver International Airport", code: "DEN", type: "AIRPORT" } as LocationInput,
        departureLocalDateTime: getParsedISODate("2022-04-07T04:45:00.000Z"),
        departureLocation: { name: "Miami International Airport", code: "MIA", type: "AIRPORT" } as LocationInput,
        durationMinutes: 193,
        elapsedTimezoneOffset: 0,
        marketingAirline: { name: "Frontier" } as AirlineInput,
      },
    } as TripComponentInput,
  ],
};

describe("Trip happy path", () => {
  it("getArrivalDateTime works", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.getArrivalDateTime()).toEqual(getParsedISODate("2022-04-07T05:58:00.000Z"));
  });

  it("getArrivalLocation works", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(JSON.parse(JSON.stringify(trip.getArrivalLocation()))).toEqual({
      code: "DEN",
      name: "Denver International Airport",
      type: "AIRPORT",
    });
  });

  it("getCarriers works", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.getCarriers()).toEqual(["United", "Frontier"]);
  });

  it("getDisplayCarriers works", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.getDisplayCarriers()).toEqual("United, Frontier");
  });

  it("getDepartureLocalDateTime works", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.getDepartureDateTime()).toEqual(getParsedISODate("2022-04-07T03:45:00.000Z"));
  });

  it("getDepartureLocation works", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(JSON.parse(JSON.stringify(trip.getDepartureLocation()))).toEqual({
      name: "Port Columbus International Airport",
      code: "CMH",
      type: "AIRPORT",
    });
  });

  // TODO: Deal with timezone issues for tests in getDisplay*Time

  it("getDisplayDuration works", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.getDisplayDuration()).toEqual("4h 13m");
  });

  it("getDurationMinutes works", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.getDurationMinutes()).toEqual(253);
  });

  it("getId works", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.getId()).toEqual("1649303100000-1649304900000-United-1649306700000-1649311080000-Frontier");
  });

  it("getLayoverAirportCodes works", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.getLayoverAirportCodes()).toEqual(["MIA"]);
  });

  it("getLayoverCount works", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.getLayoverAirportCodes()).toEqual(["MIA"]);
  });

  it("getTimezoneOffset works", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.getTimezoneOffset()).toEqual(-120);
  });

  it("getTripComponents works", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.getTripComponents()).toBeDefined();
    expect(trip.getTripComponents().length).toEqual(3);
    expect(trip.getTripComponents()[0].getType()).toEqual("FLIGHT");
    expect(trip.getTripComponents()[0].getObject().getDepartureLocation().getCode()).toEqual("CMH");
    expect(trip.getTripComponents()[1].getType()).toEqual("LAYOVER");
    expect(trip.getTripComponents()[1].getObject().getDepartureLocation().getCode()).toEqual("MIA");
    expect(trip.getTripComponents()[2].getType()).toEqual("FLIGHT");
    expect(trip.getTripComponents()[2].getObject().getDepartureLocation().getCode()).toEqual("MIA");
  });

  it("getFlights works", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.getFlights()).toBeDefined();
    expect(trip.getFlights().length).toEqual(2);
    expect(trip.getFlights()[0].getDepartureLocation().getCode()).toEqual("CMH");
    expect(trip.getFlights()[1].getArrivalLocation().getCode()).toEqual("DEN");
  });

  it("getLayovers works", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.getLayovers()).toBeDefined();
    expect(trip.getLayovers().length).toEqual(1);
    expect(trip.getLayovers()[0].getDepartureLocation().getCode()).toEqual("MIA");
    expect(trip.getLayovers()[0].getArrivalLocation().getCode()).toEqual("MIA");
  });

  it("getCalculatedCarriers works", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.getCalculatedCarriers()).toEqual(["United", "Frontier"]);
  });

  it("getCalculatedId works", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.getCalculatedId()).toEqual("1649303100000-1649304900000-United-1649306700000-1649311080000-Frontier");
  });

  it("getCalculatedLayoverAirportCodes works", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.getCalculatedLayoverAirportCodes()).toEqual(["MIA"]);
  });

  it("getCalculatedLayoverCount works", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.getCalculatedLayoverCount()).toEqual(1);
  });

  it("getCalculatedPain works", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.getCalculatedPain("econ")).toBeDefined();
    expect(trip.getCalculatedPain("econ")).toBeGreaterThan(0);
  });

  it("isArrivingBeforeTime null input", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.isArrivingBeforeTime(null)).toEqual(true);
  });

  it("isArrivingBeforeTime input before", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.isArrivingBeforeTime(getParsedISODate("2022-04-07T00:00:00.000Z"))).toEqual(false);
  });

  it("isArrivingBeforeTime input after", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.isArrivingBeforeTime(getParsedISODate("2022-04-08T00:00:00.000Z"))).toEqual(true);
  });

  it("isDepartingAfterTime null input", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.isDepartingAfterTime(null)).toEqual(true);
  });

  it("isDepartingAfterTime input before", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.isDepartingAfterTime(getParsedISODate("2022-04-07T00:00:00.000Z"))).toEqual(true);
  });

  it("isDepartingAfterTime input after", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.isDepartingAfterTime(getParsedISODate("2022-04-08T00:00:00.000Z"))).toEqual(false);
  });

  it("isLayoverCountInRange input undefined", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.isLayoverCountInRange(undefined)).toEqual(true);
  });

  it("isLayoverCountInRange input equal", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.isLayoverCountInRange([1])).toEqual(true);
  });

  it("isLayoverCountInRange input includes", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.isLayoverCountInRange([0, 1])).toEqual(true);
  });

  it("isLayoverCountInRange input does not include", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.isLayoverCountInRange([2])).toEqual(false);
  });

  it("isLayoverInCity input undefined", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.isLayoverInCity(undefined)).toEqual(true);
  });

  it("isLayoverInCity input equal", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.isLayoverInCity(["MIA"])).toEqual(true);
  });

  it("isLayoverInCity input includes some", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.isLayoverInCity(["ORD", "MIA"])).toEqual(false);
  });

  it("isLayoverInCity input does not include", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.isLayoverInCity(["MEOW"])).toEqual(false);
  });

  it("isFlownByCarriers input undefined", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.isFlownByCarriers(undefined)).toEqual(true);
  });

  it("isFlownByCarriers input equal", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.isFlownByCarriers(["Frontier", "United"])).toEqual(true);
  });

  it("isFlownByCarriers input includes some", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.isFlownByCarriers(["Frontier"])).toEqual(false);
  });

  it("isFlownByCarriers input does not include", () => {
    const trip = TripFactory.build({}, { transient: input });
    expect(trip.isFlownByCarriers(["MEOW"])).toEqual(false);
  });

  // TODO: ENsure add layovers, etc. called in constructor
});
