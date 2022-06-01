import * as browser from "webextension-polyfill";

import { DisplayableTrip } from "../types/DisplayableTrip";

export const sendTripSelected = (selectedTrips: DisplayableTrip[]): void => {
  browser.runtime.sendMessage({
    event: `TRIP_SELECTED`,
    selectedTrips,
  });
};
