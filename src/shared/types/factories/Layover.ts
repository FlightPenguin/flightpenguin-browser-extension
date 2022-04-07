import { addMinutes } from "date-fns";
import { Factory } from "fishery";

import { Layover, LayoverInput } from "../Layover";
import { Location, LocationInput } from "../Location";
import { AirportInputFactory } from "./Location";
import { getInputOrCalculatedTimes } from "./utilities/getInputOrCalculatedTimes";

export interface LayoverFactoryInput {
  arrivalLocalDateTime: Date | string;
  arrivalLocation: Location | LocationInput;
  departureLocalDateTime: Date | string;
  departureLocation: Location | LocationInput;
  durationMinutes: number;
  elapsedTimezoneOffset: number;
}

export const LayoverInputFactory = Factory.define<LayoverInput, LayoverFactoryInput>(({ transientParams }) => {
  const arrivalLocation = AirportInputFactory.build(transientParams.arrivalLocation as LocationInput);
  const departureLocation = AirportInputFactory.build(transientParams.departureLocation as LocationInput);

  const {
    arrivalTime: arrivalLocalDateTime,
    departureTime: departureLocalDateTime,
    durationMinutes,
  } = getInputOrCalculatedTimes({
    arrivalTime: transientParams.arrivalLocalDateTime,
    departureTime: transientParams.departureLocalDateTime,
    durationMinutes: transientParams.durationMinutes,
  });

  const elapsedTimezoneOffset = transientParams.elapsedTimezoneOffset || 0;
  const arrivalTripStartDateTime = addMinutes(arrivalLocalDateTime, elapsedTimezoneOffset);
  const departureTripStartDateTime = addMinutes(departureLocalDateTime, elapsedTimezoneOffset);

  return {
    arrivalLocalDateTime,
    arrivalLocation,
    arrivalTripStartDateTime,
    departureLocalDateTime,
    departureLocation,
    departureTripStartDateTime,
    durationMinutes,
  } as LayoverInput;
});

export const LayoverFactory = Factory.define<Layover, LayoverFactoryInput>(({ transientParams }) => {
  const input = LayoverInputFactory.build({}, { transient: transientParams });

  return new Layover(input);
});
