import * as browser from "webextension-polyfill";

export const sendScraperComplete = (providerName: string): void => {
  browser.runtime.sendMessage({
    event: "SUCCESSFUL_SCRAPER",
    providerName: providerName,
  });
};
