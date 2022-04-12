import { Factory } from "fishery";

import { Flight, FlightInput } from "../Flight";
import { AirlineInputFactory } from "./Airline";
import { AirportInputFactory } from "./Location";
import { getInputOrCalculatedTimes } from "./utilities/getInputOrCalculatedTimes";

export const FlightInputFactory = Factory.define<FlightInput>(({ params }) => {
  const arrivalLocation = AirportInputFactory.build(params.arrivalLocation);
  const departureLocation = AirportInputFactory.build(params.departureLocation);
  const elapsedTimezoneOffset = params.elapsedTimezoneOffset || 0;
  const marketingAirline = AirlineInputFactory.build(params.marketingAirline);
  const operatingAirline = params.operatingAirline ? AirlineInputFactory.build(params.operatingAirline) : undefined;

  const {
    arrivalTime: arrivalLocalDateTime,
    departureTime: departureLocalDateTime,
    durationMinutes,
  } = getInputOrCalculatedTimes({
    arrivalTime: params.arrivalLocalDateTime,
    departureTime: params.departureLocalDateTime,
    durationMinutes: params.durationMinutes,
  });

  return {
    arrivalLocalDateTime,
    arrivalLocation,
    departureLocalDateTime,
    departureLocation,
    durationMinutes,
    elapsedTimezoneOffset,
    marketingAirline,
    operatingAirline,
  } as FlightInput;
});

export const FlightFactory = Factory.define<Flight, FlightInput>(({ transientParams }) => {
  const input = FlightInputFactory.build(transientParams);

  return new Flight(input);
});
