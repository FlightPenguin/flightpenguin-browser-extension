import { MissingElementLookupError } from "../../shared/errors";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { UnprocessedFlightSearchResult } from "../../shared/types/UnprocessedFlightSearchResult";
import { getFlightDetailsModal } from "../parser/getFlightDetailsModal";
import { getFlights } from "../parser/getFlights";
import { openFlightDetailsModal } from "./openFlightDetailsModal";

const FLIGHT_SELECTION_BUTTON_SELECTOR = "[data-test-id='select-button']";

export const selectReturnFlight = async (
  departure: UnprocessedFlightSearchResult,
  formData: FlightSearchFormData,
): Promise<void> => {
  let departureCard = document.querySelector(`[data-fpid='${departure.id}']`);
  if (!departureCard) {
    // may have re-rendered because we are changing departure selection after viewing returns
    // re-render wipes dataset.id
    await getFlights(null, 30000, formData);
    departureCard = document.querySelector(`[data-fpid='${departure.id}']`);
    if (!departureCard) {
      throw new MissingElementLookupError("Unable to lookup departure flight");
    }
  }

  openFlightDetailsModal(departureCard);
  const modal = await getFlightDetailsModal();
  clickSelectionConfirmation(modal);
};

const clickSelectionConfirmation = (modal: Element) => {
  const selectButton = modal.querySelector(FLIGHT_SELECTION_BUTTON_SELECTOR) as HTMLElement;
  if (!selectButton) {
    throw new MissingElementLookupError("Unable to find select button");
  }
  selectButton.click();
};
