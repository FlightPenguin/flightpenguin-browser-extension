export const sendItinerariesEvent = (providerName: string, itineraries: any[]): void => {
  console.debug(`Sending ${itineraries.length} itineraries from ${providerName}`);
  chrome.runtime.sendMessage({
    event: "FLIGHT_RESULTS_RECEIVED",
    itineraries: itineraries,
    provider: providerName,
  });
};
