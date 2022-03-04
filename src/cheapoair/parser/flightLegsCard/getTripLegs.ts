import { FlightLeg } from "../../../shared/types/FlightLeg";
import { getFlightLegContainers } from "./getFlightLegContainers";
import { getFlightLegDetails } from "./getFlightLegDetails";

export const getTripLegs = (tripContainer: HTMLElement, departureDate: Date): FlightLeg[] => {
  const flightLegs = [] as FlightLeg[];
  let elapsedTimezoneOffset = 0;

  const flightLegContainers = getFlightLegContainers(tripContainer);
  let previousLegDepartureDate = departureDate;
  flightLegContainers.forEach((flightLegContainer) => {
    const { flightLeg, legDepartureDate } = getFlightLegDetails(
      flightLegContainer,
      elapsedTimezoneOffset,
      flightLegContainers.length,
      previousLegDepartureDate,
    );
    elapsedTimezoneOffset += flightLeg.timezoneOffset;
    previousLegDepartureDate = legDepartureDate;
    flightLegs.push(flightLeg);
  });

  return flightLegs;
};
