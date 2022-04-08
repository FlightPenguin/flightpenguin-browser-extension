import { faker } from "@faker-js/faker";
import { Factory } from "fishery";

import { TripSource, TripSourceInput } from "../TripSource";
import { getParsedNumber } from "../utilities/getParsedNumber";

const sourceNames = ["momondo", "trip", "kiwi", "southwest", "expedia", "cheapoair"];

export const TripSourceInputFactory = Factory.define<TripSourceInput>(({ params }) => {
  const { name = faker.random.arrayElement(sourceNames), id } = params;
  const fare = params.fare ? getParsedNumber(params.fare) : faker.datatype.number({ min: 49, max: 2000 });

  return { name, id, fare } as TripSourceInput;
});

export const TripSourceFactory = Factory.define<TripSource, TripSourceInput>(({ transientParams }) => {
  const input = TripSourceInputFactory.build(transientParams);

  return new TripSource(input);
});
