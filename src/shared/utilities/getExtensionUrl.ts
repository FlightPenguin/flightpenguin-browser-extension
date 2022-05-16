import * as browser from "webextension-polyfill";

export const getExtensionUrl = (): string => {
  return browser.runtime.getURL("./index.html");
};
