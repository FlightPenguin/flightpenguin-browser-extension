export const sendFlightsEvent = (providerName: string, flights: any[]): void => {
  console.debug(`Sending ${flights.length} departure flights from ${providerName}`);
  chrome.runtime.sendMessage({
    event: "FLIGHT_RESULTS_RECEIVED",
    flights: flights,
    provider: providerName,
  });
};
