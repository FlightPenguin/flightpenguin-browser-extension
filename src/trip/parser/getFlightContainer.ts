import { waitForAppearance } from "../../shared/utilities/waitFor";

const FLIGHT_CARDS_CONTAINER_SELECTOR = "div.m-result-list";

export const getFlightContainer = async (): Promise<HTMLDivElement> => {
  return (await waitForAppearance(60000, FLIGHT_CARDS_CONTAINER_SELECTOR)) as HTMLDivElement;
};
