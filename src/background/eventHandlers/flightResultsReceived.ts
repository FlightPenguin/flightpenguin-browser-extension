import { makeItins, sortFlights } from "../../dataModels";
import { UnprocessedFlightSearchResult } from "../../shared/types/UnprocessedFlightSearchResult";
import { ProviderManager } from "../ProviderManager";

export const handleFlightResultsReceived = (
  providerManager: ProviderManager,
  flights: UnprocessedFlightSearchResult[],
  providerName: string,
): undefined | void => {
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
        returnList: sortFlights(providerManager.getReturns(), updatedItineraries),
        updatedAt: new Date(),
      },
      formData: providerManager.getFormData(),
    };
    providerManager.sendMessageToIndexPage(nextMessage);
  } else {
    return handleFlightResultsReceived(providerManager, flights, providerName);
  }
};
