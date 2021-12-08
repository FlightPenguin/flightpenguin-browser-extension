import { findReturnFlights, sortFlights } from "../../dataModels";
import { PROVIDERS_NEEDING_RETURNS } from "../constants";
import { ProviderManager } from "../ProviderManager";

export const handleDepartureSelected = (providerManager: ProviderManager, departureId: string) => {
  if (!providerManager.getFormData()?.roundtrip) {
    return;
  }

  const departure = providerManager.getDeparture(departureId);
  /*
     itin needs to be set to {} for Southwest
     Southwest allItins ids includes return id because we know that info
     but message.departureId is still just departure id.
  */
  const { itineraries } = providerManager.getItineraries();
  const departureItineraries = departure.itinIds.flatMap((itinId: string) => itineraries[itinId]);
  const departureProviders = departureItineraries.map((itinerary: any) => itinerary.provider);
  providerManager.setSelectedProviders(departureProviders);

  if (hasReturnProviders(departureProviders)) {
    requestNoRoundtripProviderReturns(departure, providerManager, departureProviders, departureItineraries);
  } else {
    getRoundtripProviderReturns(departure, providerManager);
  }
};

const hasReturnProviders = (departureProviders: string[]) => {
  return PROVIDERS_NEEDING_RETURNS.some((providerName: string) => departureProviders.includes(providerName));
};

const requestNoRoundtripProviderReturns = (
  departure: any,
  providerManager: ProviderManager,
  departureProviders: any[],
  departureItineraries: any[],
) => {
  for (const providerName of departureProviders) {
    const tabId = providerManager.getTabId(providerName);
    if (tabId !== null && tabId !== undefined) {
      chrome.tabs.sendMessage(
        tabId,
        {
          event: "GET_RETURN_FLIGHTS",
          departure,
          itin: departureItineraries[departureProviders.indexOf(providerName)],
        },
        (response) => {
          if (!response || !response.received) {
            providerManager.setFailed(providerName, "RETURN");
            providerManager.sendMessageToIndexPage({
              event: "SCRAPER_COMPLETE",
              providerName: providerName,
              status: "FAILED",
            });
            providerManager.closeWindow(providerName);
            if (providerManager.isComplete("RETURN")) {
              providerManager.sendMessageToIndexPage({ event: "SCRAPING_COMPLETED", searchType: "RETURN" }, 3000);
            }
          }
        },
      );
    }
  }
};

const getRoundtripProviderReturns = (departure: any, providerManager: ProviderManager) => {
  const { itineraries } = providerManager.getItineraries();
  const returnList = sortFlights(
    findReturnFlights(departure, itineraries),
    itineraries,
    providerManager.getFormCabinValue(),
  );
  providerManager.addReturns(returnList);

  const message = {
    event: "RETURN_FLIGHTS_FOR_CLIENT",
    flights: {
      departureList: sortFlights(providerManager.getDepartures(), itineraries, providerManager.getFormCabinValue()),
      returnList: providerManager.getReturns(),
      itins: itineraries,
      updatedAt: new Date(),
    },
    formData: providerManager.getFormData(),
  };
  providerManager.sendMessageToIndexPage(message);
  providerManager.sendMessageToIndexPage({ event: "SCRAPING_COMPLETED", searchType: "RETURN" }, 3000);
};
