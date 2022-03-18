export const sendScraperComplete = (providerName: string): void => {
  chrome.runtime.sendMessage({
    event: "SUCCESSFUL_SCRAPER",
    providerName: providerName,
  });
};
