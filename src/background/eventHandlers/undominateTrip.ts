import { ProviderManager } from "../ProviderManager";

export const handleUndominateTrip = (providerManager: ProviderManager, tripId: string): void => {
  providerManager.addIdToDominationDenyList(tripId);
  providerManager.sendTripResultsToIndexPage();
};
