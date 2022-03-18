import { WindowConfig } from "../types/WindowConfig";

export const sendFailedScraper = (providerName: string, error: Error): void => {
  const windowConfig: WindowConfig = {
    height: window.outerHeight,
    width: window.outerWidth,
    left: window.screenX,
    top: window.screenY,
  };
  chrome.runtime.sendMessage({
    event: "FAILED_SCRAPER",
    providerName: providerName,
    description: `${error.name} ${error.message}`,
    windowConfig,
  });
};
