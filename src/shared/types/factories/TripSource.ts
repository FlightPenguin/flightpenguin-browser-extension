import { faker } from "@faker-js/faker";
import { Factory } from "fishery";

import { BookingSiteMap } from "../../nameMaps/bookingSiteMap";
import { TripSource, TripSourceInput } from "../TripSource";
import { getParsedNumber } from "../utilities/getParsedNumber";

const sourceNames = ["momondo", "trip", "kiwi", "southwest", "expedia", "cheapoair"];

export const TripSourceInputFactory = Factory.define<TripSourceInput>(({ params }) => {
  const { name = faker.random.arrayElement(sourceNames), id, isFirstParty = false } = params;
  const fare = params.fare ? getParsedNumber(params.fare) : faker.datatype.number({ min: 49, max: 2000 });

  const rawDisplayNames = !!params.displayNames && params.displayNames.length > 0 ? params.displayNames : [name];
  const map = new BookingSiteMap();
  const displayNames = rawDisplayNames.map((name) => {
    const overrideName = map.getMatch(name);
    return overrideName?.name || name;
  });

  return { displayNames, fare, id, isFirstParty, name } as TripSourceInput;
});

export const TripSourceFactory = Factory.define<TripSource, TripSourceInput>(({ transientParams }) => {
  const input = TripSourceInputFactory.build(transientParams);

  return new TripSource(input);
});
