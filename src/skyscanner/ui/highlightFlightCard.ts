import { MissingElementLookupError, ParserError } from "../../shared/errors";
import { clearHighlightFromElement, highlightSelectedElement } from "../../shared/ui/manageSelectionHighlights";
import { findMatchingDOMNode } from "../../shared/utilities/findMatchingDOMNode";

const FLIGHT_CARD_SELECTOR = "[class*='FlightsTicket_container'] [role='button']";

export const highlightFlightCard = async (selectedDepartureId: string, selectedReturnId: string): Promise<void> => {
  clearExistingSelections();
  const flightCard = getFlightCard(selectedDepartureId, selectedReturnId);
  highlightSelectedElement(flightCard);
  scrollToFlightCard(flightCard);
};

const clearExistingSelections = () => {
  const previousDepSelection = document.querySelector("[data-selected='true']") as HTMLElement;
  if (previousDepSelection) {
    clearHighlightFromElement(previousDepSelection);
  }
};

const getFlightCard = (selectedFlightId: string, selectedReturnId: string) => {
  const flightCards = document.querySelectorAll(FLIGHT_CARD_SELECTOR) as NodeListOf<HTMLElement>;
  if (!flightCards) {
    throw new ParserError("Unable to find flights in highlighting");
  }

  const flightId = `${selectedFlightId}-${selectedReturnId}`;
  const flightCard = findMatchingDOMNode([...flightCards], flightId);
  if (!flightCard) {
    throw new MissingElementLookupError("Unable to find flight to highlight");
  }

  return flightCard;
};

const scrollToFlightCard = (flightCard: HTMLElement) => {
  const yPosition = window.pageYOffset + flightCard.getBoundingClientRect().top - window.innerHeight / 2;
  window.scroll(0, yPosition);
};
