export const sendItineraryNotFound = (id: string): void => {
  chrome.runtime.sendMessage({
    event: "ITINERARY_NOT_FOUND",
    id,
  });
};
