import { MissingElementLookupError } from "../../shared/errors";
import { pause } from "../../shared/pause";
import { isVisible } from "../../shared/utilities/isVisible";
import { clearExistingSelections } from "./highlightFlightCard";

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
  // not much in the way of appearance/disappearance...
  await pause(500);
};
