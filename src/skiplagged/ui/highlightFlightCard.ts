import { MissingElementLookupError, ParserError } from "../../shared/errors";
import { clearHighlightFromElement, highlightSelectedElement } from "../../shared/ui/manageSelectionHighlights";
import { findMatchingDOMNode } from "../../shared/utilities/findMatchingDOMNode";
import { scrollToFlightCard } from "./scrollToFlightCard";

const FLIGHT_CARD_SELECTOR = "div[class='trip']";

export const highlightFlightCard = async (selectedDepartureId: string, selectedReturnId: string): Promise<void> => {
  clearExistingSelections();
  const flightCard = selectedReturnId ? getFlightCard(selectedReturnId) : getFlightCard(selectedDepartureId);
  highlightSelectedElement(flightCard);
  scrollToFlightCard(flightCard);
};

const clearExistingSelections = () => {
  const previousDepSelection = document.querySelector("[data-selected='true']") as HTMLElement;
  if (previousDepSelection) {
    clearHighlightFromElement(previousDepSelection);
  }
};

const getFlightCard = (selectedReturnId: string) => {
  const flightCards = document.querySelectorAll(FLIGHT_CARD_SELECTOR) as NodeListOf<HTMLElement>;
  if (!flightCards) {
    throw new ParserError("Unable to find flights in highlighting");
  }

  const flightCard = findMatchingDOMNode([...flightCards], selectedReturnId);
  if (!flightCard) {
    throw new MissingElementLookupError("Unable to find flight to highlight");
  }

  return flightCard;
};
