import * as browser from "webextension-polyfill";

import { ProviderManager } from "../../ProviderManager";

export const highlightTab = async (providerManager: ProviderManager): Promise<void> => {
  const itinerary = providerManager.getSelectedItinerary();
  const provider = itinerary.getTopSource();

  const tabId = providerManager.getTabId(provider.getName());
  if (tabId !== null && tabId !== undefined && !isNaN(tabId)) {
    try {
      const tab = await browser.tabs.get(tabId);
      if (!tab) {
        console.log("Unable to retrieve tab");
        handleError(providerManager);
      }
      if (tab.windowId !== null && tab.windowId !== undefined && !isNaN(tab.windowId)) {
        const window = await browser.windows.update(tab.windowId, { focused: true });
        if (window) {
          await browser.tabs.sendMessage(tabId, {
            event: "HIGHLIGHT_FLIGHT",
            itineraryId: itinerary.getId(),
            sourceId: itinerary.getTopSource().getId() || "",
            provider: provider.getName(),
          });
          await browser.tabs.update(tabId, { active: true, highlighted: true });
        } else {
          console.log("Unable to retrieve window");
          handleError(providerManager);
        }
      } else {
        console.log("Tab window unavailable");
        handleError(providerManager);
      }
    } catch {
      console.log("Unable to update window/tab focus");
      handleError(providerManager);
    }
  } else {
    console.log("Unable to find valid tab id");
    handleError(providerManager);
  }
};

const handleError = (providerManager: ProviderManager): void => {
  providerManager.closeTabs();
  providerManager.sendMessageToIndexPage({ event: "HIGHLIGHT_TAB_FAILED" });
};
