import * as Sentry from "@sentry/browser";

import { Itinerary, ItineraryInput } from "../../shared/types/Itinerary";
import { ProviderManager } from "../ProviderManager";

export const handleItineraryResultsReceived = async (
  providerManager: ProviderManager,
  itinerariesInputs: ItineraryInput[],
  providerName: string,
): Promise<undefined | void> => {
  if (itinerariesInputs.length === 0) {
    console.debug("Received flight results... but the list was empty");
    return; // TODO: Enhance
  }

  const newItineraries = itinerariesInputs.map((input) => {
    return new Itinerary(input);
  });
  newItineraries.forEach((itinerary) => providerManager.addItinerary(itinerary));

  const tabId = providerManager.getTabId(providerName);
  if (tabId === null || tabId === undefined) {
    console.debug("No windows available in flight results");

    Sentry.captureMessage(`No window found for ${providerName}`);
    return; // TODO: Better handle
  }

  await providerManager.sendTripResultsToIndexPage();
};
