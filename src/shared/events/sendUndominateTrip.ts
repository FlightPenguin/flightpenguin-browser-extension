import * as browser from "webextension-polyfill";

export const sendUndominateTrip = (tripId: string): void => {
  browser.runtime.sendMessage({
    event: `UNDOMINATE_TRIP`,
    tripId,
  });
};
