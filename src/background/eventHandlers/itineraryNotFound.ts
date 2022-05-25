import { ProviderManager } from "../ProviderManager";

export const handleItineraryNotFound = async (providerManager: ProviderManager, id: string): Promise<void> => {
  providerManager.removeItinerary(id);
  await providerManager.sendMessageToIndexPage({
    event: "SELECTED_ITINERARY_NOT_FOUND",
    id,
  });
  await providerManager.setPrimaryTabAsFocus();
};
