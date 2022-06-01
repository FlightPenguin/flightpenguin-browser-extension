import * as browser from "webextension-polyfill";

import { ProviderManager } from "../ProviderManager";

export const ExtensionUpdateAvailableHandler = (providerManager: ProviderManager): void => {
  browser.runtime.onUpdateAvailable.addListener(async (details) => {
    const manifestData = browser.runtime.getManifest();

    await providerManager.sendMessageToIndexPage({
      event: "UPDATE_AVAILABLE",
      newVersion: details.version,
      currentVersion: manifestData.version,
    });
  });
};
