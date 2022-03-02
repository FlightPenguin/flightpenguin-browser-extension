import { BOOKING_INDICATOR_STORAGE_KEY } from "../constants";
import { getBookingUrl } from "../mappings/getBookingUrl";

export const openBookingLink = async (flightPenguinId: string, idMap: { [keyof: string]: string }): Promise<void> => {
  const cheapoAirId = idMap[flightPenguinId];
  if (!cheapoAirId) {
    throw new Error("Unable to find cheapoair id for flight penguin id");
  }

  sessionStorage.setItem(BOOKING_INDICATOR_STORAGE_KEY, cheapoAirId);

  const url = getBookingUrl(cheapoAirId);
  window.location.href = url;
};
