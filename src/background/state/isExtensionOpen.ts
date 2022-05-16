import * as browser from "webextension-polyfill";

import { getExtensionUrl } from "../../shared/utilities/getExtensionUrl";

interface Properties {
  extensionOpenCallback: (tab: browser.Tabs.Tab) => any;
  extensionClosedCallback: () => any;
}

export const isExtensionOpen = async ({
  extensionOpenCallback,
  extensionClosedCallback,
}: Properties): Promise<void> => {
  const url = getExtensionUrl();
  const tabs = await browser.tabs.query({ url });
  if (tabs && tabs.length) {
    extensionOpenCallback(tabs[0]);
  } else {
    extensionClosedCallback();
  }
};
