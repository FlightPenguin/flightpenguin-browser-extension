import { faker } from "@faker-js/faker";
import { addHours, addMinutes } from "date-fns";
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

  const {
    containerInfo = {
      earliestTime: addHours(tripInput.departureDateTime, -8),
      latestTime: addHours(addMinutes(tripInput.departureDateTime, Number(tripInput.durationMinutes)), 8),
    },
  } = params;

  return { cabin, containerInfo, lowestFare: getParsedNumber(lowestFare), trip: tripInput } as DisplayableTripInput;
});

export const DisplayableTripFactory = Factory.define<DisplayableTrip, DisplayableTripInput>(({ transientParams }) => {
  const input = DisplayableTripInputFactory.build(transientParams);

  return new DisplayableTrip(input);
});
