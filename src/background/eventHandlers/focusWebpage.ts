import { ProviderManager } from "../ProviderManager";

export const handleFocusWebpage = async (providerManager: ProviderManager): Promise<void> => {
  await providerManager.setPrimaryTabAsFocus();
};
