import { DisplayableTrip } from "../types/DisplayableTrip";

export const sendTripSelected = (selectedTrips: DisplayableTrip[]): void => {
  chrome.runtime.sendMessage({
    event: `TRIP_SELECTED`,
    selectedTrips,
  });
};
