import { CabinType } from "../../background/constants";
import { AirlineInput } from "./Airline";
import { DisplayableTrip } from "./DisplayableTrip";
import { DisplayableTripFactory } from "./factories/DisplayableTrip";
import { ItineraryFactory } from "./factories/Itinerary";
import { LocationInput } from "./Location";
import { TripComponentInput } from "./TripComponent";
import { TripSource } from "./TripSource";
import { getParsedISODate } from "./utilities/getParsedISODate";

const itineraryInput = {
  cabin: "econ" as CabinType,
  sources: [
    { fare: 450, id: "meow", name: "expedia" },
    { fare: 400, id: "woof", name: "cheapoair" },
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
    expect(JSON.parse(JSON.stringify(itin.getTopSource()))).toEqual({ fare: 400, id: "woof", name: "cheapoair" });
  });

  it("addOrUpdateSource works - add new", () => {
    const itin = ItineraryFactory.build({}, { transient: itineraryInput });
    itin.addOrUpdateSource(new TripSource({ fare: 273, name: "addfake" }));
    expect(JSON.parse(JSON.stringify(itin.getTopSource()))).toEqual({ fare: 273, name: "addfake", id: null });
    expect(JSON.parse(JSON.stringify(itin)).sources.length).toEqual(3);
  });

  it("addOrUpdateSource works - update", () => {
    const itin = ItineraryFactory.build({}, { transient: itineraryInput });
    itin.addOrUpdateSource(new TripSource({ fare: 273, name: "expedia" }));
    expect(JSON.parse(JSON.stringify(itin.getTopSource()))).toEqual({ fare: 273, name: "expedia", id: null });
    expect(JSON.parse(JSON.stringify(itin)).sources.length).toEqual(2);
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
      return new DisplayableTrip({ cabin, lowestFare, trip });
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
