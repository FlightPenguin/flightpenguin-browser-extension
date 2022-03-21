import { ProviderManager } from "../ProviderManager";
import { sendTripResultsToClient } from "./utilities/sendTripResultsToClient";

export const handleClearSelections = (providerManager: ProviderManager, activeContainerIndex: number): void => {
  providerManager.clearSelectedTrips(activeContainerIndex);
  sendTripResultsToClient(providerManager);

  // TODO: Handle providers needing trip per page
};
