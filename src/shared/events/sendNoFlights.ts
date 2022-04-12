export const sendNoFlightsEvent = (providerName: string): void => {
  chrome.runtime.sendMessage({
    event: "NO_FLIGHTS_FOUND",
    provider: providerName,
  });
};
