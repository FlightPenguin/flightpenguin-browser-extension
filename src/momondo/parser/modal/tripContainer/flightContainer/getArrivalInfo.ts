import { MissingElementLookupError } from "../../../../../shared/errors";
import { LocationInput } from "../../../../../shared/types/newtypes/Location";
import { getAirport } from "./getAirport";
import { getFlightTime } from "./getFlightTime";

const ARRIVAL_SELECTOR = "div[class*='arrival-row']";

export const getArrivalInfo = (
  flightContainer: HTMLDivElement,
  flightDate: Date,
): { arrivalTime: Date; arrivalAirport: LocationInput } => {
  const arrivalContainer = flightContainer.querySelector(ARRIVAL_SELECTOR) as HTMLDivElement;
  if (!arrivalContainer) {
    throw new MissingElementLookupError("Unable to find arrival container");
  }

  const arrivalTime = getFlightTime(arrivalContainer, flightDate);
  const arrivalAirport = getAirport(arrivalContainer);
  return { arrivalTime, arrivalAirport };
};
