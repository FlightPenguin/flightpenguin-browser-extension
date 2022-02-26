import { FlightLeg } from "../../../shared/types/FlightLeg";
import { FlightSearchFormData } from "../../../shared/types/FlightSearchFormData";
import { getTripContainers } from "./getTripContainers";
import { getTripLegs } from "./getTripLegs";

export const getAllFlightLegs = (
  flightCard: HTMLElement,
  formData: FlightSearchFormData,
): { departureLegs: FlightLeg[]; returnLegs: FlightLeg[] | null } => {
  const tripContainers = getTripContainers(flightCard, formData.roundtrip);
  const departureFlightLegs = getTripLegs(tripContainers.departureContainer);
  const returnFlightLegs = tripContainers.returnContainer ? getTripLegs(tripContainers.returnContainer) : null;

  return { departureLegs: departureFlightLegs, returnLegs: returnFlightLegs };
};
