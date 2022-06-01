import * as browser from "webextension-polyfill";

interface GetTabByUrlInput {
  url: string;
}

export const getTabByUrl = async ({ url }: GetTabByUrlInput): Promise<browser.Tabs.Tab | null> => {
  const tabs = await browser.tabs.query({ url });
  if (tabs && tabs.length) {
    return tabs[0];
  }

  return null;
};
