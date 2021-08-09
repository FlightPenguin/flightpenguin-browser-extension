export function sendNoFlightsEvent(providerName: string) {
  chrome.runtime.sendMessage({
    event: "NO_FLIGHTS_FOUND",
    provider: providerName,
  });
}
