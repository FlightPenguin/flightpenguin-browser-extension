import { ProviderManager } from "../ProviderManager";
import { sendTripResultsToClient } from "./utilities/sendTripResultsToClient";

export const handleClearSelections = (providerManager: ProviderManager, activeContainerIndex: number) => {
  providerManager.clearSelectedTrips(activeContainerIndex);
  sendTripResultsToClient(providerManager);

  // TODO: Handle providers needing trip per page
};
