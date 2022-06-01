import * as browser from "webextension-polyfill";

import { openExtension } from "../state/openExtension";

export const handleOpenExtensionRequest = async (sender: browser.Runtime.MessageSender): Promise<void> => {
  console.debug("User requested extension load");
  await openExtension();

  const tab = sender.tab;
  if (tab && tab.id !== undefined) {
    await browser.tabs.remove(tab.id);
  }
};
