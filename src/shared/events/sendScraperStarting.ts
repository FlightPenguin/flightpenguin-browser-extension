import * as browser from "webextension-polyfill";

export const sendScraperStarting = (providerName: string): void => {
  browser.runtime.sendMessage({
    event: "STARTING_SCRAPER",
    providerName: providerName,
  });
};
