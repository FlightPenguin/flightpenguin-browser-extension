import * as browser from "webextension-polyfill";

export const sendItineraryNotFound = (id: string): void => {
  browser.runtime.sendMessage({
    event: "ITINERARY_NOT_FOUND",
    id,
  });
};
