import { ProviderManager } from "../ProviderManager";

export const handleIndexUnloaded = (providerManager: ProviderManager): void => {
  if (providerManager.getFormData()) {
    providerManager.closeWindows();
  }
};
