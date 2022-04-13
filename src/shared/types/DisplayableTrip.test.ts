import { CabinType } from "../../background/constants";
import { AirlineInput } from "./Airline";
import { DisplayableTripInput } from "./DisplayableTrip";
import { DisplayableTripFactory } from "./factories/DisplayableTrip";
import { LocationInput } from "./Location";
import { TripComponentInput } from "./TripComponent";
import { getParsedISODate } from "./utilities/getParsedISODate";

const tripInput = { cabin: "econ" as CabinType, lowestFare: 100 };

describe("DisplayableTrip happy path", () => {
  it("getTrip works", () => {
    const trip = DisplayableTripFactory.build({}, { transient: tripInput });
    expect(trip.getTrip()).toBeDefined();
  });

  it("getLowestFare works", () => {
    const trip = DisplayableTripFactory.build({}, { transient: tripInput });
    expect(trip.getLowestFare()).toEqual(100);
  });

  it("getPain works", () => {
    const trip = DisplayableTripFactory.build({}, { transient: tripInput });
    expect(trip.getPain()).toBeDefined();
    expect(trip.getPain()).toBeGreaterThan(0);
  });

  it("getCalculatedPain works", () => {
    const trip = DisplayableTripFactory.build({}, { transient: tripInput });
    expect(trip.getCalculatedPain()).toBeDefined();
    expect(trip.getCalculatedPain()).toBeGreaterThan(0);
  });

  // TODO: Constructor tests
  describe("getAriaLabelText text", () => {
    it("direct, 1 carrier", () => {
      const localTripInput = {
        cabin: "econ" as CabinType,
        lowestFare: 100,
        trip: {
          arrivalDateTime: getParsedISODate("2022-04-10T04:58:00.000Z"),
          arrivalLocation: { name: "Denver International Airport", code: "DEN", type: "AIRPORT" } as LocationInput,
          departureDateTime: getParsedISODate("2022-04-10T03:45:00.000Z"),
          departureLocation: {
            name: "Port Columbus International Airport",
            code: "CMH",
            type: "AIRPORT",
          } as LocationInput,
          durationMinutes: 193,
          tripComponents: [
            {
              type: "FLIGHT",
              object: {
                arrivalLocalDateTime: getParsedISODate("2022-04-10T04:58:00.000Z"),
                arrivalLocation: {
                  name: "Denver International Airport",
                  code: "DEN",
                  type: "AIRPORT",
                } as LocationInput,
                departureLocalDateTime: getParsedISODate("2022-04-10T03:45:00.000Z"),
                departureLocation: {
                  name: "Port Columbus International Airport",
                  code: "CMH",
                  type: "AIRPORT",
                } as LocationInput,
                durationMinutes: 193,
                elapsedTimezoneOffset: 0,
                marketingAirline: { name: "United" } as AirlineInput,
              },
            } as TripComponentInput,
          ],
        },
      };
      const trip = DisplayableTripFactory.build({}, { transient: localTripInput });
      expect(trip.getAriaLabelText()).toEqual(
        "A 100 dollar trip flying direct on United from CMH at 3:45am to DEN at 4:58am.",
      );
    });

    it("layovers, 1 carrier", () => {
      const localTripInput = {
        cabin: "econ" as CabinType,
        lowestFare: 100,
        trip: {
          arrivalDateTime: getParsedISODate("2022-04-07T05:58:00.000Z"),
          arrivalLocation: { name: "Denver International Airport", code: "DEN", type: "AIRPORT" } as LocationInput,
          departureDateTime: getParsedISODate("2022-04-07T03:45:00.000Z"),
          departureLocation: {
            name: "Port Columbus International Airport",
            code: "CMH",
            type: "AIRPORT",
          } as LocationInput,
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
                arrivalLocation: {
                  name: "Denver International Airport",
                  code: "DEN",
                  type: "AIRPORT",
                } as LocationInput,
                departureLocalDateTime: getParsedISODate("2022-04-07T04:45:00.000Z"),
                departureLocation: {
                  name: "Miami International Airport",
                  code: "MIA",
                  type: "AIRPORT",
                } as LocationInput,
                durationMinutes: 193,
                elapsedTimezoneOffset: 0,
                marketingAirline: { name: "United" } as AirlineInput,
              },
            } as TripComponentInput,
          ],
        },
      };
      const trip = DisplayableTripFactory.build({}, { transient: localTripInput });
      expect(trip.getAriaLabelText()).toEqual(
        "A 100 dollar trip flying with multiple flights on United from CMH at 3:45am to DEN at 5:58am. The details of the individual flights are as follows: United flight leaving CMH at 3:45am and arriving in MIA at 4:15am. A layover in MIA lasting for 30m. United flight leaving MIA at 4:45am and arriving in DEN at 5:58am.",
      );
    });

    it("layovers, multiple carriers", () => {
      const localTripInput = {
        cabin: "econ" as CabinType,
        lowestFare: 100,
        trip: {
          arrivalDateTime: getParsedISODate("2022-04-07T05:58:00.000Z"),
          arrivalLocation: { name: "Denver International Airport", code: "DEN", type: "AIRPORT" } as LocationInput,
          departureDateTime: getParsedISODate("2022-04-07T03:45:00.000Z"),
          departureLocation: {
            name: "Port Columbus International Airport",
            code: "CMH",
            type: "AIRPORT",
          } as LocationInput,
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
                arrivalLocation: {
                  name: "Denver International Airport",
                  code: "DEN",
                  type: "AIRPORT",
                } as LocationInput,
                departureLocalDateTime: getParsedISODate("2022-04-07T04:45:00.000Z"),
                departureLocation: {
                  name: "Miami International Airport",
                  code: "MIA",
                  type: "AIRPORT",
                } as LocationInput,
                durationMinutes: 193,
                elapsedTimezoneOffset: 0,
                marketingAirline: { name: "Frontier" } as AirlineInput,
              },
            } as TripComponentInput,
          ],
        },
      };
      const trip = DisplayableTripFactory.build({}, { transient: localTripInput });
      expect(trip.getAriaLabelText()).toEqual(
        "A 100 dollar trip flying with multiple flights on multiple airlines from CMH at 3:45am to DEN at 5:58am. The details of the individual flights are as follows: United flight leaving CMH at 3:45am and arriving in MIA at 4:15am. A layover in MIA lasting for 30m. Frontier flight leaving MIA at 4:45am and arriving in DEN at 5:58am.",
      );
    });
  });

  describe("addDominatedTrip", () => {
    it("adds a new trip", () => {
      const trip = DisplayableTripFactory.build({}, { transient: tripInput });
      const secondTrip = DisplayableTripFactory.build({}, { transient: tripInput });
      trip.addDominatedTrip(secondTrip);
      expect(trip.getDominatedTrips().length).toEqual(1);
    });

    it("will not add the same trip", () => {
      const trip = DisplayableTripFactory.build({}, { transient: tripInput });
      const secondTrip = DisplayableTripFactory.build({}, { transient: tripInput });
      trip.addDominatedTrip(secondTrip);
      trip.addDominatedTrip(secondTrip);
      trip.addDominatedTrip(secondTrip);
      trip.addDominatedTrip(secondTrip);
      trip.addDominatedTrip(secondTrip);
      trip.addDominatedTrip(secondTrip);
      expect(trip.getDominatedTrips().length).toEqual(1);
    });
  });

  it("resetDominatedTrip works", () => {
    const trip = DisplayableTripFactory.build({}, { transient: tripInput });
    const secondTrip = DisplayableTripFactory.build({}, { transient: tripInput });
    trip.addDominatedTrip(secondTrip);
    trip.resetDominatedTrips();
    expect(trip.getDominatedTrips().length).toEqual(0);
  });

  describe("isEqual", () => {
    it("equal", () => {
      const trip = DisplayableTripFactory.build({}, { transient: tripInput });
      const otherTrip = DisplayableTripFactory.build({}, { transient: { ...tripInput, trip: trip.getTrip() } });
      expect(trip.isEqual(otherTrip)).toEqual(true);
      expect(otherTrip.isEqual(trip)).toEqual(true);
    });

    it("fares different", () => {
      const trip = DisplayableTripFactory.build({}, { transient: tripInput });
      const otherTrip = DisplayableTripFactory.build(
        {},
        { transient: { ...tripInput, trip: trip.getTrip(), lowestFare: tripInput.lowestFare + 1 } },
      );
      expect(trip.isEqual(otherTrip)).toEqual(false);
      expect(otherTrip.isEqual(trip)).toEqual(false);
    });

    it("trips different", () => {
      const trip = DisplayableTripFactory.build({}, { transient: tripInput });
      const otherTrip = DisplayableTripFactory.build({}, { transient: tripInput });
      expect(trip.isEqual(otherTrip)).toEqual(false);
      expect(otherTrip.isEqual(trip)).toEqual(false);
    });
  });
});

