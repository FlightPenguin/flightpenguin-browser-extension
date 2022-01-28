export const sendScraperComplete = (providerName: string, searchType: "DEPARTURE" | "RETURN" | "BOTH"): void => {
  chrome.runtime.sendMessage({
    event: "SUCCESSFUL_SCRAPER",
    searchType: searchType,
    providerName: providerName,
  });
};
