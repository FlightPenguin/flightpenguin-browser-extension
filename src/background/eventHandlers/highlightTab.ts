import { ProviderManager } from "../ProviderManager";

export const handleHighlightTab = (providerManager: ProviderManager, departureId: string, returnId: string) => {
  let key = departureId;
  if (returnId) {
    key += `-${returnId}`;
  }
  const itinerary = providerManager.getItineraries()[key];
  highlightTab(providerManager, itinerary);
};

function highlightTab(providerManager: ProviderManager, itinerary: any) {
  if (providerManager.getFormData()?.searchByPoints) {
    chrome.tabs.create({ url: "https://flightpenguin.com/flight-penguin-points" });
    return;
  }
  const windowId = providerManager.getWindowId(itinerary.provider);
  if (windowId !== null && windowId !== undefined && itinerary.tabId !== null && itinerary.tabId !== undefined) {
    chrome.windows.update(windowId, { focused: true }, (win) => {
      chrome.tabs.sendMessage(itinerary.tabId, {
        event: "HIGHLIGHT_FLIGHT",
        selectedDepartureId: itinerary.depFlight.id,
        selectedReturnId: itinerary.retFlight ? itinerary.retFlight.id : "",
        provider: itinerary.provider,
      });

      chrome.tabs.update(itinerary.tabId, {
        selected: true,
      });
    });
  }
}
