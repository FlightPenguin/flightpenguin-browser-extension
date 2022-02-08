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

  const filteredFlights = flights.filter(
    (flight) =>
      flight.departureFlight?.operatingAirlineDetails?.display !== "WN" &&
      flight.departureFlight?.marketingAirlineDetails?.display !== "WN",
  );

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
    filteredFlights,
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

    const departuresToSend = sortFlights(updatedDepartures, updatedItineraries, providerManager.getFormCabinValue());

    const nextMessage = {
      event: "FLIGHT_RESULTS_FOR_CLIENT",
      flights: {
        departureList: departuresToSend,
        itins: updatedItineraries,
        returnList: sortFlights(providerManager.getReturns(), updatedItineraries, providerManager.getFormCabinValue()),
        updatedAt: new Date(),
      },
      meta: {
        departures: {
          airports: providerManager.getLayoverAirports("DEPARTURE"),
          airlines: providerManager.getAirlines("DEPARTURE"),
          layoverCounts: providerManager.getLayoverCounts("DEPARTURE"),
        },
        returns: {
          airports: providerManager.getLayoverAirports("RETURN"),
          airlines: providerManager.getAirlines("RETURN"),
          layoverCounts: providerManager.getLayoverCounts("RETURN"),
        },
      },
      formData: providerManager.getFormData(),
    };
    providerManager.sendMessageToIndexPage(nextMessage);
  } else {
    console.debug("Retrying processing of received flight results...");
    return handleFlightResultsReceived(providerManager, flights, providerName);
  }
};
