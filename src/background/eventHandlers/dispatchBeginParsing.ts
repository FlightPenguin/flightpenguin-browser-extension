import { ProviderManager } from "../ProviderManager";

export const handleDispatchBeginParsing = (providerManager: ProviderManager, providerName: string, timeout: number) => {
  providerManager.setPending(providerName, "BOTH"); // de facto begin parsing resets both...

  const tabId = providerManager.getTabId(providerName);
  if (tabId !== null && tabId !== undefined) {
    setTimeout(() => {
      chrome.tabs.sendMessage(tabId, {
        event: "BEGIN_PARSING",
        formData: providerManager.getFormData(),
      });
    }, timeout);
  }
};
