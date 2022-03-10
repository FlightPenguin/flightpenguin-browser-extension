import { ProviderManager } from "../ProviderManager";

export const handleFlightNotFound = (providerManager: ProviderManager, id: string): void => {
  providerManager.removeItinerary(id);
  providerManager.sendMessageToIndexPage({
    event: "SELECTED_FLIGHT_NOT_FOUND",
    id,
  });
  providerManager.setPrimaryTabAsFocus();
};
