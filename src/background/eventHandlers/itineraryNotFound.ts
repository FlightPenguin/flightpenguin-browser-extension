import { ProviderManager } from "../ProviderManager";

export const handleItineraryNotFound = (providerManager: ProviderManager, id: string): void => {
  providerManager.removeItinerary(id);
  providerManager.sendMessageToIndexPage({
    event: "SELECTED_ITINERARY_NOT_FOUND",
    id,
  });
  providerManager.setPrimaryTabAsFocus();
};
