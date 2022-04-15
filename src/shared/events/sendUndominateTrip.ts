export const sendUndominateTrip = (tripId: string): void => {
  chrome.runtime.sendMessage({
    event: `UNDOMINATE_TRIP`,
    tripId,
  });
};
