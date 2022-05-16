import * as browser from "webextension-polyfill";

interface GetTabInput {
  tabId: number;
  windowId: number;
}

export const getTab = async ({ tabId, windowId }: GetTabInput): Promise<browser.Tabs.Tab | null> => {
  const tabs = await browser.tabs.query({ windowId });
  if (tabs && tabs.length) {
    return tabs.filter((tab) => tab.id === tabId)[0] || null;
  }

  return null;
};
