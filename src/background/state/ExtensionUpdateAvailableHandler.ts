import { ProviderManager } from "../ProviderManager";

export const ExtensionUpdateAvailableHandler = (providerManager: ProviderManager): void => {
  chrome.runtime.onUpdateAvailable.addListener(function (details: chrome.runtime.UpdateAvailableDetails) {
    const manifestData = chrome.runtime.getManifest();

    providerManager.sendMessageToIndexPage({
      event: "UPDATE_AVAILABLE",
      newVersion: details.version,
      currentVersion: manifestData.version,
    });
  });
};
