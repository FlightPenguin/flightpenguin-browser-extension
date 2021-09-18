export function sendReturnFlightsEvent(providerName: string, flights: any) {
  console.debug(`Sending ${flights.length} return flights from ${providerName}`);
  chrome.runtime.sendMessage({
    event: "RETURN_FLIGHTS_RECEIVED",
    flights: flights,
    provider: providerName,
  });
}
