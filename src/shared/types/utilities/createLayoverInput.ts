import { differenceInMinutes } from "date-fns";

import { Flight } from "../Flight";
import { LayoverInput } from "../Layover";

export const createLayoverInput = (previousFlight: Flight, nextFlight: Flight): LayoverInput => {
  return {
    arrivalLocalDateTime: previousFlight.getArrivalLocalDateTime(),
    arrivalLocation: previousFlight.getArrivalLocation(),
    arrivalTripStartDateTime: previousFlight.getArrivalTripStartDateTime(),
    departureLocalDateTime: nextFlight.getDepartureLocalDateTime(),
    departureLocation: nextFlight.getDepartureLocation(),
    departureTripStartDateTime: nextFlight.getDepartureTripStartDateTime(),
    durationMinutes: getLayoverDuration(previousFlight, nextFlight),
  } as LayoverInput;
};

const getLayoverDuration = (previousFlight: Flight, nextFlight: Flight) => {
  return differenceInMinutes(nextFlight.getDepartureTripStartDateTime(), previousFlight.getArrivalTripStartDateTime());
};
