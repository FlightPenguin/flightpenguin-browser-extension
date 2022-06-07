import * as browser from "webextension-polyfill";

interface GetTabInput {
  tabId: number;
}

export const getTab = async ({ tabId }: GetTabInput): Promise<browser.Tabs.Tab | null> => {
  try {
    return await browser.tabs.get(tabId);
  } catch {
    return null;
  }
};
