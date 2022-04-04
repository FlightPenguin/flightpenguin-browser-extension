import { suppressOfferFlightPenguinPopup } from "../../shared/utilities/suppressOfferFlightPenguinPopup";
import { isBookingPage } from "./isBookingPage";

export const suppressRedirectOfferOnBookingPage = (): void => {
  const isBooking = isBookingPage();
  if (isBooking) {
    suppressOfferFlightPenguinPopup(true);
  }
};
