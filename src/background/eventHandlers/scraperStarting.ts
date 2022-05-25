import { ProviderManager } from "../ProviderManager";

export const handleScraperStarting = async (providerManager: ProviderManager, providerName: string): Promise<void> => {
  providerManager.setParsing(providerName);
};
