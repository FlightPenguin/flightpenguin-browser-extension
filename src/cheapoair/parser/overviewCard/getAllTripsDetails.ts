import { FlightSearchFormData } from "../../../shared/types/FlightSearchFormData";
import { CheapoairTripDetails } from "./CheapoairTripDetails";
import { getTripDetails } from "./getTripDetails";
import { getTripDetailsContainers } from "./getTripDetailsContainers";

export const getAllTripsDetails = (
  flightCard: HTMLElement,
  formData: FlightSearchFormData,
): { departureDetails: CheapoairTripDetails; returnDetails: CheapoairTripDetails | null } => {
  const tripContainers = getTripDetailsContainers(flightCard, formData.roundtrip);
  const departureDetails = getTripDetails(tripContainers.departureContainer);
  const returnDetails = tripContainers.returnContainer ? getTripDetails(tripContainers.returnContainer) : null;

  return { departureDetails, returnDetails };
};
