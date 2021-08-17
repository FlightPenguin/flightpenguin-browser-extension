import { ProviderManager } from "../ProviderManager";

export const handleScraperFailed = (
  providerManager: ProviderManager,
  providerName: string,
  errorDescription: string,
) => {
  providerManager.setFailed(providerName);
  if (providerManager.isComplete() && providerManager.getTotalFlightCount() === 0) {
    providerManager.sendMessageToIndexPage({ event: "FAILED_SCRAPER_CLIENT" });
    providerManager.closeWindows();
  }
  // @ts-ignore
  window.Sentry.captureException(new Error(`Scraper failed for ${providerName}`), {
    extra: providerManager.getFormData(),
    details: errorDescription,
  });
};
