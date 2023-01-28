import * as browser from "webextension-polyfill";

import { setRecentlyInstalled } from "../../shared/utilities/recentlyInstalledManager";
import { openExtension } from "./openExtension";

export const ExtensionInstalledHandler = (): void => {
  browser.runtime.onInstalled.addListener(async (details) => {
    console.log("It's alive!");
    console.log(details);

    switch (details.reason.toLowerCase()) {
      case "install":
        setRecentlyInstalled(true);
        await openExtension();
        break;
      case "update":
        break;
      case "chrome_update":
      case "browser_update":
        break;
      case "shared_module_update":
        break;
      default:
        console.error(`What is this install reason: ${details.reason}`);
        break;
    }
  });
};