const baseDominationTripInput = {
  cabin: "econ" as CabinType,
  lowestFare: 80,
  trip: {
    arrivalDateTime: getParsedISODate("2022-04-07T05:43:00.000Z"),
    arrivalLocation: { name: "Denver International Airport", code: "DEN", type: "AIRPORT" } as LocationInput,
    departureDateTime: getParsedISODate("2022-04-07T04:30:00.000Z"),
    departureLocation: {
      name: "Port Columbus International Airport",
      code: "CMH",
      type: "AIRPORT",
    } as LocationInput,
    durationMinutes: 193,
    tripComponents: [
      {
        type: "FLIGHT",
        object: {
          arrivalLocalDateTime: getParsedISODate("2022-04-07T05:43:00.000Z"),
          arrivalLocation: { name: "Denver International Airport", code: "DEN", type: "AIRPORT" } as LocationInput,
          departureLocalDateTime: getParsedISODate("2022-04-07T04:30:00.000Z"),
          departureLocation: {
            name: "Port Columbus International Airport",
            code: "CMH",
            type: "AIRPORT",
          } as LocationInput,
          durationMinutes: 193,
          elapsedTimezoneOffset: 0,
          marketingAirline: { name: "United" } as AirlineInput,
        },
      } as TripComponentInput,
    ],
  },
} as DisplayableTripInput;
const worseDominationTripInput = {
  cabin: "econ" as CabinType,
  lowestFare: 100,
  trip: {
    arrivalDateTime: getParsedISODate("2022-04-07T05:58:00.000Z"),
    arrivalLocation: { name: "Denver International Airport", code: "DEN", type: "AIRPORT" } as LocationInput,
    departureDateTime: getParsedISODate("2022-04-07T03:45:00.000Z"),
    departureLocation: {
      name: "Port Columbus International Airport",
      code: "CMH",
      type: "AIRPORT",
    } as LocationInput,
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
          arrivalLocation: {
            name: "Denver International Airport",
            code: "DEN",
            type: "AIRPORT",
          } as LocationInput,
          departureLocalDateTime: getParsedISODate("2022-04-07T04:45:00.000Z"),
          departureLocation: {
            name: "Miami International Airport",
            code: "MIA",
            type: "AIRPORT",
          } as LocationInput,
          durationMinutes: 193,
          elapsedTimezoneOffset: 0,
          marketingAirline: { name: "United" } as AirlineInput,
        },
      } as TripComponentInput,
    ],
  },
} as DisplayableTripInput;

