import { DisplayableTrip, DisplayableTripInput } from "../../shared/types/DisplayableTrip";
import { ProviderManager } from "../ProviderManager";
import { highlightTab } from "./utilities/highlightTab";

export const handleTripSelected = async (
  providerManager: ProviderManager,
  tripInputs: DisplayableTripInput[],
): Promise<void> => {
  const trips = tripInputs.map((tripInput) => {
    return new DisplayableTrip(tripInput);
  });
  providerManager.setSelectedTrips(trips);
  if (providerManager.isAtMaxSelections()) {
    await highlightTab(providerManager);
  } else {
    providerManager.sendTripResultsToIndexPage();
    if (providerManager.isExpectingMoreSearching()) {
      providerManager.sendMessageToIndexPage({ event: "SCRAPING_STATUS", complete: false });
      // TODO: Handle expedia
      // Probably want to send a notice to the expedia scraper a flight was selected, and have it send a notice to update status
    }
  }
};
