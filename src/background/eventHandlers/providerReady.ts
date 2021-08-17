import { DEFAULT_ON_READY_FUNCTION } from "../constants";
import { ProviderManager } from "../ProviderManager";

export const handleProviderReady = (providerManager: ProviderManager, providerName: string) => {
  providerManager.setReady(providerName, true);

  const onReadyFunction = providerManager.getOnReady(providerName);
  onReadyFunction();
  providerManager.setOnReady(providerName, DEFAULT_ON_READY_FUNCTION);
};
