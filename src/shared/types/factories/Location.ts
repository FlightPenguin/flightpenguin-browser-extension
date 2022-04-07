import { faker } from "@faker-js/faker";
import { Factory } from "fishery";

import { Location, LocationInput } from "../Location";

export const AirportInputFactory = Factory.define<LocationInput>(({ params }) => {
  const {
    name = `${faker.address.city()} International Airport`,
    code = faker.random.alpha({ count: 3, upcase: true }),
  } = params;

  return {
    code,
    name,
    type: "AIRPORT",
  } as LocationInput;
});

export const AirportFactory = Factory.define<Location, LocationInput>(({ transientParams }) => {
  const input = AirportInputFactory.build(transientParams);

  return new Location(input);
});

export const CityInputFactory = Factory.define<LocationInput>(({ params }) => {
  const { name = faker.address.city(), code = faker.random.alpha({ count: 3, upcase: true }) } = params;

  return {
    code,
    name,
    type: "CITY",
  } as LocationInput;
});

export const CityFactory = Factory.define<Location, LocationInput>(({ transientParams }) => {
  const input = CityInputFactory.build(transientParams);

  return new Location(input);
});
