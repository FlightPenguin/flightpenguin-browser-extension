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
const FLIGHT_CARDS_CONTAINER_SELECTOR = ".trip-list";
const RETURN_HEADER_SELECTOR = ".trip-return-header";

export const getFlights = async (selectedFlight = null): Promise<{ [key: string]: string }> => {
  /*
  skiplagged maintains an infinite scroll trip list.
  It does not contain all elements at run, despite them being pulled from a GQL endpoint.
  In fact, many updates occur as the best price is retrieved from different providers.
  It does delete the top as you scroll down, so care is needed to not duplicate.
   */

  await waitForAppearance(3000, CONTAINER_SHELL_SELECTOR);
  await waitForAppearance(10_000, SORT_BUTTON_SELECTOR);
  if (selectedFlight) {
    await waitForAppearance(3000, RETURN_HEADER_SELECTOR);
  }
  await waitForAppearance(10_000, FLIGHT_CARD_SELECTOR);
  // prices change as providers stream in.  wait for final price at the moment.
  await waitForDisappearance(45000, PROGRESS_SELECTOR);

  disableHiddenCitySearches();

  if (isNoResults()) {
    sendNoFlightsEvent("skiplagged");
  }

  const flightContainer = getFlightContainer(selectedFlight ? "RETURN" : "DEPARTURE");
  const visitedFlightCardMap: { [key: string]: string } = {};
  let hasMoreFlights = true;
  while (hasMoreFlights) {
    const flightCards = flightContainer.querySelectorAll(FLIGHT_CARD_SELECTOR) as NodeListOf<HTMLElement>;
    const newlyVisitedCardsMap = await getUnsentFlights(
      Array.from(flightCards),
      Object.values(visitedFlightCardMap),
      selectedFlight,
    );
    Object.entries(newlyVisitedCardsMap).forEach(([key, value]) => {
      visitedFlightCardMap[key] = value;
    });
    scrollToFlightCard(Array.from(flightCards).slice(-1)[0]);
    try {
      await waitForAppearance(3000, FLIGHT_CARD_SELECTOR);
    } catch {
      hasMoreFlights = false;
    }
  }

  return visitedFlightCardMap;
};

const isNoResults = () => {
  const noResultsDiv = document.querySelector(NO_RESULTS_SELECTOR) as HTMLDivElement;
  if (!noResultsDiv) {
    throw new MissingElementLookupError("Unable to find the no results container");
  }

  return isVisible(noResultsDiv);
};

const getFlightContainer = (type: "DEPARTURE" | "RETURN") => {
  const [departureContainer, returnContainer] = document.querySelectorAll(FLIGHT_CARDS_CONTAINER_SELECTOR);
  const container = type === "DEPARTURE" ? departureContainer : returnContainer;
  if (!container) {
    throw new MissingElementLookupError(`Unable to locate ${type.toLowerCase()} container`);
  }
  return container;
};
