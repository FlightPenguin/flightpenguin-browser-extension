import * as browser from "webextension-polyfill";

import {
  handleClearSelections,
  handleFocusWebpage,
  handleFormDataReceived,
  handleIndexUnloaded,
  handleItineraryNotFound,
  handleItineraryResultsReceived,
  handleNoFlightsFound,
  handleOpenExtensionRequest,
  handleProviderReady,
  handleScraperFailed,
  handleScraperStarting,
  handleScraperSuccess,
  handleTripSelected,
  handleUndominateTrip,
  handleUpdateRequest,
} from "./eventHandlers";
import { ProviderManager } from "./ProviderManager";

export const ListenerManager = (providerManager: ProviderManager): void => {
  browser.runtime.onMessage.addListener(async (message, sender) => {
    console.debug(message);
    switch (message.event) {
      case "FORM_DATA_RECEIVED":
        await handleFormDataReceived(providerManager, message.formData);
        break;
      case "NO_FLIGHTS_FOUND":
        await handleNoFlightsFound(providerManager, message.provider);
        break;
      case "SUCCESSFUL_SCRAPER":
        await handleScraperSuccess(providerManager, message.providerName);
        break;
      case "STARTING_SCRAPER":
        await handleScraperStarting(providerManager, message.providerName);
        break;
      case "FAILED_SCRAPER":
        await handleScraperFailed(providerManager, message.providerName);
        break;
      case "ITINERARY_RESULTS":
        await handleItineraryResultsReceived(providerManager, message.itineraries, message.provider);
        break;
      case "TRIP_SELECTED":
        await handleTripSelected(providerManager, message.selectedTrips);
        break;
      case "ITINERARY_NOT_FOUND":
        await handleItineraryNotFound(providerManager, message.id);
        break;
      case "PROVIDER_READY":
        await handleProviderReady(providerManager, message.provider);
        break;
      case "FOCUS_WEBPAGE":
        await handleFocusWebpage(providerManager);
        break;
      case "CLEAR_SELECTIONS":
        await handleClearSelections(providerManager, message.currentSelections);
        break;
      case "INDEX_UNLOAD":
        await handleIndexUnloaded(providerManager);
        break;
      case "UPDATE_NOW":
        handleUpdateRequest();
        break;
      case "OPEN_EXTENSION":
        await handleOpenExtensionRequest(sender);
        break;
      case "UNDOMINATE_TRIP":
        handleUndominateTrip(providerManager, message.tripId);
        break;
      default:
        console.error(message);
        break;
    }
  });
};
