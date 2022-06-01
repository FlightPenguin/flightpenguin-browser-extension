import { ProviderManager } from "../ProviderManager";

export const handleScraperFailed = async (providerManager: ProviderManager, providerName: string): Promise<void> => {
  providerManager.setAlertOnWindowClose(providerName, false);
  providerManager.closeWindow(providerName);
};
