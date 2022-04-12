import { faker } from "@faker-js/faker";
import { Factory } from "fishery";

import { Itinerary, ItineraryInput } from "../Itinerary";
import { TripInputFactory } from "./Trip";
import { TripSourceInputFactory } from "./TripSource";

export const ItineraryInputFactory = Factory.define<ItineraryInput>(({ params }) => {
  const { cabin = faker.random.arrayElement(["econ", "prem_econ", "business", "first"]) } = params;

  let sources = params.sources;
  if (!sources || !sources.length) {
    sources = [];
    const source = TripSourceInputFactory.build();
    sources.push(source);
  }

  let trips = params.trips;
  if (!trips || !trips.length) {
    trips = [];
    const trip = TripInputFactory.build();
    trips.push(trip);
  }

  return { cabin, sources, trips } as ItineraryInput;
});

export const ItineraryFactory = Factory.define<Itinerary, ItineraryInput>(({ transientParams }) => {
  const input = ItineraryInputFactory.build(transientParams);

  return new Itinerary(input);
});
