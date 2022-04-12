import { Factory } from "fishery";

import { Trip, TripInput } from "../Trip";
import { FlightInputFactory } from "./Flight";
import { AirportInputFactory } from "./Location";
import { TripComponentInputFactory } from "./TripComponent";
import { getInputOrCalculatedTimes } from "./utilities/getInputOrCalculatedTimes";

export const TripInputFactory = Factory.define<TripInput>(({ params }) => {
  const arrivalLocation = AirportInputFactory.build(params.arrivalLocation);
  const departureLocation = AirportInputFactory.build(params.departureLocation);

  const {
    arrivalTime: arrivalDateTime,
    departureTime: departureDateTime,
    durationMinutes,
  } = getInputOrCalculatedTimes({
    arrivalTime: params.arrivalDateTime,
    departureTime: params.departureDateTime,
    durationMinutes: params.durationMinutes,
  });

  const tripComponents = !!params.tripComponents && !!params.tripComponents.length ? params.tripComponents : [];
  if (!tripComponents.length) {
    const flight = FlightInputFactory.build({
      arrivalLocalDateTime: arrivalDateTime,
      arrivalLocation,
      departureLocalDateTime: departureDateTime,
      departureLocation,
      durationMinutes,
      elapsedTimezoneOffset: 0,
    });
    const tripComponent = TripComponentInputFactory.build({ type: "FLIGHT", object: flight });
    tripComponents.push(tripComponent);
  }

  return {
    arrivalDateTime,
    arrivalLocation,
    departureDateTime,
    departureLocation,
    durationMinutes,
    tripComponents,
  } as TripInput;
});

export const TripFactory = Factory.define<Trip, TripInput>(({ transientParams }) => {
  const input = TripInputFactory.build(transientParams);

  return new Trip(input);
});
