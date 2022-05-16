import * as browser from "webextension-polyfill";

import { WindowConfig } from "../../shared/types/WindowConfig";
import { ProviderManager } from "../ProviderManager";

export const handleScraperFailed = (
  providerManager: ProviderManager,
  providerName: string,
  errorDescription: string,
  windowConfig: WindowConfig,
  sender: browser.Runtime.MessageSender,
  close = true,
): void => {
  providerManager.setFailed(providerName);
  const isRetrying = providerManager.retry(providerName, windowConfig);
  if (!isRetrying) {
    if (close) {
      providerManager.closeWindow(providerName);
    }

    if (providerManager.isComplete()) {
      providerManager.sendMessageToIndexPage({ event: "SCRAPING_STATUS", complete: true }, 3000);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.Sentry.captureException(new Error(`Scraper failed for ${providerName}`), {
      extra: providerManager.getFormData(),
      details: errorDescription,
    });
  }
};
