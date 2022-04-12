import { highlightSelectedElement } from "../../shared/ui/manageSelectionHighlights";
import { closeAllVisibleModals } from "./closeAllVisibleModals";
import { findItineraryCard } from "./findItineraryCard";
import { removeItineraryCardHighlight } from "./removeItineraryCardHighlight";
import { scrollToItineraryCard } from "./scrollToItineraryCard";

export const highlightItineraryCard = async (id: string): Promise<void> => {
  await closeAllVisibleModals();
  removeItineraryCardHighlight();
  const card = await findItineraryCard(id);
  highlightSelectedElement(card);
  await scrollToItineraryCard(card, true);
};
