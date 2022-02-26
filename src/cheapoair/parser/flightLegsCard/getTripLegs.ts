import { FlightLeg } from "../../../shared/types/FlightLeg";
import { getFlightLegContainers } from "./getFlightLegContainers";
import { getFlightLegDetails } from "./getFlightLegDetails";

export const getTripLegs = (tripContainer: HTMLElement): FlightLeg[] => {
  const flightLegs = [] as FlightLeg[];
  let elapsedTimezoneOffset = 0;

  const flightLegContainers = getFlightLegContainers(tripContainer);
  flightLegContainers.forEach((flightLegContainer) => {
    const flightLeg = getFlightLegDetails(flightLegContainer, elapsedTimezoneOffset, flightLegContainers.length);
    elapsedTimezoneOffset += flightLeg.timezoneOffset;
    flightLegs.push(flightLeg);
  });

  return flightLegs;
};
