import { MissingElementLookupError, ParserError } from "../../shared/errors";
import { clearHighlightFromElement, highlightSelectedElement } from "../../shared/ui/manageSelectionHighlights";
import { findMatchingDOMNode } from "../../shared/utilities/findMatchingDOMNode";
import { getFlights } from "../parser/getFlights";

const FLIGHT_CARD_SELECTOR = "[data-test-id='offer-listing']";

export const highlightFlightCard = async (selectedDepartureId: string, selectedReturnId: string) => {
  await getFlights(); // fix missing IDs as needed.
  clearExistingSelections();
  const flightCard = getFlightCard(selectedReturnId);
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

const scrollToFlightCard = (flightCard: HTMLElement) => {
  const yPosition = window.pageYOffset + flightCard.getBoundingClientRect().top - window.innerHeight / 2;
  window.scroll(0, yPosition);
};
