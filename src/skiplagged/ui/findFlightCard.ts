import { MissingElementLookupError } from "../../shared/errors";
import { waitForAppearance } from "../../shared/utilities/waitFor";
import { scrollToFlightCard } from "./scrollToFlightCard";

const FLIGHT_CARD_SELECTOR = "div[class='trip']";

export const findFlightCard = async (flightId: string) => {
  window.scroll(0, 0);
  let foundFlight = null;
  let endOfSearch = false;
  const flightSelector = `[id^='${flightId}|']`;
  while (!foundFlight && !endOfSearch) {
    foundFlight = document.querySelector(flightSelector) as HTMLElement;
    endOfSearch = await scrollToBottom(flightId);
  }
  if (!foundFlight) {
    throw new MissingElementLookupError(`Unable to find a flight card with id ${flightId}`);
  }
  return foundFlight;
};

const scrollToBottom = async (flightId: string) => {
  let hasMoreFlights = true;
  const selector = `${FLIGHT_CARD_SELECTOR}:not([data-searched-${flightId}='true'])`;
  const visibleFlightCards = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
  scrollToFlightCard(Array.from(visibleFlightCards).slice(-1)[0]);
  try {
    await waitForAppearance(3000, selector);
  } catch {
    hasMoreFlights = false;
  }
  return hasMoreFlights;
};
