import { MissingElementLookupError } from "../../shared/errors";
import { sendNoFlightsEvent } from "../../shared/events";
import { pause } from "../../shared/pause";
import { isVisible } from "../../shared/utilities/isVisible";
import { waitForAppearance, waitForDisappearance } from "../../shared/utilities/waitFor";
import { disableHiddenCitySearches } from "../ui/disableHiddenCitySearches";
import { scrollToFlightCard } from "../ui/scrollToFlightCard";
import { FlightMap } from "./constants";
import { sendFlights } from "./sendFlights";

const CONTAINER_SHELL_SELECTOR = "section #trip-list-wrapper";
const SORT_BUTTON_SELECTOR = "[data-sort='cost']";
const NO_RESULTS_SELECTOR = ".trip-list-empty";
const FLIGHT_CARD_SELECTOR = "div[class='trip']";
const PROGRESS_SELECTOR = ".ui-mprogress";
const FLIGHT_CARDS_CONTAINER_SELECTOR = ".trip-list";
const INFINITE_SCROLL_CONTAINER_SELECTOR = ".infinite-trip-list";
const RETURN_HEADER_SELECTOR = ".trip-return-header";

export const getFlights = async (selectedFlight = null): Promise<FlightMap> => {
  /*
  skiplagged maintains an infinite scroll trip list.
  It does not contain all elements at run, despite them being pulled from a GQL endpoint.
  In fact, many updates occur as the best price is retrieved from different providers.
  It does delete the top as you scroll down, so care is needed to not duplicate.
   */

  await waitForAppearance(3000, CONTAINER_SHELL_SELECTOR);
  await waitForAppearance(3000, FLIGHT_CARDS_CONTAINER_SELECTOR);
  await waitForAppearance(10000, SORT_BUTTON_SELECTOR);
  if (selectedFlight) {
    await waitForAppearance(3000, RETURN_HEADER_SELECTOR);
  }
  await waitForAppearance(15000, FLIGHT_CARD_SELECTOR);

  disableHiddenCitySearches();

  if (isNoResults()) {
    sendNoFlightsEvent("skiplagged");
  }

  const flightContainer = getFlightContainer(selectedFlight ? "RETURN" : "DEPARTURE");
  const visitedFlights = {} as FlightMap;

  const mutationObserver = new MutationObserver(function (mutations) {
    mutations.forEach(async function (mutation) {
      if (mutation.addedNodes) {
        const sentFlightMaps = await sendFlights(
          Array.from(mutation.addedNodes),
          Object.values(visitedFlights),
          selectedFlight,
        );
        for (const [fpId, skipId] of Object.entries(sentFlightMaps)) {
          visitedFlights[fpId] = skipId;
        }
      }
    });
  });

  mutationObserver.observe(flightContainer, {
    childList: true,
  });

  await waitForDisappearance(45000, PROGRESS_SELECTOR);

  let unChangedCounter = 0;
  let totalFlights = Object.keys(visitedFlights).length;
  while (unChangedCounter <= 3) {
    await progressiveScrolling(flightContainer);
    const newFlightTotal = Object.keys(visitedFlights).length;
    if (newFlightTotal > totalFlights) {
      unChangedCounter = 0;
      totalFlights = newFlightTotal;
    } else {
      unChangedCounter += 1;
    }
  }

  mutationObserver.disconnect();

  return visitedFlights;
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

  const tripListElement = document.querySelector(INFINITE_SCROLL_CONTAINER_SELECTOR);
  if (!tripListElement) {
    throw new MissingElementLookupError(`Unable to locate infinite scroll container for ${type.toLowerCase()}`);
  }

  const tripListContainer = tripListElement.children[0];
  if (!tripListContainer) {
    throw new MissingElementLookupError(`Unable to locate infinite scroll container child for ${type.toLowerCase()}`);
  }
  return tripListContainer as HTMLElement;
};

const progressiveScrolling = async (flightContainer: HTMLElement) => {
  window.scrollTo(0, 0);

  let lastFlightCard = null;
  let batchLastFlightCard = null;
  while (lastFlightCard === null || lastFlightCard !== batchLastFlightCard) {
    lastFlightCard = batchLastFlightCard;
    const flightCards = flightContainer.querySelectorAll(FLIGHT_CARD_SELECTOR) as NodeListOf<HTMLElement>;
    batchLastFlightCard = Array.from(flightCards).slice(-1)[0];
    scrollToFlightCard(batchLastFlightCard);
    await pause(500);
  }
};
