import { ProviderManager } from "../ProviderManager";

export const handleNoFlightsFound = (providerManager: ProviderManager, providerName: string): void => {
  providerManager.setSuccessful(providerName);
  providerManager.closeWindow(providerName);
  if (providerManager.isComplete()) {
    providerManager.sendMessageToIndexPage({ event: "SCRAPING_STATUS", completed: true }, 3000);
  }
};
