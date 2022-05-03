import * as browser from "webextension-polyfill";

export const sendIndexUnload = (): void => {
  browser.runtime.sendMessage({
    event: "INDEX_UNLOAD",
  });
};
