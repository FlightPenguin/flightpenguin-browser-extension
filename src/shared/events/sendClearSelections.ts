import * as browser from "webextension-polyfill";

import { DisplayableTrip } from "../types/DisplayableTrip";

export const sendClearSelections = (currentSelections: DisplayableTrip[]): void => {
  browser.runtime.sendMessage({
    event: "CLEAR_SELECTIONS",
    currentSelections,
  });
};
