import * as browser from "webextension-polyfill";

import { Itinerary } from "../types/Itinerary";

export const sendItinerariesEvent = (providerName: string, itineraries: Itinerary[]): void => {
  console.debug(`Sending ${itineraries.length} itineraries from ${providerName}`);
  browser.runtime.sendMessage({
    event: "ITINERARY_RESULTS",
    itineraries: itineraries,
    provider: providerName,
  });
};