describe("Domination tests", () => {
  it("works when all conditions match", () => {
    const trip = DisplayableTripFactory.build({}, { transient: baseDominationTripInput });
    const secondTrip = DisplayableTripFactory.build({}, { transient: worseDominationTripInput });
    const value = trip.isDominatableByTrip(secondTrip);
    expect(value).toEqual(true);
  });

  it("fails when there are more than 1 carriers", () => {
    const brokenInput = { ...worseDominationTripInput } as DisplayableTripInput;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    brokenInput["trip"]["tripComponents"][1]["object"]["marketingAirline"]["name"] = "Frontier";

    const trip = DisplayableTripFactory.build({}, { transient: baseDominationTripInput });
    const secondTrip = DisplayableTripFactory.build({}, { transient: brokenInput });
    const value = trip.isDominatableByTrip(secondTrip);
    expect(value).toEqual(false);
  });

  it("different carriers", () => {
    const brokenInput = { ...baseDominationTripInput } as DisplayableTripInput;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    brokenInput["trip"]["tripComponents"][0]["object"]["marketingAirline"]["name"] = "Frontier";

    const trip = DisplayableTripFactory.build({}, { transient: brokenInput });
    const secondTrip = DisplayableTripFactory.build({}, { transient: worseDominationTripInput });
    const value = trip.isDominatableByTrip(secondTrip);
    expect(value).toEqual(false);
  });

  it("different departure Airport", () => {
    const brokenInput = { ...baseDominationTripInput } as DisplayableTripInput;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    brokenInput["trip"]["tripComponents"][0]["object"]["departureLocation"]["code"] = "ZZZ";

    const trip = DisplayableTripFactory.build({}, { transient: brokenInput });
    const secondTrip = DisplayableTripFactory.build({}, { transient: worseDominationTripInput });
    const value = trip.isDominatableByTrip(secondTrip);
    expect(value).toEqual(false);
  });

  it("different arrival Airport", () => {
    const brokenInput = { ...worseDominationTripInput } as DisplayableTripInput;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    brokenInput["trip"]["tripComponents"][1]["object"]["arrivalLocation"]["code"] = "ZZZ";

    const trip = DisplayableTripFactory.build({}, { transient: baseDominationTripInput });
    const secondTrip = DisplayableTripFactory.build({}, { transient: brokenInput });
    const value = trip.isDominatableByTrip(secondTrip);
    expect(value).toEqual(false);
  });

  it("cheaper", () => {
    const brokenInput = { ...baseDominationTripInput } as DisplayableTripInput;
    brokenInput["lowestFare"] = 12;

    const trip = DisplayableTripFactory.build({}, { transient: brokenInput });
    const secondTrip = DisplayableTripFactory.build({}, { transient: worseDominationTripInput });
    const value = trip.isDominatableByTrip(secondTrip);
    expect(value).toEqual(false);
  });

  it("leaves later", () => {
    const brokenInput = { ...worseDominationTripInput } as DisplayableTripInput;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    brokenInput["trip"].departureDateTime = getParsedISODate("2022-04-07T04:30:01.000Z");

    const trip = DisplayableTripFactory.build({}, { transient: baseDominationTripInput });
    const secondTrip = DisplayableTripFactory.build({}, { transient: brokenInput });
    const value = trip.isDominatableByTrip(secondTrip);
    expect(value).toEqual(false);
  });

  it("arrives earlier", () => {
    const brokenInput = { ...worseDominationTripInput } as DisplayableTripInput;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    brokenInput["trip"].arrivalDateTime = getParsedISODate("2022-04-07T05:42:59.000Z");

    const trip = DisplayableTripFactory.build({}, { transient: baseDominationTripInput });
    const secondTrip = DisplayableTripFactory.build({}, { transient: brokenInput });
    const value = trip.isDominatableByTrip(secondTrip);
    expect(value).toEqual(false);
  });
});
