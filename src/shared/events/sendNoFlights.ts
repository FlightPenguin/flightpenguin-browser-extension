export function sendNoFlightsEvent(providerName: string, searchType: "DEPARTURE" | "RETURN" | "BOTH") {
  chrome.runtime.sendMessage({
    event: "NO_FLIGHTS_FOUND",
    provider: providerName,
    searchType: searchType,
  });
}
