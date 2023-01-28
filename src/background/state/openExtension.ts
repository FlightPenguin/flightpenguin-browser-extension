import * as browser from "webextension-polyfill";

import { isChromeExtension } from "../../shared/utilities/isChromeExtension";
import { focusTab } from "../../shared/utilities/tabs/focusTab";
import { isExtensionOpen } from "./isExtensionOpen";

export const openExtension = async (): Promise<void> => {
  await disableExtension();
  await isExtensionOpen({
    extensionOpenCallback: handleExtensionOpen,
    extensionClosedCallback: handleExtensionNotOpen,
  });
  await enableExtension();
  await updateExtensionIfRequired();
};

const disableExtension = async (): Promise<void> => {
  await browser.browserAction.disable();
};

const enableExtension = async (): Promise<void> => {
  browser.browserAction.enable();
};

const handleExtensionOpen = async (tab: browser.Tabs.Tab): Promise<void> => {
  await focusTab(tab);
};

const handleExtensionNotOpen = async () => {
  const url = browser.runtime.getURL("./index.html");
  await browser.tabs.create({ url });
};

const updateExtensionIfRequired = async () => {
  if (isChromeExtension()) {
    const [status, details] = await browser.runtime.requestUpdateCheck();
    if (status === "update_available") {
      console.debug(details);
      browser.runtime.reload();
    }
  }
};
