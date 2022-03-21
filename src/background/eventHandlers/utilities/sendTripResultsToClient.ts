import { ProviderManager } from "../../ProviderManager";
import { getTripGroupsAndMeta } from "./getTripGroupsAndMetadata";

export const sendTripResultsToClient = (providerManager: ProviderManager): void => {
  const itineraries = providerManager.getItineraries();
  const { tripGroups, meta } = getTripGroupsAndMeta(
    itineraries,
    providerManager.getSelectedTrips(),
    providerManager.getMaxSelectionsCount(),
  );

  const nextMessage = {
    event: "TRIP_RESULTS_FOR_CLIENT",
    trips: tripGroups,
    meta,
    formData: providerManager.getFormData(),
  };
  providerManager.sendMessageToIndexPage(nextMessage);
};
