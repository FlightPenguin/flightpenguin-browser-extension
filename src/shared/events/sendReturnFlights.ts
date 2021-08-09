export function sendReturnFlightsEvent(providerName: string, flights: any) {
  chrome.runtime.sendMessage({
    event: "RETURN_FLIGHTS_RECEIVED",
    flights: flights,
    provider: providerName,
  });
}
