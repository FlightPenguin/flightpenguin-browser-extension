import { FlightLeg } from "../../shared/types/FlightLeg";
import { waitForAppearance } from "../../shared/utilities/waitFor";
import { closeModal } from "../ui/closeModal";
import { getLayoversDetailModal } from "../ui/getLayoversDetailModal";
import { getFlightLayovers } from "./getFlightLayovers";

const FLIGHT_CONTAINER_SELECTOR = "[data-test='TripPopupWrapper']";

interface GetAllLayoversProps {
  flightCard: HTMLDivElement;
  roundtrip: boolean;
}

export const getAllLayovers = async ({
  flightCard,
  roundtrip,
}: GetAllLayoversProps): Promise<{ departureLayovers: FlightLeg[]; returnLayovers: FlightLeg[] }> => {
  const modal = await getLayoversDetailModal(flightCard);

  await waitForAppearance(60000, FLIGHT_CONTAINER_SELECTOR);
  const departureLayovers = getFlightLayovers(modal, "DEPARTURE");
  const returnLayovers = roundtrip ? getFlightLayovers(modal, "RETURN") : [];

  await closeModal(modal);

  return { departureLayovers, returnLayovers };
};
