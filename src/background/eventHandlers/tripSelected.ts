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
  }
};
