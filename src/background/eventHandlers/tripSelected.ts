import { DisplayableTrip, DisplayableTripInput } from "../../shared/types/newtypes/DisplayableTrip";
import { ProviderManager } from "../ProviderManager";
import { highlightTab } from "./utilities/highlightTab";
import { sendTripResultsToClient } from "./utilities/sendTripResultsToClient";

export const handleTripSelected = (providerManager: ProviderManager, tripInput: DisplayableTripInput): void => {
  const trip = new DisplayableTrip(tripInput);
  providerManager.addSelectedTrip(trip);
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
