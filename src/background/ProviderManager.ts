import { getUrl as getExpediaUrl } from "../expedia/mappings/getUrl";
import { pause } from "../shared/pause";
import { FlightSearchFormData } from "../shared/types/FlightSearchFormData";
import { WindowConfig } from "../shared/types/WindowConfig";
import { getUrl as getSkyscannerUrl } from "../skyscanner/mappings/getUrl";
import { getUrl as getSouthwestUrl } from "../southwest/mappings/getUrl";
import { DEFAULT_ON_READY_FUNCTION, PROVIDERS_SUPPORTING_POINTS_SEARCH, SUPPORTED_PROVIDERS } from "./constants";
import { isExtensionOpen } from "./state/isExtensionOpen";

interface ProviderState {
  status: "PENDING" | "PARTIAL_RETURN_CONTINUING" | "FAILED" | "SUCCESS";
  tab?: chrome.tabs.Tab;
  window?: chrome.windows.Window;
  flightCount: number;
  ready: boolean;
  onReady: () => void;
  timer: ReturnType<typeof setTimeout> | null;
}

const terminalStates = ["FAILED", "SUCCESS"];
const successStates = ["SUCCESS"];

const providerURLBaseMap: { [key: string]: (formData: FlightSearchFormData) => string } = {
  southwest: getSouthwestUrl,
  skyscanner: getSkyscannerUrl,
  expedia: getExpediaUrl,
};

export class ProviderManager {
  private knownProviders: string[];
  private state: { [key: string]: ProviderState };
  private primaryTab: chrome.tabs.Tab | null;
  private itineraries: any;
  private departures: any;
  private returns: any;
  private formData: FlightSearchFormData | null;

  constructor() {
    this.knownProviders = [];
    this.state = {};

    this.itineraries = {};
    this.departures = {};
    this.returns = [];

    this.formData = null;
    this.primaryTab = null;
    this.setPrimaryTab();
    this.setupClosePrimaryTabListener();
  }

