import { createLayoversIframe, deleteLayoversIframe } from "../ui/manageLayoversIframe";
import { getFlightLayovers } from "./getFlightLayovers";

const LEG_CONTAINER_SELECTOR = "[class*='Itinerary_leg']";

export const getLayovers = async (flightCard: HTMLElement) => {
  const iframeDoc = await openFlightDetails(flightCard);
  const [departureLegContainer, returnLegContainer] = iframeDoc.querySelectorAll(
    LEG_CONTAINER_SELECTOR,
  ) as NodeListOf<HTMLElement>;

  const departureLayovers = getFlightLayovers(departureLegContainer);
  const returnLayovers = getFlightLayovers(returnLegContainer);

  await closeFlightDetails(flightCard);

  return { departureLayovers, returnLayovers };
};

export const openFlightDetails = async (flightCard: HTMLElement) => {
  return await createLayoversIframe(flightCard);
};

export const closeFlightDetails = async (flightCard: HTMLElement) => {
  await deleteLayoversIframe(flightCard);
};
