import { BOOKING_ID_MAP_STORAGE_KEY, BOOKING_INDICATOR_STORAGE_KEY } from "../constants";
import { getBookingUrl } from "../mappings/getBookingUrl";

export const openBookingLink = async (flightPenguinId: string, idMap: { [keyof: string]: string }): Promise<void> => {
  // as we open booking links, we 'lose' the state in the content script.

  const persistedMap = getOrSetCachedIdMap(idMap);
  const cheapoAirId = persistedMap[flightPenguinId];
  if (!cheapoAirId) {
    throw new Error("Unable to find cheapoair id for flight penguin id");
  }

  sessionStorage.setItem(BOOKING_INDICATOR_STORAGE_KEY, cheapoAirId);

  const url = getBookingUrl(cheapoAirId);
  window.location.href = url;
};

const getOrSetCachedIdMap = (idMap: { [keyof: string]: string }) => {
  const cachedMap = sessionStorage.getItem(BOOKING_ID_MAP_STORAGE_KEY);
  if (!cachedMap) {
    sessionStorage.setItem(BOOKING_ID_MAP_STORAGE_KEY, JSON.stringify(idMap));
    return idMap;
  }
  return JSON.parse(cachedMap);
};
