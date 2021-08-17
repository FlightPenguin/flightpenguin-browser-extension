import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { WindowConfig } from "../../shared/types/WindowConfig";
import { ProviderManager } from "../ProviderManager";

export const handleFormDataReceived = (
  providerManager: ProviderManager,
  formData: FlightSearchFormData,
  windowConfig: WindowConfig,
) => {
  formData = {
    ...formData,
    from: formData.from.toUpperCase(),
    to: formData.to.toUpperCase(),
  };
  providerManager.searchForResults(formData, windowConfig);
  // clean up incase user is doing a different search
  // closeWindows();
  // allDepartures = {};
  // allItins = {};
  // departureSelected = false;
  // messageQueue = [];
  // providersReceived = new Set();
  // failedProviders = new Set();
  // canHighlightSkyscannerTab = false;
  // returnList = [];
  // providersTimeoutIds = {};
  // isExpediaReady = true;
  // expediaMessage = null;
  //
  // if (webPageTabId) {
  //   chrome.tabs.sendMessage(webPageTabId, {
  //     event: "RESET_SEARCH",
  //     formData,
  //   });
  // }
};
