import { MissingElementLookupError } from "../../../../../shared/errors";
import { LocationInput } from "../../../../../shared/types/newtypes/Location";
import { getAirport } from "./getAirport";
import { getFlightTime } from "./getFlightTime";

const DEPARTURE_SELECTOR = "div[class*='departure-row']";

export const getDepartureInfo = (
  flightContainer: HTMLDivElement,
  flightDate: Date,
): { departureTime: Date; departureAirport: LocationInput } => {
  const departureContainer = flightContainer.querySelector(DEPARTURE_SELECTOR) as HTMLDivElement;
  if (!departureContainer) {
    throw new MissingElementLookupError("Unable to find departure container");
  }

  const departureTime = getFlightTime(departureContainer, flightDate);
  const departureAirport = getAirport(departureContainer);
  return { departureTime, departureAirport };
};
