import { makeItins, sortFlights } from "../../dataModels";
import { UnprocessedFlightSearchResult } from "../../shared/types/UnprocessedFlightSearchResult";
import { ProviderManager } from "../ProviderManager";

export const handleFlightReturnResultsReceived = (
  providerManager: ProviderManager,
  flights: UnprocessedFlightSearchResult[],
  providerName: string,
): undefined | void => {
  // for providers that show returns separate from departures,
  // and only once you select a departure.
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
  const { returns, itins: itineraries } = makeItins(
    flights,
    existingDepartures,
    existingItineraries,
    providerName,
    windowId,
    tabId,
    true,
  );

  const allItins = { ...existingItineraries, ...itineraries };
  const setSuccessful = providerManager.setItineraries(allItins, existingItinerariesVersion);
  if (setSuccessful) {
    const returnList = sortFlights(Object.values(returns), allItins); // TODO dedup returns
    providerManager.addReturns(returnList);

    const nextMessage = {
      event: "RETURN_FLIGHTS_FOR_CLIENT",
      flights: {
        returnList: providerManager.getReturns(),
        itins: itineraries,
      },
    };

    providerManager.sendMessageToIndexPage(nextMessage);
  } else {
    return handleFlightReturnResultsReceived(providerManager, flights, providerName);
  }
};
