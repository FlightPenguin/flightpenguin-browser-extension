import { DEFAULT_ON_READY_FUNCTION, PROVIDERS_NEEDING_RETURNS } from "../constants";
import { ProviderManager } from "../ProviderManager";

export const handleClearSelections = (providerManager: ProviderManager) => {
  providerManager.setReturns([]);
  for (const providerName of PROVIDERS_NEEDING_RETURNS) {
    providerManager.setReady(providerName, false);
    providerManager.setOnReady(providerName, DEFAULT_ON_READY_FUNCTION);
    const tabId = providerManager.getTabId(providerName);
    if (tabId) {
      chrome.tabs.sendMessage(tabId, {
        event: "CLEAR_SELECTION",
      });
    }
  }
};
