import * as browser from "webextension-polyfill";

import { ProviderManager } from "../../ProviderManager";

export const highlightTab = async (providerManager: ProviderManager): Promise<void> => {
  const itinerary = providerManager.getSelectedItinerary();
  const provider = itinerary.getTopSource();

  const windowId = providerManager.getWindowId(provider.getName());
  const tabId = providerManager.getTabId(provider.getName());
  if (
    windowId !== null &&
    windowId !== undefined &&
    !isNaN(windowId) &&
    tabId !== null &&
    tabId !== undefined &&
    !isNaN(tabId)
  ) {
    const window = await browser.windows.update(windowId, { focused: true });
    if (window) {
      await browser.tabs.sendMessage(tabId, {
        event: "HIGHLIGHT_FLIGHT",
        itineraryId: itinerary.getId(),
        sourceId: itinerary.getTopSource().getId() || "",
        provider: provider.getName(),
      });
      await browser.tabs.update(tabId, { active: true, highlighted: true });
    }
  } else {
    throw Error("Unable to find valid window & tab id");
  }
};
