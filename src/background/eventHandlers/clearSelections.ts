import { DisplayableTrip, DisplayableTripInput } from "../../shared/types/DisplayableTrip";
import { ProviderManager } from "../ProviderManager";

export const handleClearSelections = async (
  providerManager: ProviderManager,
  currentSelections: DisplayableTripInput[],
): Promise<void> => {
  providerManager.setSelectedTrips(
    currentSelections.map((trip) => {
      return new DisplayableTrip(trip);
    }),
  );
  providerManager.sendTripResultsToIndexPage();

  // TODO: Handle providers needing trip per page
};
