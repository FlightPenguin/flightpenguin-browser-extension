import { faker } from "@faker-js/faker";
import { Factory } from "fishery";

import { Airline, AirlineInput } from "../Airline";
import { AirportDetails } from "../AirportDetails";

export const AirportDetailsFactory = Factory.define<AirportDetails>(({ params }) => {
  const { city = faker.address.city() } = params;

  const {
    name = `${city} International Airport`,
    code = faker.random.alpha({ count: 3, upcase: true }),
    stateProvince = faker.address.stateAbbr(),
    country = faker.address.country(),
  } = params;

  return { name, code, city, stateProvince, country } as AirportDetails;
});
