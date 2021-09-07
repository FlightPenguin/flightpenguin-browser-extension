export function sendFailedScraper(providerName: string, error: Error, searchType: "DEPARTURE" | "RETURN" | "ALL") {
  chrome.runtime.sendMessage({
    event: "FAILED_SCRAPER",
    searchType: searchType,
    providerName: providerName,
    description: `${error.name} ${error.message}`,
  });
}
