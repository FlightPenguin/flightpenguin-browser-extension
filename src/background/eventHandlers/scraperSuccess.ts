import { ProviderManager } from "../ProviderManager";

export const handleScraperSuccess = (providerManager: ProviderManager, providerName: string): void => {
  providerManager.setSuccessful(providerName);
  if (providerManager.isComplete()) {
    providerManager.sendMessageToIndexPage({ event: "SCRAPING_STATUS", complete: true }, 3000);
  }
};
