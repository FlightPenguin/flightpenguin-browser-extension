import { suppressOfferFlightPenguinPopup } from "../../../generic/activeCollectorSuppression/suppressOfferFlightPenguinPopup";
import { isBookingPage } from "./isBookingPage";

export const suppressRedirectOfferOnBookingPage = (): void => {
  const isBooking = isBookingPage();
  if (isBooking) {
    suppressOfferFlightPenguinPopup();
  }
};
