import { DisplayableTrip } from "../types/DisplayableTrip";

export const sendClearSelections = (currentSelections: DisplayableTrip[]): void => {
  chrome.runtime.sendMessage({
    event: "CLEAR_SELECTIONS",
    currentSelections,
  });
};
