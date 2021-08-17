import { makeItins, sortFlights } from "../../dataModels";
import { Flight } from "../../shared/types/Flight";
import { ProviderManager } from "../ProviderManager";

export const handleFlightReturnResultsReceived = (
  providerManager: ProviderManager,
  flights: Flight[],
  providerName: string,
) => {
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

  // @ts-ignore
  const { returns, itins: itineraries } = makeItins(
    flights,
    providerManager.getDepartures(),
    providerManager.getItineraries(),
    providerName,
    windowId,
    tabId,
    true,
  );
  const existingItineraries = providerManager.getItineraries();

  const allItins = { ...existingItineraries, ...itineraries };
  providerManager.setItineraries(allItins);

  const returnList = sortFlights(Object.values(returns), allItins); // TODO dedup returns
  providerManager.setReturns(returnList);

  const nextMessage = {
    event: "RETURN_FLIGHTS_FOR_CLIENT",
    flights: {
      returnList: providerManager.getReturns(),
      itins: itineraries,
    },
  };

  providerManager.sendMessageToIndexPage(nextMessage);
};
