import { ProviderManager } from "../ProviderManager";

export const handleScraperStarting = (providerManager: ProviderManager, providerName: string): void => {
  providerManager.setParsing(providerName);
};
