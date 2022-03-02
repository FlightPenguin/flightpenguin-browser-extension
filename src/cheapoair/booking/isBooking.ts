import { BOOKING_INDICATOR_STORAGE_KEY } from "../constants";

const bookingUris = ["/air/payment"];

export const isBookingFromFlightPenguin = (): { booking: boolean; fromFlightPenguin: boolean } => {
  const hasBookingIndicator = hasBookingIndicatorInLocalStorage();
  const booking = bookingUris.includes(window.location.pathname.toLowerCase());
  return { booking, fromFlightPenguin: hasBookingIndicator };
};

const hasBookingIndicatorInLocalStorage = (): boolean => {
  const value = sessionStorage.getItem(BOOKING_INDICATOR_STORAGE_KEY);
  return !!value;
};
