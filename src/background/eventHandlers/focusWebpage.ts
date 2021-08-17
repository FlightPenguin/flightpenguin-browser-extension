import { focusTab } from "../../shared/focusTab";
import { ProviderManager } from "../ProviderManager";

export const handleFocusWebpage = (providerManager: ProviderManager) => {
  providerManager.sendMessageToIndexPage({ event: "FOCUS_WEBPAGE_CLIENT" });
  const windowId = providerManager.getPrimaryWindowId();
  const tabId = providerManager.getPrimaryTabId();
  if (windowId !== null && windowId !== undefined && tabId !== null && tabId !== undefined) {
    focusTab(windowId, tabId);
  }
};
