import { addBackToSearchButton } from "../../shared/ui/backToSearch";
import { CheapoairModalObserver } from "../parser/modalObserver";
import { isBookingFromFlightPenguin } from "./isBooking";
import { initBookingPageLoadedListener } from "./notifyBookingLoaded";

export const updateBookingPage = (observer: CheapoairModalObserver): void => {
  const { booking: isBookingPage, fromFlightPenguin: isFlightPenguinBooking } = isBookingFromFlightPenguin();
  if (isBookingPage && isFlightPenguinBooking) {
    observer.beginObservation();
    addBackToSearchButton();
    initBookingPageLoadedListener();
  } else if (observer.isEnabled()) {
    observer.endObservation();
  } else {
    console.debug("Not a booking page");
  }
};
