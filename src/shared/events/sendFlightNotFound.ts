export const sendFlightNotFound = (id: string): void => {
  chrome.runtime.sendMessage({
    event: "FLIGHT_NOT_FOUND",
    id,
  });
};
