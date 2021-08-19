import { MissingElementLookupError } from "../../shared/errors";
import { waitForAppearance } from "../../shared/utilities/waitFor";
import { scrollToFlightCard } from "./scrollToFlightCard";

const FLIGHT_CARD_SELECTOR = "div[class='trip']";

export const findFlightCard = async (flightId: string) => {
  window.scrollTo(0, 0);
  let foundFlight = null;
  let endOfSearch = false;
  const flightSelector = `[id^='${flightId}|']`;
  const searchFlightSelector = `${FLIGHT_CARD_SELECTOR}:not([data-searched-${flightId}='true'])`;
  while (!foundFlight && !endOfSearch) {
    foundFlight = document.querySelector(flightSelector) as HTMLElement;
    if (!foundFlight) {
      const flightCards = Array.from(document.querySelectorAll(searchFlightSelector) as NodeListOf<HTMLElement>);
      flightCards.forEach((flightCard) => {
        flightCard.dataset[`searched_${flightId}`] = "true";
      });
      endOfSearch = await scrollToBottomCard(flightCards.slice(-1)[0], searchFlightSelector);
    }
  }
  if (!foundFlight) {
    throw new MissingElementLookupError(`Unable to find a flight card with id ${flightId}`);
  }
  return foundFlight;
};

const scrollToBottomCard = async (flightCard: HTMLElement, unsearchedSelector: string): Promise<boolean> => {
  let hasMoreFlights = true;
  scrollToFlightCard(flightCard);
  try {
    await waitForAppearance(5000, unsearchedSelector);
  } catch {
    hasMoreFlights = false;
  }
  return hasMoreFlights;
};
