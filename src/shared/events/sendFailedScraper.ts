export function sendFailedScraper(providerName: string, error: Error) {
  chrome.runtime.sendMessage({
    event: "FAILED_SCRAPER",
    source: providerName,
    description: `${error.name} ${error.message}`,
  });
}
