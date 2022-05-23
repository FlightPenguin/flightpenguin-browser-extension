import { suppressOfferFlightPenguinPopup } from "../../collectors/generic/activeCollectorSuppression/suppressOfferFlightPenguinPopup";
import { isBookingPage } from "./isBookingPage";

export const suppressRedirectOfferOnBookingPage = (): void => {
  const isBooking = isBookingPage();
  if (isBooking) {
    suppressOfferFlightPenguinPopup(true);
  }
};
