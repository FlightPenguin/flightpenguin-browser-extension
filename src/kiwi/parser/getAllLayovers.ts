import { FlightLeg } from "../../shared/types/FlightLeg";
import { waitForAppearance } from "../../shared/utilities/waitFor";
import { closeModal } from "../ui/closeModal";
import { getLayoversDetailModal } from "../ui/getLayoversDetailModal";
import { getFlightLayovers } from "./getFlightLayovers";

const FLIGHT_CONTAINER_SELECTOR = "[data-test='TripPopupWrapper']";

export const getAllLayovers = async (
  flightCard: HTMLDivElement,
): Promise<{ departureLayovers: FlightLeg[]; returnLayovers: FlightLeg[] }> => {
  const modal = await getLayoversDetailModal(flightCard);

  await waitForAppearance(30000, FLIGHT_CONTAINER_SELECTOR);
  const departureLayovers = getFlightLayovers(modal, "DEPARTURE");
  const returnLayovers = getFlightLayovers(modal, "RETURN");

  await closeModal(modal);

  return { departureLayovers, returnLayovers };
};
