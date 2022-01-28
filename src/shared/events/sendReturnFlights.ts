export const sendReturnFlightsEvent = (providerName: string, flights: any): void => {
  console.debug(`Sending ${flights.length} return flights from ${providerName}`);
  chrome.runtime.sendMessage({
    event: "RETURN_FLIGHTS_RECEIVED",
    flights: flights,
    provider: providerName,
  });
};
