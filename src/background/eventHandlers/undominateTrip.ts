import { ProviderManager } from "../ProviderManager";

export const handleUndominateTrip = async (providerManager: ProviderManager, tripId: string): Promise<void> => {
  providerManager.addIdToDominationDenyList(tripId);
  providerManager.sendTripResultsToIndexPage();
};
