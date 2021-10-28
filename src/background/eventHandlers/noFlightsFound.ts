import { SearchType } from "../constants";
import { ProviderManager } from "../ProviderManager";

export const handleNoFlightsFound = (
  providerManager: ProviderManager,
  providerName: string,
  searchType: SearchType,
): void => {
  providerManager.setSuccessful(providerName, searchType);
  providerManager.sendMessageToIndexPage({ event: "SCRAPER_COMPLETE", providerName: providerName, status: "SUCCESS" });
  providerManager.closeWindow(providerName);
  if (providerManager.isComplete(searchType)) {
    const flightType = searchType === "BOTH" ? "DEPARTURE" : searchType;
    providerManager.sendMessageToIndexPage({ event: "SCRAPING_COMPLETED", searchType: flightType }, 3000);
    providerManager.closeWindows();
  }
};
