import { ProviderManager } from "../ProviderManager";

export const handleIndexUnloaded = async (providerManager: ProviderManager): Promise<void> => {
  if (providerManager.getFormData()) {
    await providerManager.closeTabs();
  }
};
