import { DEFAULT_ON_READY_FUNCTION, PROVIDERS_NEEDING_RETURNS } from "../constants";
import { ProviderManager } from "../ProviderManager";
import { getTripGroupsAndMeta } from "./utilities/getTripGroupsAndMetadata";

export const handleClearSelections = (providerManager: ProviderManager, activeContainerIndex: number) => {
  providerManager.clearSelectedTrips(activeContainerIndex);
  const itineraries = providerManager.getItineraries();
  const { tripGroups, meta } = getTripGroupsAndMeta(itineraries, providerManager.getSelectedTrips());

  const nextMessage = {
    event: "TRIP_RESULTS_FOR_CLIENT",
    trips: tripGroups,
    meta,
    formData: providerManager.getFormData(),
  };
  providerManager.sendMessageToIndexPage(nextMessage);

  // TODO: Handle providers needing trip per page
};
