import { ProviderManager } from "../ProviderManager";

export const handleScraperSuccess = async (providerManager: ProviderManager, providerName: string): Promise<void> => {
  providerManager.setSuccessful(providerName);
  if (providerManager.isComplete()) {
    await providerManager.sendMessageToIndexPage({ event: "SCRAPING_STATUS", complete: true }, 3000);
  }
};
