import { ProviderManager } from "../ProviderManager";

export const handleFocusWebpage = (providerManager: ProviderManager) => {
  providerManager.setPrimaryTabAsFocus();
};
