import { DisplayableTrip } from "../types/newtypes/DisplayableTrip";

export const sendTripFlightSelected = (trip: DisplayableTrip, containerIndex: number): void => {
  chrome.runtime.sendMessage({
    event: `TRIP_FLIGHT_SELECTED`,
    trip,
    containerIndex,
  });
};
