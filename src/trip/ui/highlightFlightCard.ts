import { highlightSelectedElement } from "../../shared/ui/manageSelectionHighlights";
import { findFlightCard } from "./findFlightCard";
import { removeFlightCardHighlight } from "./removeFlightCardHighlight";
import { removeRefreshPricesModal } from "./removeRefreshPricesModal";
import { scrollToFlightCard } from "./scrollToFlightCard";

export const highlightFlightCard = async (selectedFlightId: string): Promise<void> => {
  removeRefreshPricesModal();
  removeFlightCardHighlight();
  const flightCard = await findFlightCard(selectedFlightId);
  highlightSelectedElement(flightCard);
  scrollToFlightCard(flightCard);
  removeRefreshPricesModal();
};