  setupClosePrimaryTabListener() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    chrome.tabs.onRemoved.addListener(function (tabId: number) {
      if (tabId === that.getPrimaryTabId()) {
        that.closeWindows();
      }
    });
  }

  getPrimaryTabId() {
    return this.primaryTab?.id;
  }

  getPrimaryTabIndex() {
    return this.primaryTab?.index;
  }

  getPrimaryWindowId() {
    return this.primaryTab?.windowId;
  }

  setFormData(formData: FlightSearchFormData) {
    this.formData = formData;
    this.knownProviders = this.formData.searchByPoints ? PROVIDERS_SUPPORTING_POINTS_SEARCH : SUPPORTED_PROVIDERS;
    this.setDefault();
  }

  getFormData() {
    return this.formData;
  }

  setPending(providerName: string) {
    this.state[providerName]["status"] = "PENDING";
    this.setFlightCount(providerName, 0);
  }

  setFailed(providerName: string, flightCount = 0) {
    this.state[providerName]["status"] = "FAILED";
    this.setFlightCount(providerName, flightCount);
  }

  setSuccessful(providerName: string, flightCount: number) {
    this.state[providerName]["status"] = "SUCCESS";
    this.setFlightCount(providerName, flightCount);
  }

  setPartialReturn(providerName: string, flightCountBatchSize: number) {
    this.state[providerName]["status"] = "PARTIAL_RETURN_CONTINUING";
    const currentCount = this.getFlightCount(providerName);
    return currentCount + flightCountBatchSize;
  }

  getStatus(providerName: string) {
    return this.state[providerName]["status"];
  }

  isProviderComplete(providerName: string) {
    const status = this.getStatus(providerName);
    return terminalStates.includes(status);
  }

  isComplete() {
    return this.knownProviders.every((providerName) => {
      this.isProviderComplete(providerName);
    });
  }

  isProviderSuccessful(providerName: string) {
    const status = this.getStatus(providerName);
    return successStates.includes(status);
  }

  isSuccessful() {
    return this.knownProviders.every((providerName) => {
      this.isProviderSuccessful(providerName);
    });
  }

  getItineraries() {
    return this.itineraries;
  }

  addItineraries(itineraries: any) {
    itineraries.entries().forEach((key: any, value: any) => {
      this.itineraries[key] = value;
    });
  }

  setItineraries(itineraries: any) {
    this.itineraries = itineraries;
  }

  getDepartures() {
    return this.departures;
  }

  getDeparture(departureId: string) {
    return this.departures[departureId];
  }

  addDepartures(departures: any) {
    departures.entries().forEach((key: any, value: any) => {
      this.departures[key] = value;
    });
  }

  setDepartures(departures: any) {
    this.departures = departures;
  }

  getReturns() {
    return this.returns;
  }

  addReturns(returns: any) {
    returns.entries().forEach((key: any, value: any) => {
      this.returns[key] = value;
    });
  }

  setReturns(returns: any) {
    this.returns = returns;
  }

  setFlightCount(providerName: string, flightCount: number) {
    this.state[providerName]["flightCount"] = flightCount;
  }

  getFlightCount(providerName: string) {
    return this.state[providerName]["flightCount"];
  }

  setReady(providerName: string, value: boolean) {
    this.state[providerName].ready = value;
  }

  getReady(providerName: string) {
    return this.state[providerName].ready;
  }

  setOnReady(providerName: string, callback: () => void) {
    this.state[providerName].onReady = callback;
  }

  getOnReady(providerName: string) {
    return this.state[providerName].onReady;
  }

  setDefault() {
    this.knownProviders.forEach((providerName) => {
      this.state[providerName] = {
        status: "PENDING",
        flightCount: 0,
        ready: true,
        onReady: DEFAULT_ON_READY_FUNCTION,
        timer: null,
      };
    });
    this.itineraries = {};
    this.departures = {};
    this.returns = [];
  }

  setTimer(providerName: string, timeout: number, callback: () => void) {
    this.state[providerName].timer = setTimeout(callback, timeout);
  }

  getTimer(providerName: string) {
    return this.state[providerName].timer;
  }

  clearTimeout(providerName: string) {
    const timer = this.state[providerName].timer;
    if (timer) {
      clearTimeout(timer);
      this.state[providerName].timer = null;
    }
  }

  setTab(providerName: string, tab: chrome.tabs.Tab) {
    this.state[providerName]["tab"] = tab;
  }

  setWindow(providerName: string, window: chrome.windows.Window) {
    this.state[providerName]["window"] = window;
  }

  getTabId(providerName: string) {
    return this.state[providerName].tab?.id;
  }

  getTabIndex(providerName: string) {
    return this.state[providerName].tab?.index;
  }

  getWindowId(providerName: string) {
    return this.state[providerName].window?.id;
  }

  setPrimaryTab() {
    isExtensionOpen({
      extensionOpenCallback: (tab) => {
        this.primaryTab = tab;
      },
      extensionClosedCallback: () => {
        // Simpler than polling for status...
        pause(500).then(() => {
          this.setPrimaryTab();
        });
      },
    });
  }

  createWindow(url: string, provider: string, windowConfig: WindowConfig, formData: FlightSearchFormData) {
    const { height, width, left, top } = windowConfig;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    return new Promise<void>((resolve) => {
      chrome.windows.create({ url, focused: false, height, width, left, top }, async (window) => {
        if (window && window.tabs && that.primaryTab?.windowId) {
          // update again for chrome on windows, to move results window to foreground
          chrome.windows.update(that.primaryTab.windowId, { focused: true });

          that.setTab(provider, window.tabs[0]);
          that.setWindow(provider, window);

          chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
            if (info.status === "complete" && tabId === that.getTabId(provider)) {
              chrome.tabs.onUpdated.removeListener(listener);
              chrome.tabs.sendMessage(tabId, { event: "BEGIN_PARSING", formData });
              resolve();
            }
          });
        } else {
          throw new Error("Unable to create window - no window!");
        }
      });
    });
  }

  closeWindow(providerName: string) {
    const windowId = this.getWindowId(providerName);
    if (windowId) {
      chrome.windows.remove(windowId);
    }
  }

  closeWindows() {
    this.knownProviders.forEach((providerName) => {
      this.closeWindow(providerName);
    });
  }

  searchForResults(formData: FlightSearchFormData, windowConfig: WindowConfig) {
    this.setFormData(formData);
    const primaryTabId = this?.primaryTab?.id;
    if (primaryTabId) {
      const promises = this.knownProviders.map((provider) => {
        const url = providerURLBaseMap[provider](formData);
        // Open url in a new window.
        // Not a new tab because we can't read results from inactive tabs (browser powers down inactive tabs).
        return this.createWindow(url, provider, windowConfig, formData);
      });

      Promise.all(promises).then(() => {
        // update again for chrome on windows, to move results window to foreground
        chrome.windows.update(primaryTabId, { focused: true });
      });
    }
  }

  getTotalFlightCount() {
    if (!this.isComplete()) {
      return null;
    }
    let total = 0;
    this.knownProviders.forEach((providerName) => {
      total += this.getFlightCount(providerName);
    });
    return total;
  }

  sendMessageToIndexPage(message: any) {
    if (this.primaryTab?.id) {
      chrome.tabs.sendMessage(this.primaryTab.id, message);
    }
  }
}
