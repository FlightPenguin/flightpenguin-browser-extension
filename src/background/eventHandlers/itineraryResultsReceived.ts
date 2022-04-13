import { Itinerary, ItineraryInput } from "../../shared/types/Itinerary";
import { ProviderManager } from "../ProviderManager";
import { sendTripResultsToClient } from "./utilities/sendTripResultsToClient";

export const handleItineraryResultsReceived = (
  providerManager: ProviderManager,
  itinerariesInputs: ItineraryInput[],
  providerName: string,
): undefined | void => {
  if (itinerariesInputs.length === 0) {
    console.debug("Received flight results... but the list was empty");
    return; // TODO: Enhance
  }

  const newItineraries = itinerariesInputs.map((input) => {
    return new Itinerary(input);
  });
  newItineraries.forEach((itinerary) => providerManager.addItinerary(itinerary));

  const windowId = providerManager.getWindowId(providerName);
  const tabId = providerManager.getTabId(providerName);
  if (windowId === null || windowId === undefined || tabId === null || tabId === undefined) {
    console.debug("No windows available in flight results");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.Sentry.captureMessage(`No window found for ${providerName}`);
    return; // TODO: Better handle
  }

  providerManager.sendTripResultsToIndexPage();
};
