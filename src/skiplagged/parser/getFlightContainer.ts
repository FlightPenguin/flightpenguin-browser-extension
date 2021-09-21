import { MissingElementLookupError } from "../../shared/errors";
import { pause } from "../../shared/pause";
import { waitForAppearance } from "../../shared/utilities/waitFor";

const FLIGHT_CARDS_CONTAINER_SELECTOR = ".trip-list";
const INFINITE_SCROLL_CONTAINER_SELECTOR = ".infinite-trip-list";

export const getFlightContainer = async (selectedFlight: boolean): Promise<HTMLElement> => {
  waitForAppearance(45000, FLIGHT_CARDS_CONTAINER_SELECTOR);

  const flightType = selectedFlight ? "RETURN" : "DEPARTURE";

  const [departureContainer, returnContainer] = document.querySelectorAll(
    FLIGHT_CARDS_CONTAINER_SELECTOR,
  ) as NodeListOf<HTMLElement>;
  const container = selectedFlight ? returnContainer : departureContainer;
  if (!container) {
    await pause(60000);
    throw new MissingElementLookupError(`Unable to locate ${flightType.toLowerCase()} container`);
  }

  const tripListElement = container.querySelector(INFINITE_SCROLL_CONTAINER_SELECTOR);
  if (!tripListElement) {
    throw new MissingElementLookupError(`Unable to locate infinite scroll container for ${flightType.toLowerCase()}`);
  }

  const tripListContainer = tripListElement.children[0] as HTMLElement;
  if (!tripListContainer) {
    throw new MissingElementLookupError(
      `Unable to locate infinite scroll container child for ${flightType.toLowerCase()}`,
    );
  }

  return tripListContainer;
};
