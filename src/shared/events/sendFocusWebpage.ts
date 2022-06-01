import * as browser from "webextension-polyfill";

export const sendFocusWebpage = (providerName: string): void => {
  browser.runtime.sendMessage({
    event: "FOCUS_WEBPAGE",
    provider: providerName,
  });
};
