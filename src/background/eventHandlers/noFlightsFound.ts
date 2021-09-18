import { SearchType } from "../constants";
import { ProviderManager } from "../ProviderManager";

export const handleNoFlightsFound = (
  providerManager: ProviderManager,
  providerName: string,
  searchType: SearchType,
): void => {
  providerManager.setSuccessful(providerName, searchType);
  if (providerManager.isComplete(searchType)) {
    providerManager.sendMessageToIndexPage({ event: "NO_FLIGHTS_FOUND_CLIENT" });
    providerManager.closeWindows();
  }
};
