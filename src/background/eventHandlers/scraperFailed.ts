import { ProviderManager } from "../ProviderManager";

export const handleScraperFailed = async (providerManager: ProviderManager, providerName: string): Promise<void> => {
  providerManager.setFailureReason(providerName, "ERROR");
  providerManager.closeWindow(providerName);
};
