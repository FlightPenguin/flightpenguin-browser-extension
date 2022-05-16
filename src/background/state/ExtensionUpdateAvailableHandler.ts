import * as browser from "webextension-polyfill";

import { ProviderManager } from "../ProviderManager";

export const ExtensionUpdateAvailableHandler = (providerManager: ProviderManager): void => {
  browser.runtime.onUpdateAvailable.addListener((details) => {
    const manifestData = browser.runtime.getManifest();

    providerManager.sendMessageToIndexPage({
      event: "UPDATE_AVAILABLE",
      newVersion: details.version,
      currentVersion: manifestData.version,
    });
  });
};
