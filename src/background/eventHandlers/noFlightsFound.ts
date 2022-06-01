import { ProviderManager } from "../ProviderManager";

export const handleNoFlightsFound = async (providerManager: ProviderManager, providerName: string): Promise<void> => {
  providerManager.setSuccessful(providerName);
  providerManager.closeWindow(providerName);
  if (providerManager.isComplete()) {
    await providerManager.sendMessageToIndexPage({ event: "SCRAPING_STATUS", complete: true }, 3000);
  }
};
