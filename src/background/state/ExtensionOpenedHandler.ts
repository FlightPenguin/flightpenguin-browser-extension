import * as browser from "webextension-polyfill";

import { openExtension } from "./openExtension";

export const ExtensionOpenedHandler = (): void => {
  browser.browserAction.onClicked.addListener(() => {
    openExtension();
  });
};
