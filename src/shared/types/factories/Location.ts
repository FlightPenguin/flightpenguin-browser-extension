import { faker } from "@faker-js/faker";
import { Factory } from "fishery";

import { Location, LocationInput } from "../Location";

export const AirportFactory = Factory.define<Location, LocationInput>(({ transientParams }) => {
  const {
    name = `${faker.address.city()} International Airport`,
    code = faker.random.alpha({ count: 3, upcase: true }),
  } = transientParams;

  return new Location({
    code,
    name,
    type: "AIRPORT",
  });
});

export const CityFactory = Factory.define<Location, LocationInput>(({ transientParams }) => {
  const {
    name = `${faker.address.city()} International Airport`,
    code = faker.random.alpha({ count: 3, upcase: true }),
  } = transientParams;

  return new Location({
    code,
    name,
    type: "CITY",
  });
});
