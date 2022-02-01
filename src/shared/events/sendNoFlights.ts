export const sendNoFlightsEvent = (providerName: string, searchType: "DEPARTURE" | "RETURN" | "BOTH"): void => {
  chrome.runtime.sendMessage({
    event: "NO_FLIGHTS_FOUND",
    provider: providerName,
    searchType: searchType,
  });
};
