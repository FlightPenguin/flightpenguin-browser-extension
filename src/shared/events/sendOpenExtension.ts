import * as browser from "webextension-polyfill";

export const sendOpenExtension = (): void => {
  console.debug("Requesting to open extension");
  browser.runtime.sendMessage({
    event: "OPEN_EXTENSION",
  });
};
