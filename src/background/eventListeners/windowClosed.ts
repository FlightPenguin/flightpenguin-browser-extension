import * as browser from "webextension-polyfill";

import { ProviderManager } from "../ProviderManager";

export const initWindowClosedListener = (providerManager: ProviderManager): void => {
  browser.windows.onRemoved.addListener(async (windowId: number) => {
    console.debug(`Window ${windowId} closed`);
    const results = providerManager.getProviderByWindowId(windowId);
    if (results?.providerName && providerManager.getAlertOnWindowClose(results.providerName)) {
      console.debug(`window for ${results.providerName} closed`);
      providerManager.setAlertOnWindowClose(results.providerName, true);
      await providerManager.sendMessageToIndexPage({
        event: "WINDOW_CLOSED",
        providerName: results.providerName,
        status: "FAILED",
      });
    }
  });
};
