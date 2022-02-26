import { FlightSearchFormData } from "../../../shared/types/FlightSearchFormData";
import { CheapoairFlightDetails } from "./CheapoairFlightDetails";
import { getFlightDetails } from "./getFlightDetails";
import { getFlightDetailsContainers } from "./getFlightDetailsContainers";

export const getAllFlightsDetails = (
  flightCard: HTMLElement,
  formData: FlightSearchFormData,
): { departureDetails: CheapoairFlightDetails; returnDetails: CheapoairFlightDetails | null } => {
  const flightContainers = getFlightDetailsContainers(flightCard, formData.roundtrip);
  const departureDetails = getFlightDetails(flightContainers.departureContainer);
  const returnDetails = flightContainers.returnContainer ? getFlightDetails(flightContainers.returnContainer) : null;

  return { departureDetails, returnDetails };
};
