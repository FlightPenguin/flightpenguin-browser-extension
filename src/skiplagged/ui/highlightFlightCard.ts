import { clearHighlightFromElement, highlightSelectedElement } from "../../shared/ui/manageSelectionHighlights";
import { findFlightCard } from "./findFlightCard";
import { scrollToFlightCard } from "./scrollToFlightCard";

export const highlightFlightCard = async (selectedFlightId: string): Promise<void> => {
  clearExistingSelections();
  const flightCard = await findFlightCard(selectedFlightId);
  highlightSelectedElement(flightCard);
  scrollToFlightCard(flightCard);
};

export const clearExistingSelections = () => {
  const previousDepSelection = document.querySelector("[data-selected='true']") as HTMLElement;
  if (previousDepSelection) {
    clearHighlightFromElement(previousDepSelection);
  }
};
