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
  chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
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
        handleFormDataReceived(providerManager, message.formData, message.windowConfig);
        break;
      case "NO_FLIGHTS_FOUND":
        handleNoFlightsFound(providerManager, message.provider);
        break;
      case "SUCCESSFUL_SCRAPER":
        handleScraperSuccess(providerManager, message.providerName);
        break;
      case "STARTING_SCRAPER":
        handleScraperStarting(providerManager, message.providerName);
        break;
      case "FAILED_SCRAPER":
        handleScraperFailed(providerManager, message.providerName, message.description, message.windowConfig, sender);
        break;
      case "ITINERARY_RESULTS":
        handleItineraryResultsReceived(providerManager, message.itineraries, message.provider);
        break;
      case "TRIP_SELECTED":
        handleTripSelected(providerManager, message.selectedTrips);
        break;
      case "ITINERARY_NOT_FOUND":
        handleItineraryNotFound(providerManager, message.id);
        break;
      case "PROVIDER_READY":
        handleProviderReady(providerManager, message.provider);
        break;
      case "FOCUS_WEBPAGE":
        handleFocusWebpage(providerManager);
        break;
      case "CLEAR_SELECTIONS":
        handleClearSelections(providerManager, message.currentSelections);
        break;
      case "INDEX_UNLOAD":
        handleIndexUnloaded(providerManager);
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
