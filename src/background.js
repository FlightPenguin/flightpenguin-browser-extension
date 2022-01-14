window.Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: `${process.env.EXTENSION_ENV}`,
  release: `${process.env.SENTRY_PROJECT}@${process.env.VERSION}`,
});

// debugger and console logs can be seen by clicking background.js link for this extension under chrome://extensions,
// it will open a developer console for this extension and in addition to logs you can see the local storage

import { getUserInfo } from "./auth/index";
import { AnalyticsManager } from "./background/AnalyticsManager";
import { ListenerManager } from "./background/ListenerManager";
import { ProviderManager } from "./background/ProviderManager";
import {
  ExtensionInstalledHandler,
  ExtensionOpenedHandler,
  ExtensionUninstalledHandler,
  ExtensionUpdateAvailableHandler,
} from "./background/state";

try {
  const analyticsManager = new AnalyticsManager();

  ExtensionUninstalledHandler();
  ExtensionInstalledHandler(analyticsManager);
  ExtensionOpenedHandler(analyticsManager);

  const providerManager = new ProviderManager();
  ExtensionUpdateAvailableHandler(providerManager);
  ListenerManager(providerManager, analyticsManager);
} catch (error) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.Sentry.captureException(error);
  console.error(error);
}
