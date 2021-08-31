export const sendSelectedFlight = (flightType: "DEPARTURE" | "RETURN", flightId: string): void => {
  if (flightType === "DEPARTURE") {
    chrome.runtime.sendMessage({
      event: `${flightType.toUpperCase()}_SELECTED`,
      departureId: flightId,
    });
  }
};
