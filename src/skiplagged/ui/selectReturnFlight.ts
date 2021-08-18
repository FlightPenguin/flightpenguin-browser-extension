import { MissingElementLookupError } from "../../shared/errors";
import { Flight } from "../../shared/types/Flight";
import { getFlightDetailsModal } from "../parser/getFlightDetailsModal";
import { getFlights } from "../parser/getFlights";
import { openFlightDetailsModal } from "./openFlightDetailsModal";

const FLIGHT_SELECTION_BUTTON_SELECTOR = "[data-test-id='select-button']";

export const selectReturnFlight = async (departure: Flight): Promise<void> => {
  const departureCard = document.querySelector(`[data-fpid='${departure.id}']`);
  if (!departureCard) {
    // may be missing because skiplagged deletes within the infinite scroller
    debugger;
  }

  flightCard.click();
};
