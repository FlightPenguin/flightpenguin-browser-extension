import { highlightSelectedElement } from "../../shared/ui/manageSelectionHighlights";
import { findFlightCard } from "./findFlightCard";
import { removeFlightCardHighlight } from "./removeFlightCardHighlight";
import { scrollToFlightCard } from "./scrollToFlightCard";

interface HighlightFlightCardProps {
  departureId: string;
  returnId: string | null;
}

export const highlightFlightCard = async ({ departureId, returnId }: HighlightFlightCardProps): Promise<void> => {
  removeFlightCardHighlight();
  const departureFlightCard = await findFlightCard(departureId);
  highlightSelectedElement(departureFlightCard);
  if (returnId) {
    const returnFlightCard = await findFlightCard(returnId);
    highlightSelectedElement(returnFlightCard);
  }

  scrollToFlightCard(departureFlightCard);
};
