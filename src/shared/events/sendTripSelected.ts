import { DisplayableTrip } from "../types/newtypes/DisplayableTrip";

export const sendTripSelected = (selectedTrips: DisplayableTrip[]): void => {
  chrome.runtime.sendMessage({
    event: `TRIP_SELECTED`,
    selectedTrips,
  });
};
