import { getUrl as getExpediaUrl } from "../expedia/mappings/getUrl";
import { pause } from "../shared/pause";
import { FlightSearchFormData } from "../shared/types/FlightSearchFormData";
import { Itinerary } from "../shared/types/Itinerary";
import { WindowConfig } from "../shared/types/WindowConfig";
import { getUrl as getSkyscannerUrl } from "../skyscanner/mappings/getUrl";
import { getUrl as getSouthwestUrl } from "../southwest/mappings/getUrl";
import { DEFAULT_ON_READY_FUNCTION, PROVIDERS_SUPPORTING_POINTS_SEARCH, SUPPORTED_PROVIDERS } from "./constants";
import { isExtensionOpen } from "./state";

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
  private itineraries: { [key: string]: Itinerary };
  private itinerariesVersion: number;
  private departures: { [key: string]: any };
  private returns: any[];
  private formData: FlightSearchFormData | null;

  constructor() {
    this.knownProviders = [];
    this.state = {};

    this.itineraries = {};
    this.itinerariesVersion = 0;
    this.departures = {};
    this.returns = [];

    this.formData = null;
    this.primaryTab = null;
    this.setPrimaryTab();
    this.setupClosePrimaryTabListener();
  }

  setupClosePrimaryTabListener(): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    chrome.tabs.onRemoved.addListener(function (tabId: number) {
      if (tabId === that.getPrimaryTabId()) {
        that.closeWindows();
      }
    });
  }

  getPrimaryTabId(): number | undefined {
    return this.primaryTab?.id;
  }

  getPrimaryTabIndex(): number | undefined {
    return this.primaryTab?.index;
  }

  getPrimaryWindowId(): number | undefined {
    return this.primaryTab?.windowId;
  }

  setFormData(formData: FlightSearchFormData): void {
    this.formData = formData;
    this.knownProviders = this.formData.searchByPoints ? PROVIDERS_SUPPORTING_POINTS_SEARCH : SUPPORTED_PROVIDERS;
    this.setDefault();
  }

  getFormData(): FlightSearchFormData | null {
    return this.formData;
  }

  setPending(providerName: string): void {
    this.state[providerName]["status"] = "PENDING";
    this.setFlightCount(providerName, 0);
  }

  setFailed(providerName: string, flightCount = 0): void {
    this.state[providerName]["status"] = "FAILED";
    this.setFlightCount(providerName, flightCount);
  }

  setSuccessful(providerName: string, flightCount: number): void {
    this.state[providerName]["status"] = "SUCCESS";
    this.setFlightCount(providerName, flightCount);
  }

  setPartialReturn(providerName: string, flightCountBatchSize: number): number {
    this.state[providerName]["status"] = "PARTIAL_RETURN_CONTINUING";
    const currentCount = this.getFlightCount(providerName);
    return currentCount + flightCountBatchSize;
  }

  getStatus(providerName: string): string | undefined {
    return this.state[providerName]["status"];
  }

  isProviderComplete(providerName: string): boolean {
    const status = this.getStatus(providerName);
    return status ? terminalStates.includes(status) : false;
  }

  isComplete(): boolean {
    return this.knownProviders.every((providerName) => {
      this.isProviderComplete(providerName);
    });
  }

  isProviderSuccessful(providerName: string): boolean {
    const status = this.getStatus(providerName);
    return status ? successStates.includes(status) : false;
  }

  isSuccessful(): boolean {
    return this.knownProviders.every((providerName) => {
      this.isProviderSuccessful(providerName);
    });
  }

  getItineraries(): { itineraries: { [key: string]: Itinerary }; version: number } {
    return { itineraries: this.itineraries, version: this.itinerariesVersion };
  }

  setItineraries(itineraries: { [key: string]: Itinerary }, version: number): boolean {
    if (version === this.itinerariesVersion) {
      this.itineraries = itineraries;
      this.itinerariesVersion += 1;
      return true;
    } else {
      return false;
    }
  }

  getDepartures(): { [key: string]: any } {
    return this.departures;
  }

  getDeparture(departureId: string): any {
    return this.departures[departureId];
  }

  setDepartures(departures: any): void {
    this.departures = departures;
  }

  getReturns(): any[] {
    return this.returns;
  }

  addReturns(returns: any[]): void {
    this.returns = this.returns.concat(returns);
  }

  setReturns(returns: any[]): void {
    this.returns = returns;
  }

  setFlightCount(providerName: string, flightCount: number): void {
    this.state[providerName]["flightCount"] = flightCount;
  }

  getFlightCount(providerName: string): number {
    return this.state[providerName]["flightCount"];
  }

  setReady(providerName: string, value: boolean): void {
    this.state[providerName].ready = value;
  }

  getReady(providerName: string): boolean {
    return this.state[providerName].ready;
  }

  setOnReady(providerName: string, callback: () => void): void {
    this.state[providerName].onReady = callback;
  }

  getOnReady(providerName: string): () => void {
    return this.state[providerName].onReady;
  }

  setDefault(): void {
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
    this.itinerariesVersion = 0;
    this.departures = {};
    this.returns = [];
  }

  setTimer(providerName: string, timeout: number, callback: () => void): void {
    this.state[providerName].timer = setTimeout(callback, timeout);
  }

  getTimer(providerName: string): ReturnType<typeof setTimeout> | null {
    return this.state[providerName].timer;
  }

  clearTimeout(providerName: string): void {
    const timer = this.state[providerName].timer;
    if (timer) {
      clearTimeout(timer);
      this.state[providerName].timer = null;
    }
  }

  setTab(providerName: string, tab: chrome.tabs.Tab): void {
    this.state[providerName]["tab"] = tab;
  }

  setWindow(providerName: string, window: chrome.windows.Window): void {
    this.state[providerName]["window"] = window;
  }

  getTabId(providerName: string): number | undefined {
    return this.state[providerName].tab?.id;
  }

  getTabIndex(providerName: string): number | undefined {
    return this.state[providerName].tab?.index;
  }

  getWindowId(providerName: string): number | undefined {
    return this.state[providerName].window?.id;
  }

  setPrimaryTab(): void {
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

  createWindow(
    url: string,
    provider: string,
    windowConfig: WindowConfig,
    formData: FlightSearchFormData,
  ): Promise<void> {
    const { height, width, left, top } = windowConfig;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    return new Promise<void>((resolve) => {
      chrome.windows.create({ url, focused: false, height, width, left, top }, async (window) => {
        if (window && window.tabs && that.primaryTab?.windowId !== null && that.primaryTab?.windowId !== undefined) {
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

  closeWindow(providerName: string): void {
    const windowId = this.getWindowId(providerName);
    if (windowId !== null && windowId !== undefined) {
      chrome.windows.remove(windowId);
    }
  }

  closeWindows(): void {
    this.knownProviders.forEach((providerName) => {
      this.closeWindow(providerName);
    });
  }

  searchForResults(formData: FlightSearchFormData, windowConfig: WindowConfig): void {
    this.setFormData(formData);
    const primaryTabId = this?.primaryTab?.id;
    if (primaryTabId !== undefined && primaryTabId !== null) {
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

  getTotalFlightCount(): number | null {
    if (!this.isComplete()) {
      return null;
    }
    let total = 0;
    this.knownProviders.forEach((providerName) => {
      total += this.getFlightCount(providerName);
    });
    return total;
  }

  sendMessageToIndexPage(message: any): void {
    const primaryTabId = this.getPrimaryTabId();
    if (primaryTabId !== null && primaryTabId !== undefined) {
      chrome.tabs.sendMessage(primaryTabId, message);
    }
  }
}
