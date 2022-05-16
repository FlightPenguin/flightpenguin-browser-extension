export const sendScraperStarting = (providerName: string): void => {
  chrome.runtime.sendMessage({
    event: "STARTING_SCRAPER",
    providerName: providerName,
  });
};
