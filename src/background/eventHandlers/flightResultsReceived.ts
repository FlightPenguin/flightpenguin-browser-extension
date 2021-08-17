import { makeItins, sortFlights } from "../../dataModels";
import { pause } from "../../shared/pause";
import { Flight } from "../../shared/types/Flight";
import { ProviderManager } from "../ProviderManager";

export const handleFlightResultsReceived = (
  providerManager: ProviderManager,
  flights: Flight[],
  providerName: string,
): any => {
  if (flights.length === 0) {
    return; // TODO: Enhance
  }

  const windowId = providerManager.getWindowId(providerName);
  const tabId = providerManager.getTabId(providerName);
  if (windowId === null || windowId === undefined || tabId === null || tabId === undefined) {
    // TODO: Better handle
    return;
  }

  const { itineraries: existingItineraries, version: existingItinerariesVersion } = providerManager.getItineraries();
  const existingDepartures = providerManager.getDepartures();

  // @ts-ignore
  const { departures, itins: itineraries } = makeItins(
    flights,
    existingDepartures,
    existingItineraries,
    providerName,
    windowId,
    tabId,
  );

  const setSuccessful = providerManager.setItineraries({ ...itineraries }, existingItinerariesVersion);
  if (setSuccessful) {
    providerManager.setDepartures({ ...departures });

    const updatedDepartures = providerManager.getDepartures();
    const { itineraries: updatedItineraries } = providerManager.getItineraries();

    const departuresToSend = sortFlights(updatedDepartures, updatedItineraries);

    const nextMessage = {
      event: "FLIGHT_RESULTS_FOR_CLIENT",
      flights: {
        departureList: departuresToSend,
        itins: updatedItineraries,
      },
      tabId: tabId,
      formData: providerManager.getFormData(),
    };
    providerManager.sendMessageToIndexPage(nextMessage);
  } else {
    pause(100, 10, 50);
    return handleFlightResultsReceived(providerManager, flights, providerName);
  }
};
