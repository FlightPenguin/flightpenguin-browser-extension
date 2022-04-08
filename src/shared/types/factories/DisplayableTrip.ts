import { faker } from "@faker-js/faker";
import { DeepPartial, Factory } from "fishery";

import { DisplayableTrip, DisplayableTripInput } from "../DisplayableTrip";
import { TripInput } from "../Trip";
import { getParsedNumber } from "../utilities/getParsedNumber";
import { TripInputFactory } from "./Trip";

export const DisplayableTripInputFactory = Factory.define<DisplayableTripInput>(({ params }) => {
  const {
    cabin = faker.random.arrayElement(["econ", "prem_econ", "business", "first"]),
    lowestFare = faker.datatype.number({ min: 49, max: 2000 }),
  } = params;
  const tripInput = TripInputFactory.build(params.trip as DeepPartial<TripInput>);

  return { cabin, lowestFare: getParsedNumber(lowestFare), trip: tripInput } as DisplayableTripInput;
});

export const DisplayableTripFactory = Factory.define<DisplayableTrip, DisplayableTripInput>(({ transientParams }) => {
  const input = DisplayableTripInputFactory.build(transientParams);

  return new DisplayableTrip(input);
});
