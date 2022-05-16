import * as browser from "webextension-polyfill";

import { getExtensionUrl } from "../../shared/utilities/getExtensionUrl";
import { getTabByUrl } from "../../shared/utilities/tabs/getTabByUrl";

interface Properties {
  extensionOpenCallback: (tab: browser.Tabs.Tab) => any;
  extensionClosedCallback: () => any;
}

export const isExtensionOpen = async ({
  extensionOpenCallback,
  extensionClosedCallback,
}: Properties): Promise<void> => {
  const url = getExtensionUrl();
  const tab = await getTabByUrl({ url });

  tab ? extensionOpenCallback(tab) : extensionClosedCallback();
};
