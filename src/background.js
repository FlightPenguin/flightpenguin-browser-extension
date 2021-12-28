import { ListenerManager } from "./background/ListenerManager";

window.Sentry.init({
  dsn: process.env.SENTRY_DSN,
});
// debugger and console logs can be seen by clicking background.js link for this extension under chrome://extensions,
// it will open a developer console for this extension and in addition to logs you can see the local storage

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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.Sentry.captureException(error);
  console.error(error);
}
