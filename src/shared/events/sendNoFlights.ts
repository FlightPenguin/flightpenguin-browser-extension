import * as browser from "webextension-polyfill";

export const sendNoFlightsEvent = (providerName: string): void => {
  browser.runtime.sendMessage({
    event: "NO_FLIGHTS_FOUND",
    provider: providerName,
  });
};
