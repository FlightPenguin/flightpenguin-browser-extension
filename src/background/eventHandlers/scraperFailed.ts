import { SearchType } from "../constants";
import { ProviderManager } from "../ProviderManager";

export const handleScraperFailed = (
  providerManager: ProviderManager,
  providerName: string,
  errorDescription: string,
  searchType: SearchType,
) => {
  providerManager.setFailed(providerName, searchType);
  providerManager.sendMessageToIndexPage({ event: "SCRAPER_COMPLETE", providerName: providerName, status: "FAILED" });
  providerManager.closeWindow(providerName);
  if (providerManager.isComplete(searchType)) {
    const flightType = searchType === "BOTH" ? "DEPARTURE" : searchType;
    providerManager.sendMessageToIndexPage({ event: "SCRAPING_COMPLETED", searchType: flightType });
  }
  // @ts-ignore
  window.Sentry.captureException(new Error(`Scraper (${searchType}) failed for ${providerName}`), {
    extra: providerManager.getFormData(),
    details: errorDescription,
  });
};
