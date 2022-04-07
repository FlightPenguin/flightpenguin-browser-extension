import { faker } from "@faker-js/faker";
import { Factory } from "fishery";

import { Airline, AirlineInput } from "../Airline";

export const AirlineInputFactory = Factory.define<AirlineInput>(({ params }) => {
  const { name = `${faker.company.companyName()} Air` } = params;

  return { name } as AirlineInput;
});

export const AirlineFactory = Factory.define<Airline, AirlineInput>(({ transientParams }) => {
  const input = AirlineInputFactory.build(transientParams);

  return new Airline(input);
});
