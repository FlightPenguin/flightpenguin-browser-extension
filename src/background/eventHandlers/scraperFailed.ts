import { ProviderManager } from "../ProviderManager";

export const handleScraperFailed = async (providerManager: ProviderManager, providerName: string): Promise<void> => {
  providerManager.setAlertOnTabClose(providerName, false);
  providerManager.closeTab(providerName);
};
