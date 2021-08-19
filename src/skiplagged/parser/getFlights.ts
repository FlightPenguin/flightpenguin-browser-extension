import { MissingElementLookupError } from "../../shared/errors";
import { sendNoFlightsEvent } from "../../shared/events";
import { isVisible } from "../../shared/utilities/isVisible";
import { waitForAppearance, waitForDisappearance } from "../../shared/utilities/waitFor";
import { disableHiddenCitySearches } from "../ui/disableHiddenCitySearches";
import { scrollToFlightCard } from "../ui/scrollToFlightCard";
import { getUnsentFlights } from "./getUnsentFlights";

const CONTAINER_SHELL_SELECTOR = "section #trip-list-wrapper";
const SORT_BUTTON_SELECTOR = "[data-sort='cost']";
const NO_RESULTS_SELECTOR = ".trip-list-empty";
const FLIGHT_CARD_SELECTOR = "div[class='trip']:not([data-visited='true'])";
const PROGRESS_SELECTOR = ".ui-mprogress";

export const getFlights = async (selectedFlight = null): Promise<void> => {
  /*
  skiplagged maintains an infinite scroll trip list.
  It does not contain all elements at run, despite them being pulled from a GQL endpoint.
  It does delete the top as you scroll down, so care is needed to not duplicate.
   */

  await waitForAppearance(3000, CONTAINER_SHELL_SELECTOR);
  await waitForAppearance(10_000, SORT_BUTTON_SELECTOR);
  await waitForAppearance(10_000, FLIGHT_CARD_SELECTOR);
  // prices change as providers stream in.  wait for final price at the moment.
  await waitForDisappearance(45000, PROGRESS_SELECTOR);

  disableHiddenCitySearches();

  if (isNoResults()) {
    sendNoFlightsEvent("skiplagged");
  }

  const visitedFlightCardIds: string[] = [];
  let hasMoreFlights = true;
  while (hasMoreFlights) {
    const flightCards = document.querySelectorAll(FLIGHT_CARD_SELECTOR) as NodeListOf<HTMLElement>;
    const newlyVisitedIds = await getUnsentFlights(Array.from(flightCards), visitedFlightCardIds, selectedFlight);
    visitedFlightCardIds.push(...newlyVisitedIds);
    scrollToFlightCard(Array.from(flightCards).slice(-1)[0]);
    try {
      await waitForAppearance(3000, FLIGHT_CARD_SELECTOR);
    } catch {
      hasMoreFlights = false;
    }
  }
};

const isNoResults = () => {
  const noResultsDiv = document.querySelector(NO_RESULTS_SELECTOR) as HTMLDivElement;
  if (!noResultsDiv) {
    throw new MissingElementLookupError("Unable to find the no results container");
  }

  return isVisible(noResultsDiv);
};
