import { SearchType } from "../constants";
import { ProviderManager } from "../ProviderManager";

export const handleScraperSuccess = (
  providerManager: ProviderManager,
  providerName: string,
  searchType: SearchType,
) => {
  providerManager.setSuccessful(providerName, searchType);
  providerManager.sendMessageToIndexPage({ event: "SCRAPER_COMPLETE", providerName: providerName, status: "SUCCESS" });
  if (providerManager.isComplete(searchType)) {
    const flightType = searchType === "BOTH" ? "DEPARTURE" : searchType;
    providerManager.sendMessageToIndexPage({ event: "SCRAPING_COMPLETED", searchType: flightType }, 3000);
  }
};
