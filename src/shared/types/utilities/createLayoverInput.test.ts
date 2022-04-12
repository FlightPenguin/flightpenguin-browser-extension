import { AirlineInput } from "../Airline";
import { FlightFactory } from "../factories/Flight";
import { LocationInput } from "../Location";
import { createLayoverInput } from "./createLayoverInput";
import { getParsedISODate } from "./getParsedISODate";

describe("createLayoverInput happy path", () => {
  it("works", () => {
    const flight1 = FlightFactory.build(
      {},
      {
        transient: {
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
      },
    );
    const flight2 = FlightFactory.build(
      {},
      {
        transient: {
          arrivalLocalDateTime: getParsedISODate("2022-04-07T05:58:00.000Z"),
          arrivalLocation: { name: "Denver International Airport", code: "DEN", type: "AIRPORT" } as LocationInput,
          departureLocalDateTime: getParsedISODate("2022-04-07T04:45:00.000Z"),
          departureLocation: { name: "Miami International Airport", code: "MIA", type: "AIRPORT" } as LocationInput,
          durationMinutes: 193,
          elapsedTimezoneOffset: 0,
          marketingAirline: { name: "Frontier" } as AirlineInput,
        },
      },
    );

    const input = createLayoverInput(flight1, flight2);
    expect(JSON.parse(JSON.stringify(input))).toEqual({
      arrivalLocalDateTime: "2022-04-07T04:15:00.000Z",
      arrivalLocation: {
        code: "MIA",
        geopoint: undefined,
        name: "Miami International Airport",
        timezone: undefined,
        timezoneOffsetFromGMT: undefined,
        type: "AIRPORT",
      },
      arrivalTripStartDateTime: "2022-04-07T04:15:00.000Z",
      departureLocalDateTime: "2022-04-07T04:45:00.000Z",
      departureLocation: {
        code: "MIA",
        geopoint: undefined,
        name: "Miami International Airport",
        timezone: undefined,
        timezoneOffsetFromGMT: undefined,
        type: "AIRPORT",
      },
      departureTripStartDateTime: "2022-04-07T04:45:00.000Z",
      durationMinutes: 30,
    });
  });
});
