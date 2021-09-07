export function sendScraperComplete(providerName: string, searchType: "DEPARTURE" | "RETURN" | "BOTH") {
  chrome.runtime.sendMessage({
    event: "SUCCESSFUL_SCRAPER",
    searchType: searchType,
    providerName: providerName,
  });
}
