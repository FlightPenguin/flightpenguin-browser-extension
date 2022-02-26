import { getBookingUrl } from "../mappings/getBookingUrl";

export const openBookingLink = async (flightPenguinId: string, idMap: { [keyof: string]: string }) => {
  const cheapoAirId = idMap[flightPenguinId];
  if (!cheapoAirId) {
    throw new Error("Unable to find cheapoair id for flight penguin id");
  }

  const url = getBookingUrl(cheapoAirId);
  window.location.href = url;
};
