export const sendClearSelections = (departureFlightId: string, returnFlightId: string): void => {
  chrome.runtime.sendMessage({
    event: "CLEAR_SELECTIONS",
  });
};
