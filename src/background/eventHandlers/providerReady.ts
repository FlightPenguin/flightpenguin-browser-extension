import { DEFAULT_ON_READY_FUNCTION } from "../constants";
import { ProviderManager } from "../ProviderManager";

export const handleProviderReady = async (providerManager: ProviderManager, providerName: string): Promise<void> => {
  providerManager.setReady(providerName, true);

  const onReadyFunction = providerManager.getOnReady(providerName);
  onReadyFunction();
  providerManager.setOnReady(providerName, DEFAULT_ON_READY_FUNCTION);
};
