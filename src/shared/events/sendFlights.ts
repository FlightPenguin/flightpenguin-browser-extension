export function sendFlightsEvent(providerName: string, flights: any) {
  chrome.runtime.sendMessage({
    event: "FLIGHT_RESULTS_RECEIVED",
    flights: flights,
    provider: providerName,
  });
}
