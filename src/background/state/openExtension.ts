import * as Sentry from "@sentry/browser";
import * as browser from "webextension-polyfill";

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
  Sentry.addBreadcrumb({
    category: "extension",
    message: "Focused extension",
    level: Sentry.Severity.Debug,
  });
};

const handleExtensionNotOpen = async () => {
  const url = browser.runtime.getURL("./index.html");
  await browser.tabs.create({ url });
  Sentry.addBreadcrumb({
    category: "extension",
    message: "Opened extension",
    level: Sentry.Severity.Debug,
  });
};

const updateExtensionIfRequired = async () => {
  const [status, details] = await browser.runtime.requestUpdateCheck();
  if (status === "update_available") {
    console.debug(details);
    browser.runtime.reload();
  }
};
