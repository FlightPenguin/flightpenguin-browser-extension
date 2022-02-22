import { ProviderManager } from "../ProviderManager";
import { initWindowClosedListener } from "./windowClosed";

export const initEventListeners = (providerManager: ProviderManager) => {
  initWindowClosedListener(providerManager);
};
