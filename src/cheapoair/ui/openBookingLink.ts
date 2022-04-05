import { Itinerary } from "../../shared/types/Itinerary";
import { BOOKING_ID_MAP_STORAGE_KEY, BOOKING_INDICATOR_STORAGE_KEY } from "../constants";
import { getBookingUrl } from "../mappings/getBookingUrl";

export const openBookingLink = async (itineraryId: string, knownItineraries: Itinerary[]): Promise<void> => {
  // as we open booking links, we 'lose' the state in the content script.

  const persistedMap = getOrSetCachedIdMap(knownItineraries);
  const cheapoAirId = persistedMap[itineraryId];
  if (!cheapoAirId) {
    throw new Error("Unable to find cheapoair id for flight penguin id");
  }

  sessionStorage.setItem(BOOKING_INDICATOR_STORAGE_KEY, cheapoAirId);

  window.location.href = getBookingUrl(cheapoAirId);
};

const getOrSetCachedIdMap = (knownItineraries: Itinerary[]) => {
  const cachedMap = sessionStorage.getItem(BOOKING_ID_MAP_STORAGE_KEY);
  if (!cachedMap) {
    const idMap = {} as { [keyof: string]: string };
    knownItineraries.forEach((itinerary) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      idMap[itinerary.getId()] = itinerary.getTopSource().getId();
    });

    sessionStorage.setItem(BOOKING_ID_MAP_STORAGE_KEY, JSON.stringify(idMap));
    return idMap;
  }
  return JSON.parse(cachedMap);
};
