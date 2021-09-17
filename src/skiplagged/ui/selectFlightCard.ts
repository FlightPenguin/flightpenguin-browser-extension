import { pause } from "../../shared/pause";
import { waitForAppearance, waitForDisappearance } from "../../shared/utilities/waitFor";
import { findFlightCard } from "./findFlightCard";

const FLIGHT_CARD_SELECTOR = "div.selected-trip";
const LOADING_SPINNER_SELECTOR = "div.spinner-title";
const NO_FLIGHTS_SELECTOR = ".trip-list-empty button[type='submit']";

export const selectFlightCard = async (skiplaggedId: string): Promise<void> => {
  const flightCard = (await findFlightCard(skiplaggedId)) as HTMLElement;
  await pause(500);
  const button = flightCard.querySelector("button") as HTMLButtonElement;
  button.click();
  await waitForAppearance(45000, FLIGHT_CARD_SELECTOR);
  await waitForDisappearance(45000, LOADING_SPINNER_SELECTOR);
  await waitForDisappearance(10000, NO_FLIGHTS_SELECTOR);
};
