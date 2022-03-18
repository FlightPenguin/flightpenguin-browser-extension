import { MessageResponse } from "../../../shared/types/MessageResponse";
import { ProviderManager } from "../../ProviderManager";

export const highlightTab = (providerManager: ProviderManager): void => {
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
    chrome.windows.update(windowId, { focused: true }, (win) => {
      chrome.tabs.sendMessage(
        tabId,
        {
          event: "HIGHLIGHT_FLIGHT",
          itineraryId: itinerary.getId(),
          provider: provider.getName(),
        },
        (response: MessageResponse) => {
          console.debug(response);
          if (!response || !response.received) {
            providerManager.closeWindows();
            providerManager.sendMessageToIndexPage({ event: "HIGHLIGHT_TAB_FAILED" });
          }
        },
      );

      chrome.tabs.update(tabId, {
        selected: true,
      });
    });
  } else {
    throw Error("Unable to find valid window & tab id");
  }
};
