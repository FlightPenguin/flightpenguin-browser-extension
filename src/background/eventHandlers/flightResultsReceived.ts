import { makeItins, sortFlights } from "../../dataModels";
import { Flight } from "../../shared/types/Flight";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { ProviderManager } from "../ProviderManager";

export const handleFlightResultsReceived = (
  providerManager: ProviderManager,
  flights: Flight[],
  providerName: string,
) => {
  // if (departureSelected) {
  //   break;
  // } // WHY?!?
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
  const { departures, itins: itineraries } = makeItins(
    flights,
    providerManager.getDepartures(),
    providerManager.getItineraries(),
    providerName,
    windowId,
    tabId,
  );

  providerManager.setItineraries({ ...itineraries });
  providerManager.setDepartures({ ...departures });

  const allDepartures = providerManager.getDepartures();
  const allItineraries = providerManager.getItineraries();

  const departuresToSend = sortFlights(allDepartures, allItineraries);

  const nextMessage = {
    event: "FLIGHT_RESULTS_FOR_CLIENT",
    flights: {
      departureList: departuresToSend,
      itins: allItineraries,
    },
    tabId: tabId,
    formData: providerManager.getFormData(),
  };
  providerManager.sendMessageToIndexPage(nextMessage);
};
