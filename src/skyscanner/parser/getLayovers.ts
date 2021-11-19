import { waitForAppearance } from "../../shared/utilities/waitFor";
import { handleCaptcha } from "../ui/handleCaptcha";
import { createLayoversIframe, deleteLayoversIframe } from "../ui/manageLayoversIframe";
import { getFlightLayovers } from "./getFlightLayovers";

const LEG_CONTAINER_SELECTOR = "[class*='Itinerary_leg']";

export const getLayovers = async (flightCard: HTMLElement) => {
  const iframeDoc = await openFlightDetails(flightCard);
  await waitForAppearance(30000, LEG_CONTAINER_SELECTOR, iframeDoc);
  const [departureLegContainer, returnLegContainer] = iframeDoc.querySelectorAll(
    LEG_CONTAINER_SELECTOR,
  ) as NodeListOf<HTMLElement>;

  const departureLayovers = getFlightLayovers(departureLegContainer);
  const returnLayovers = returnLegContainer ? getFlightLayovers(returnLegContainer) : [];

  await closeFlightDetails(flightCard);

  return { departureLayovers, returnLayovers };
};

export const openFlightDetails = async (flightCard: HTMLElement) => {
  return await createLayoversIframe(flightCard);
};

export const closeFlightDetails = async (flightCard: HTMLElement) => {
  await deleteLayoversIframe(flightCard);
};
