export const sendHighlightTab = (departureFlightId: string, returnFlightId: string): void => {
  chrome.runtime.sendMessage({
    event: "HIGHLIGHT_TAB",
    selectedDepartureId: departureFlightId,
    selectedReturnId: returnFlightId,
  });
};
