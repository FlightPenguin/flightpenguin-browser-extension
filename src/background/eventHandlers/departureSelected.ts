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
  const departureProviders = [...new Set(departureItineraries.map((itinerary: any) => itinerary.provider))] as string[];
  providerManager.setSelectedProviders(departureProviders);

  const { returnsIncluded: providersNotNeedingReturns, noReturnsIncluded: providersNeedingReturns } =
    getProvidersByType(departureProviders);

  let searching = false;

  if (providersNotNeedingReturns.length) {
    console.debug(`No need for scraping for returns, flights found from ${providersNotNeedingReturns}`);
    getRoundtripProviderReturns(departure, providerManager, providersNotNeedingReturns);
    searching = true;
  }
  if (providersNeedingReturns.length) {
    console.debug(`need to scrape for returns, flights found from ${providersNeedingReturns}`);
    requestNoRoundtripProviderReturns(departure, providerManager, providersNeedingReturns, departureItineraries);
    searching = true;
  }

  if (!searching) {
    const message = {
      event: "RETURN_FLIGHTS_FOR_CLIENT",
      flights: {
        departureList: sortFlights(
          providerManager.getDepartures(),
          providerManager.getItineraries(),
          providerManager.getFormCabinValue(),
        ),
        returnList: [],
        itins: providerManager.getItineraries(),
        updatedAt: new Date(),
      },
      formData: providerManager.getFormData(),
    };
    providerManager.sendMessageToIndexPage(message);
    providerManager.sendMessageToIndexPage({ event: "SCRAPING_COMPLETED", searchType: "RETURN" }, 3000);
  }
};

const getProvidersByType = (
  departureProviders: string[],
): { returnsIncluded: string[]; noReturnsIncluded: string[] } => {
  const returnsIncluded = [] as string[];
  const noReturnsIncluded = [] as string[];

  departureProviders.forEach((providerName) => {
    PROVIDERS_NEEDING_RETURNS.includes(providerName)
      ? noReturnsIncluded.push(providerName)
      : returnsIncluded.push(providerName);
  });
  return { returnsIncluded, noReturnsIncluded };
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

const getRoundtripProviderReturns = (
  departure: any,
  providerManager: ProviderManager,
  departureProviders: string[],
) => {
  const { itineraries } = providerManager.getItineraries();
  const filteredItineraries = Object.fromEntries(
    Object.entries(itineraries).filter(([id, itinerary]) => {
      return departureProviders.includes(itinerary.provider);
    }),
  );

  const returnList = sortFlights(
    findReturnFlights(departure, filteredItineraries),
    filteredItineraries,
    providerManager.getFormCabinValue(),
  );
  providerManager.addReturns(returnList);

  const message = {
    event: "RETURN_FLIGHTS_FOR_CLIENT",
    flights: {
      departureList: sortFlights(
        providerManager.getDepartures(),
        filteredItineraries,
        providerManager.getFormCabinValue(),
      ),
      returnList: providerManager.getReturns(),
      itins: filteredItineraries,
      updatedAt: new Date(),
    },
    formData: providerManager.getFormData(),
  };
  providerManager.sendMessageToIndexPage(message);
  providerManager.sendMessageToIndexPage({ event: "SCRAPING_COMPLETED", searchType: "RETURN" }, 3000);
};
