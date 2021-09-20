import { MissingElementLookupError } from "../../shared/errors";
import { pause } from "../../shared/pause";
import { isVisible } from "../../shared/utilities/isVisible";
import { waitForDisappearance, waitForInvisible } from "../../shared/utilities/waitFor";
import { clearExistingSelections } from "./highlightFlightCard";
import { removeScrollingCheck } from "./scrollThroughContainer";

const RETURN_HEADER_SELECTOR = ".trip-return-header";
const SELECTED_FLIGHT_CARD_SELECTOR = ".selected-trip";

export const clearSelection = async (): Promise<void> => {
  clearExistingSelections();

  if (!isSelectingReturnFlight()) {
    return;
  }
  const flightCard = getSelectedFlightCard();
  flightCard.click();

  await waitForLoad();
  await removeScrollingCheck(null);

  window.scrollTo({ top: 0, behavior: "smooth" });
};

const isSelectingReturnFlight = (): boolean => {
  const returnHeader = document.querySelector(RETURN_HEADER_SELECTOR) as HTMLElement;
  if (!returnHeader) {
    throw new MissingElementLookupError("Unable to locate return header");
  }

  return isVisible(returnHeader);
};

const getSelectedFlightCard = (): HTMLElement => {
  const flightCard = document.querySelector(SELECTED_FLIGHT_CARD_SELECTOR) as HTMLElement;
  if (!flightCard) {
    throw new MissingElementLookupError("Unable to selected departure flight card");
  }

  return flightCard;
};

const waitForLoad = async () => {
  await waitForInvisible(5000, SELECTED_FLIGHT_CARD_SELECTOR);
};
