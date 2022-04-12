import { DisplayableTrip, DisplayableTripInput } from "../../shared/types/DisplayableTrip";
import { ProviderManager } from "../ProviderManager";
import { sendTripResultsToClient } from "./utilities/sendTripResultsToClient";

export const handleClearSelections = (
  providerManager: ProviderManager,
  currentSelections: DisplayableTripInput[],
): void => {
  providerManager.setSelectedTrips(
    currentSelections.map((trip) => {
      return new DisplayableTrip(trip);
    }),
  );
  sendTripResultsToClient(providerManager);

  // TODO: Handle providers needing trip per page
};
