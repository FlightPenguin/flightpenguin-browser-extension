import { DisplayableTrip } from "../types/newtypes/DisplayableTrip";

export const sendTripSelected = (trip: DisplayableTrip, containerIndex: number): void => {
  chrome.runtime.sendMessage({
    event: `TRIP_SELECTED`,
    trip,
    containerIndex,
  });
};
