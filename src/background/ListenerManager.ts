import * as browser from "webextension-polyfill";

import { AnalyticsManager } from "./AnalyticsManager";
import {
  handleClearSelections,
  handleFocusWebpage,
  handleFormDataReceived,
  handleIndexUnloaded,
  handleItineraryNotFound,
  handleItineraryResultsReceived,
  handleLogAnalyticsEvent,
  handleLogAnalyticsPageView,
  handleLogAnalyticsUserIdentified,
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

export const ListenerManager = (providerManager: ProviderManager, analyticsManager: AnalyticsManager): void => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // seriously, screw this maintainer: https://github.com/Lusito/webextension-polyfill-ts/issues/54
  browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    sendResponse({ received: true, responderName: "background" });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Sentry.addBreadcrumb({
      category: "extension",
      message: "Received message",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      level: Sentry.Severity.Debug,
      data: message,
    });
    console.debug(message);
    switch (message.event) {
      case "FORM_DATA_RECEIVED":
        await handleFormDataReceived(providerManager, message.formData, message.windowConfig);
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
      case "LOG_ANALYTICS_EVENT":
        handleLogAnalyticsEvent(analyticsManager, message);
        break;
      case "LOG_ANALYTICS_USER_IDENTIFIED":
        handleLogAnalyticsUserIdentified(analyticsManager, message);
        break;
      case "LOG_ANALYTICS_PAGE_VIEW":
        handleLogAnalyticsPageView(analyticsManager, message);
        break;
      case "OPEN_EXTENSION":
        await handleOpenExtensionRequest(sender);
        break;
      case "UNDOMINATE_TRIP":
        handleUndominateTrip(providerManager, message.tripId);
        break;
      default:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.Sentry.captureException(new Error(message));
        console.error(message);
        break;
    }
  });
};
