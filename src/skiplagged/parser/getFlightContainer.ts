import { MissingElementLookupError, ParserError } from "../../shared/errors";
import { sendNoFlightsEvent } from "../../shared/events";
import { pause } from "../../shared/pause";
import { isVisible } from "../../shared/utilities/isVisible";
import { waitForAppearance, waitForDisappearance } from "../../shared/utilities/waitFor";
import { disableHiddenCitySearches } from "../ui/disableHiddenCitySearches";

const CONTAINER_SHELL_SELECTOR = "section #trip-list-wrapper";
const SORT_BUTTON_SELECTOR = "[data-sort='cost']";
const NO_RESULTS_SELECTOR = ".trip-list-empty";
const FLIGHT_CARD_SELECTOR = "div[class='trip']";
const LOADING_SELECTOR = "div.spinner-title";

const FLIGHT_CARDS_CONTAINER_SELECTOR = ".trip-list";
const INFINITE_SCROLL_CONTAINER_SELECTOR = ".infinite-trip-list";
const RETURN_HEADER_SELECTOR = ".trip-return-header";

export const getFlightContainer = async (selectedFlight: boolean): Promise<HTMLElement> => {
  /*
skiplagged maintains an infinite scroll trip list.
It does not contain all elements at run, despite them being pulled from a GQL endpoint.
In fact, many updates occur as the best price is retrieved from different providers.
It does delete the top as you scroll down, so care is needed to not duplicate.
 */
  await waitForLoad(selectedFlight);
  const flightType = selectedFlight ? "RETURN" : "DEPARTURE";
  const [departureContainer, returnContainer] = document.querySelectorAll(
    FLIGHT_CARDS_CONTAINER_SELECTOR,
  ) as NodeListOf<HTMLElement>;
  const container = flightType === "DEPARTURE" ? departureContainer : returnContainer;
  if (!container) {
    throw new MissingElementLookupError(`Unable to locate ${flightType.toLowerCase()} container`);
  }

  if (!isVisible(container)) {
    debugger;
    throw new ParserError("Flight container is not visible");
  }

  const tripListElement = container.querySelector(INFINITE_SCROLL_CONTAINER_SELECTOR);
  if (!tripListElement) {
    throw new MissingElementLookupError(`Unable to locate infinite scroll container for ${flightType.toLowerCase()}`);
  }

  const tripListContainer = tripListElement.children[0];
  if (!tripListContainer) {
    throw new MissingElementLookupError(
      `Unable to locate infinite scroll container child for ${flightType.toLowerCase()}`,
    );
  }
  return tripListContainer as HTMLElement;
};

const isNoResults = (returnFlight: boolean) => {
  const noResultsDiv = document.querySelector(NO_RESULTS_SELECTOR) as HTMLDivElement;
  if (!noResultsDiv) {
    if (returnFlight) {
      return false;
    }
    throw new MissingElementLookupError("Unable to find the no results container");
  }

  return isVisible(noResultsDiv);
};

const waitForLoad = async (selectedFlight: boolean) => {
  await waitForAppearance(3000, CONTAINER_SHELL_SELECTOR);
  await waitForAppearance(3000, FLIGHT_CARDS_CONTAINER_SELECTOR);
  await waitForAppearance(10000, SORT_BUTTON_SELECTOR);
  if (selectedFlight) {
    await waitForAppearance(3000, RETURN_HEADER_SELECTOR);
    await pause(500);
  }
  await waitForDisappearance(15000, LOADING_SELECTOR);
  await waitForAppearance(15000, FLIGHT_CARD_SELECTOR);

  if (!selectedFlight) {
    // Do this once...
    disableHiddenCitySearches();
  }

  if (isNoResults(selectedFlight)) {
    sendNoFlightsEvent("skiplagged");
  }
};
