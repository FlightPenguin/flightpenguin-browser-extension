import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { highlightSelectedElement } from "../../shared/ui/manageSelectionHighlights";
import { findFlightCard } from "./findFlightCard";
import { removeFlightCardHighlight } from "./removeFlightCardHighlight";
import { removeRefreshPricesModal } from "./removeRefreshPricesModal";
import { scrollToFlightCard } from "./scrollToFlightCard";

export const highlightFlightCard = async (tripId: string, formData: FlightSearchFormData): Promise<void> => {
  removeRefreshPricesModal();
  removeFlightCardHighlight();
  const flightCard = await findFlightCard(tripId, formData);
  highlightSelectedElement(flightCard);
  scrollToFlightCard(flightCard);
  removeRefreshPricesModal();
};
