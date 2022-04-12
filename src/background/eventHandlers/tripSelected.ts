import { DisplayableTrip, DisplayableTripInput } from "../../shared/types/DisplayableTrip";
import { ProviderManager } from "../ProviderManager";
import { highlightTab } from "./utilities/highlightTab";
import { sendTripResultsToClient } from "./utilities/sendTripResultsToClient";

export const handleTripSelected = (providerManager: ProviderManager, tripInputs: DisplayableTripInput[]): void => {
  const trips = tripInputs.map((tripInput) => {
    return new DisplayableTrip(tripInput);
  });
  providerManager.setSelectedTrips(trips);
  if (providerManager.isAtMaxSelections()) {
    highlightTab(providerManager);
  } else {
    sendTripResultsToClient(providerManager);
    if (providerManager.isExpectingMoreSearching()) {
      providerManager.sendMessageToIndexPage({ event: "SCRAPING_STATUS", complete: false });
      // TODO: Handle expedia
      // Probably want to send a notice to the expedia scraper a flight was selected, and have it send a notice to update status
    }
  }
};
