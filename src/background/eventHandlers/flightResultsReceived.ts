import { makeItins, sortFlights } from "../../dataModels";
import { UnprocessedFlightSearchResult } from "../../shared/types/UnprocessedFlightSearchResult";
import { ProviderManager } from "../ProviderManager";

export const handleFlightResultsReceived = (
  providerManager: ProviderManager,
  flights: UnprocessedFlightSearchResult[],
  providerName: string,
): undefined | void => {
  if (flights.length === 0) {
    console.debug("Received flight results... but the list was empty");
    return; // TODO: Enhance
  }

  const windowId = providerManager.getWindowId(providerName);
  const tabId = providerManager.getTabId(providerName);
  if (windowId === null || windowId === undefined || tabId === null || tabId === undefined) {
    console.debug("No windows available in flight results");
    return; // TODO: Better handle
  }

  const { itineraries: existingItineraries, version: existingItinerariesVersion } = providerManager.getItineraries();
  const existingDepartures = providerManager.getDepartures();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
    providerManager.setPartialReturn(providerName, "DEPARTURE");
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
    console.debug("Retrying processing of received flight results...");
    return handleFlightResultsReceived(providerManager, flights, providerName);
  }
};
