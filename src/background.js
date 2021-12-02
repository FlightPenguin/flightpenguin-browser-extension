Sentry.init({
  dsn: "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451",
});
// debugger and console logs can be seen by clicking background.js link for this extension under chrome://extensions,
// it will open a developer console for this extension and in addition to logs you can see the local storage

import {
  handleClearSelections,
  handleDepartureSelected,
  handleFlightResultsReceived,
  handleFlightReturnResultsReceived,
  handleFocusWebpage,
  handleFormDataReceived,
  handleHighlightTab,
  handleIndexUnloaded,
  handleNoFlightsFound,
  handleOpenExtensionRequest,
  handleProviderReady,
  handleScraperFailed,
  handleScraperSuccess,
  handleUpdateRequest,
} from "./background/eventHandlers";
import { ProviderManager } from "./background/ProviderManager";
import {
  ExtensionInstalledHandler,
  ExtensionOpenedHandler,
  ExtensionUninstalledHandler,
  ExtensionUpdateAvailableHandler,
} from "./background/state";

ExtensionUninstalledHandler();
ExtensionInstalledHandler();
ExtensionOpenedHandler();

const providerManager = new ProviderManager();

ExtensionUpdateAvailableHandler(providerManager);

chrome.runtime.onMessage.addListener(async function (message, sender, reply) {
  console.debug(message);
  switch (message.event) {
    case "FORM_DATA_RECEIVED":
      handleFormDataReceived(providerManager, message.formData, message.windowConfig);
      break;
    case "NO_FLIGHTS_FOUND":
      handleNoFlightsFound(providerManager, message.provider, message.searchType);
      break;
    case "SUCCESSFUL_SCRAPER":
      handleScraperSuccess(providerManager, message.providerName, message.searchType);
      break;
    case "FAILED_SCRAPER":
      handleScraperFailed(
        providerManager,
        message.providerName,
        message.description,
        message.searchType,
        message.windowConfig,
      );
      break;
    case "FLIGHT_RESULTS_RECEIVED":
      handleFlightResultsReceived(providerManager, message.flights, message.provider);
      break;
    case "RETURN_FLIGHTS_RECEIVED":
      handleFlightReturnResultsReceived(providerManager, message.flights, message.provider);
      break;
    case "DEPARTURE_SELECTED":
      handleDepartureSelected(providerManager, message.departureId);
      break;
    case "HIGHLIGHT_TAB":
      handleHighlightTab(providerManager, message.selectedDepartureId, message.selectedReturnId);
      break;
    case "PROVIDER_READY":
      handleProviderReady(providerManager, message.provider);
      break;
    case "FOCUS_WEBPAGE":
      handleFocusWebpage(providerManager);
      break;
    case "CLEAR_SELECTIONS":
      handleClearSelections(providerManager);
      break;
    case "INDEX_UNLOAD":
      handleIndexUnloaded(providerManager);
      break;
    case "UPDATE_NOW":
      handleUpdateRequest();
      break;
    case "OPEN_EXTENSION":
      await handleOpenExtensionRequest(sender);
      break;
    default:
      window.Sentry.captureException(new Error(message));
      console.error(message);
      break;
  }
});
