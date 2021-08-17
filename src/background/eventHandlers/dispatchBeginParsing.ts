import { ProviderManager } from "../ProviderManager";

export const handleDispatchBeginParsing = (providerManager: ProviderManager, providerName: string, timeout: number) => {
  const tabId = providerManager.getTabId(providerName);
  if (tabId) {
    setTimeout(() => {
      chrome.tabs.sendMessage(tabId, {
        event: "BEGIN_PARSING",
        formData: providerManager.getFormData(),
      });
    }, timeout);
  }
};
