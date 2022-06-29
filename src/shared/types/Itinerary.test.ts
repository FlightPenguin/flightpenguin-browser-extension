import { CabinType } from "../../background/constants";
import { AirlineInput } from "./Airline";
import { DisplayableTrip } from "./DisplayableTrip";
import { DisplayableTripFactory } from "./factories/DisplayableTrip";
import { ItineraryFactory } from "./factories/Itinerary";
import { Itinerary, ItineraryInput } from "./Itinerary";
import { LocationInput } from "./Location";
import { TripComponentInput } from "./TripComponent";
import { TripSource } from "./TripSource";
import { getParsedISODate } from "./utilities/getParsedISODate";

const itineraryInput: ItineraryInput = {
  cabin: "econ" as CabinType,
  sources: [
    { fare: 450, id: "meow", name: "Expedia", isFirstParty: false },
    { fare: 400, id: "woof", name: "CheapOair", isFirstParty: false },
  ],
  trips: [
    {
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
    },
    {
      arrivalDateTime: getParsedISODate("2022-04-10T04:58:00.000Z"),
      arrivalLocation: { name: "Denver International Airport", code: "DEN", type: "AIRPORT" } as LocationInput,
      departureDateTime: getParsedISODate("2022-04-10T03:45:00.000Z"),
      departureLocation: { name: "Port Columbus International Airport", code: "CMH", type: "AIRPORT" } as LocationInput,
      durationMinutes: 193,
      tripComponents: [
        {
          type: "FLIGHT",
          object: {
            arrivalLocalDateTime: getParsedISODate("2022-04-10T04:58:00.000Z"),
            arrivalLocation: { name: "Denver International Airport", code: "DEN", type: "AIRPORT" } as LocationInput,
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
  ],
};

describe("Itinerary happy path", () => {
  it("getCabin works", () => {
    const itin = ItineraryFactory.build({}, { transient: itineraryInput });
    expect(itin.getCabin()).toEqual("econ");
  });

  it("getId works", () => {
    const itin = ItineraryFactory.build({}, { transient: itineraryInput });
    expect(itin.getId()).toEqual(
      "1649303100000-1649304900000-United-1649306700000-1649311080000-Frontier-1649562300000-1649566680000-United",
    );
  });

  it("getPain works", () => {
    const itin = ItineraryFactory.build({}, { transient: itineraryInput });
    expect(itin.getPain()).toBeDefined();
    expect(itin.getPain()).toBeGreaterThan(0);
  });

  it("getCalculatedPain works", () => {
    const itin = ItineraryFactory.build({}, { transient: itineraryInput });
    expect(itin.getCalculatedPain()).toBeDefined();
    expect(itin.getCalculatedPain()).toBeGreaterThan(0);
  });

  it("getTopSource works", () => {
    const itin = ItineraryFactory.build({}, { transient: itineraryInput });
    expect(JSON.parse(JSON.stringify(itin.getTopSource()))).toEqual({
      fare: 400,
      id: "woof",
      name: "CheapOair",
      isFirstParty: false,
      displayNames: ["CheapOair"],
    });
  });

  it("addOrUpdateSource works - add new", () => {
    const itin = ItineraryFactory.build({}, { transient: itineraryInput });
    itin.addOrUpdateSource(new TripSource({ fare: 273, name: "addfake", isFirstParty: false }));
    const rawItin = JSON.parse(JSON.stringify(itin));
    expect(rawItin.sources.length).toEqual(3);
    expect(rawItin.sources[2]).toEqual({
      displayNames: ["addfake"],
      fare: 273,
      name: "addfake",
      id: null,
      isFirstParty: false,
    });
  });

  it("addOrUpdateSource works - update existing with provider match", () => {
    const itin = ItineraryFactory.build({}, { transient: itineraryInput });
    itin.addOrUpdateSource(new TripSource({ fare: 555, name: "Expedia", isFirstParty: false }));
    const rawItin = JSON.parse(JSON.stringify(itin));
    expect(rawItin.sources.length).toEqual(2);
    expect(
      rawItin.sources.filter((source: any) => {
        return source.displayNames[0] === "Expedia";
      })[0],
    ).toEqual({
      displayNames: ["Expedia"],
      fare: 555,
      name: "Expedia",
      id: null,
      isFirstParty: false,
    });
  });

  it("addOrUpdateSource works - update existing different providers, chooses existing when cheaper", () => {
    const itin = ItineraryFactory.build({}, { transient: itineraryInput });
    itin.addOrUpdateSource(
      new TripSource({ fare: 555, name: "fakeprovider", isFirstParty: false, displayNames: ["Expedia"] }),
    );
    const rawItin = JSON.parse(JSON.stringify(itin));
    expect(rawItin.sources.length).toEqual(2);
    expect(
      rawItin.sources.filter((source: any) => {
        return source.displayNames[0] === "Expedia";
      })[0],
    ).toEqual({
      displayNames: ["Expedia"],
      fare: 450,
      id: "meow",
      name: "Expedia",
      isFirstParty: false,
    });
  });

  it("addOrUpdateSource works - update existing different providers, chooses new when cheaper", () => {
    const itin = ItineraryFactory.build({}, { transient: itineraryInput });
    itin.addOrUpdateSource(
      new TripSource({ fare: 333, name: "fakeprovider", isFirstParty: false, displayNames: ["Expedia"] }),
    );
    const rawItin = JSON.parse(JSON.stringify(itin));
    expect(rawItin.sources.length).toEqual(2);
    expect(
      rawItin.sources.filter((source: any) => {
        return source.displayNames[0] === "Expedia";
      })[0],
    ).toEqual({
      displayNames: ["Expedia"],
      fare: 333,
      id: null,
      name: "fakeprovider",
      isFirstParty: false,
    });
  });

  it("getMaxIndexMatch works - no selection", () => {
    const itin = ItineraryFactory.build({}, { transient: itineraryInput });
    expect(itin.getMaxIndexMatch([])).toEqual(0);
  });

  it("getMaxIndexMatch works - no match", () => {
    const itin = ItineraryFactory.build({}, { transient: itineraryInput });

    const tripInput = { cabin: "econ" as CabinType, lowestFare: 100, tripInput: undefined };
    const trip = DisplayableTripFactory.build({}, { transient: tripInput });

    expect(itin.getMaxIndexMatch([trip])).toEqual(0);
  });

  it("getMaxIndexMatch works - match", () => {
    const itin = ItineraryFactory.build({}, { transient: itineraryInput });

    const displayableTrips = itin.getTrips().map((trip) => {
      const cabin = itin.getCabin();
      const lowestFare = itin.getTopSource().getFare();
      return new DisplayableTrip({
        cabin,
        lowestFare,
        bookingSources: ["meow"],
        trip,
        containerInfo: { earliestTime: trip.getDepartureDateTime(), latestTime: trip.getArrivalDateTime() },
      });
    });

    expect(itin.getMaxIndexMatch(displayableTrips)).toEqual(2);
  });

  it("isDenyListed works - no denied carrier", () => {
    const itin = ItineraryFactory.build({}, { transient: itineraryInput });
    expect(itin.isDenyListed()).toEqual(false);
  });

  it("isDenyListed works - denied carrier", () => {
    const input = { ...itineraryInput };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    input["trips"].slice(-1)[0]["tripComponents"].slice(-1)[0]["object"]["marketingAirline"]["name"] = "Southwest";
    const itin = ItineraryFactory.build({}, { transient: itineraryInput });
    expect(itin.isDenyListed()).toEqual(true);
  });
});

describe("Itinerary constructor tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("has id defined as an argument", () => {
    const getCalcMock = jest.spyOn(Itinerary.prototype, "getCalculatedFlightPenguinId");

    new Itinerary({ ...itineraryInput, id: "abcd1234" });
    expect(getCalcMock).toHaveBeenCalledTimes(0);
  });

  it("has id not defined as an argument", () => {
    const getCalcMock = jest.spyOn(Itinerary.prototype, "getCalculatedFlightPenguinId");

    new Itinerary({ ...itineraryInput });
    expect(getCalcMock).toHaveBeenCalledTimes(1);
  });

  it("has pain defined as an argument with truthy value", () => {
    const getCalcMock = jest.spyOn(Itinerary.prototype, "getCalculatedPain");

    new Itinerary({
      ...itineraryInput,
      pain: 4,
    });
    expect(getCalcMock).toHaveBeenCalledTimes(0);
  });

  it("has pain defined as an argument with truthy value", () => {
    const getCalcMock = jest.spyOn(Itinerary.prototype, "getCalculatedPain");

    new Itinerary({
      ...itineraryInput,
      pain: 0,
    });
    expect(getCalcMock).toHaveBeenCalledTimes(0);
  });

  it("has pain defined as an argument with undefined value", () => {
    const getCalcMock = jest.spyOn(Itinerary.prototype, "getCalculatedPain");

    new Itinerary({
      ...itineraryInput,
    });
    expect(getCalcMock).toHaveBeenCalledTimes(1);
  });
});
