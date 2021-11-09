import { WindowConfig } from "../../shared/types/WindowConfig";
import { SearchType } from "../constants";
import { ProviderManager } from "../ProviderManager";

export const handleScraperFailed = (
  providerManager: ProviderManager,
  providerName: string,
  errorDescription: string,
  searchType: SearchType,
  windowConfig: WindowConfig,
) => {
  providerManager.setFailed(providerName, searchType);
  const isRetrying = providerManager.retry(providerName, windowConfig);
  if (!isRetrying) {
    providerManager.sendMessageToIndexPage({ event: "SCRAPER_COMPLETE", providerName: providerName, status: "FAILED" });

    if (providerManager.isComplete(searchType)) {
      const flightType = searchType === "BOTH" ? "DEPARTURE" : searchType;
      providerManager.sendMessageToIndexPage({ event: "SCRAPING_COMPLETED", searchType: flightType }, 3000);
    }
    // @ts-ignore
    window.Sentry.captureException(new Error(`Scraper (${searchType}) failed for ${providerName}`), {
      extra: providerManager.getFormData(),
      details: errorDescription,
    });
  }
};
