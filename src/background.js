import { ListenerManager } from "./background/ListenerManager";
import { ProviderManager } from "./background/ProviderManager";
import {
  ExtensionInstalledHandler,
  ExtensionOpenedHandler,
  ExtensionUninstalledHandler,
  ExtensionUpdateAvailableHandler,
} from "./background/state";

try {
  ExtensionUninstalledHandler();
  ExtensionInstalledHandler();
  ExtensionOpenedHandler();

  const providerManager = new ProviderManager();
  ExtensionUpdateAvailableHandler(providerManager);
  ListenerManager(providerManager);
} catch (error) {
  console.error(error);
}
