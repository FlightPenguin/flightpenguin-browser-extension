import { highlightSelectedElement } from "../../shared/ui/manageSelectionHighlights";
import { findFlightCard } from "./findFlightCard";
import { removeFlightCardHighlight } from "./removeFlightCardHighlight";
import { removeRefreshPricesModal } from "./removeRefreshPricesModal";
import { scrollToFlightCard } from "./scrollToFlightCard";

export const highlightFlightCard = async (flightIndex: string): Promise<void> => {
  removeRefreshPricesModal();
  removeFlightCardHighlight();
  const flightCard = await findFlightCard(flightIndex);
  highlightSelectedElement(flightCard);
  scrollToFlightCard(flightCard);
  removeRefreshPricesModal();
};
