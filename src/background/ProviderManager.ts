import { getUrl as getCheapoairUrl } from "../cheapoair/mappings/getUrl";
import { getUrl as getExpediaUrl } from "../expedia/mappings/getUrl";
import { getUrl as getKiwiUrl } from "../kiwi/mappings/getUrl";
import { sendFailedScraper } from "../shared/events";
import { pause } from "../shared/pause";
import { FlightSearchFormData } from "../shared/types/FlightSearchFormData";
// import { Itinerary } from "../shared/types/Itinerary";
import { MessageResponse } from "../shared/types/MessageResponse";
import { DisplayableTrip } from "../shared/types/newtypes/DisplayableTrip";
import { Itinerary } from "../shared/types/newtypes/Itinerary";
import { SearchTripMeta } from "../shared/types/SearchMeta";
// import { ProcessedFlightSearchResult } from "../shared/types/ProcessedFlightSearchResult";
import { WindowConfig } from "../shared/types/WindowConfig";
import { getUrl as getSouthwestUrl } from "../southwest/mappings/getUrl";
import { getUrl as getTripUrl } from "../trip/mappings/getUrl";
import {
  DEFAULT_ON_READY_FUNCTION,
  FlightType,
  PROVIDERS_SUPPORTING_POINTS_SEARCH,
  SearchType,
  SUPPORTED_PROVIDERS,
} from "./constants";
import { isExtensionOpen } from "./state";

type StatusType = "PENDING" | "PARSING" | "PARTIAL_RETURN_CONTINUING" | "FAILED" | "SUCCESS";

interface ProviderState {
  alertOnWindowClose: boolean;
  departureStatus: StatusType;
  returnStatus: StatusType;
  tab?: chrome.tabs.Tab;
  window?: chrome.windows.Window;
  ready: boolean;
  onReady: () => void;
  timer: ReturnType<typeof setTimeout> | null;
  attempts: number;
}

const terminalStates = ["FAILED", "SUCCESS"];
const successStates = ["SUCCESS"];
const defaultProviderState: ProviderState = {
  alertOnWindowClose: true,
  departureStatus: "PENDING" as StatusType,
  returnStatus: "PENDING" as StatusType,
  ready: true,
  onReady: DEFAULT_ON_READY_FUNCTION,
  timer: null,
  attempts: 0,
};

const providerURLBaseMap: { [key: string]: (formData: FlightSearchFormData) => string } = {
  trip: getTripUrl,
  southwest: getSouthwestUrl,
  expedia: getExpediaUrl,
  kiwi: getKiwiUrl,
  cheapoair: getCheapoairUrl,
};

export class ProviderManager {
  private knownProviders: string[];
  private state: { [key: string]: ProviderState };
  private selectedTrips: DisplayableTrip[];
  private primaryTab: chrome.tabs.Tab | null;

  private itineraries: Itinerary[];
  private formData: FlightSearchFormData | null;
  private selectedProviders: string[];

  constructor() {
    this.knownProviders = [];
    this.state = {};
    this.selectedTrips = [];

    this.itineraries = [];
    this.selectedProviders = [];

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

  getSelectedTrips(): DisplayableTrip[] {
    return this.selectedTrips;
  }

  addSelectedTrip(trip: DisplayableTrip): void {
    this.selectedTrips.push(trip);
  }

  clearSelectedTrips(activeContainerIndex: number): void {
    this.selectedTrips = this.selectedTrips.slice(0, activeContainerIndex);
  }

  getSelectedTripsId(): string {
    return this.selectedTrips.map((trip) => trip.getTrip().getId()).join("-");
  }

  getSelectedItinerary(): Itinerary {
    const itineraryId = this.getSelectedTripsId();
    const itinerary = this.itineraries.filter((itinerary) => {
      return itinerary.getId() === itineraryId;
    })[0];
    if (!itinerary) {
      throw new Error("Unable to find itinerary matching selections");
    }
    return itinerary;
  }

  setFormData(formData: FlightSearchFormData): void {
    this.formData = formData;
    this.knownProviders = this.formData.searchByPoints ? PROVIDERS_SUPPORTING_POINTS_SEARCH : SUPPORTED_PROVIDERS;
    this.setDefault();
  }

  getFormData(): FlightSearchFormData | null {
    return this.formData;
  }

  getFormCabinValue(): string {
    return this.formData?.cabin || "econ";
  }

  setSelectedProviders(providerNames: string[]): void {
    this.selectedProviders = providerNames;
  }

  setStatus(providerName: string, status: StatusType, searchType: SearchType): void {
    if (!this.state[providerName]) {
      this.state[providerName] = { ...defaultProviderState };
    }

    if (searchType === "DEPARTURE") {
      this.state[providerName]["departureStatus"] = status;
    } else if (searchType === "RETURN") {
      this.state[providerName]["returnStatus"] = status;
    } else {
      this.state[providerName]["departureStatus"] = status;
      this.state[providerName]["returnStatus"] = status;
    }
  }

  setPending(providerName: string, searchType: SearchType): void {
    this.setStatus(providerName, "PENDING", searchType);
  }

  setParsing(providerName: string, searchType: SearchType): void {
    this.setStatus(providerName, "PARSING", searchType);
    this.incrementParsingAttempts(providerName);
  }

  setFailed(providerName: string, searchType: SearchType): void {
    this.setStatus(providerName, "FAILED", searchType);
  }

  setSuccessful(providerName: string, searchType: SearchType): void {
    this.setStatus(providerName, "SUCCESS", searchType);
  }

  setPartialReturn(providerName: string, searchType: SearchType): void {
    let status;
    if (searchType === "BOTH") {
      status = this.getStatus(providerName, "DEPARTURE") && this.getStatus(providerName, "RETURN");
    } else {
      status = this.getStatus(providerName, searchType);
    }
    if (!status || !terminalStates.includes(status)) {
      this.setStatus(providerName, "PARTIAL_RETURN_CONTINUING", searchType);
    }
  }

  getStatus(providerName: string, searchType: FlightType): StatusType | undefined {
    return searchType === "DEPARTURE" ? this.getDepartureStatus(providerName) : this.getReturnStatus(providerName);
  }

  getDepartureStatus(providerName: string): StatusType | undefined {
    return this.state[providerName]["departureStatus"];
  }

  getReturnStatus(providerName: string): StatusType | undefined {
    return this.state[providerName]["returnStatus"];
  }

  isProviderDepartureComplete(providerName: string): boolean {
    const status = this.getDepartureStatus(providerName);
    return status ? terminalStates.includes(status) : false;
  }

  isProviderReturnComplete(providerName: string): boolean {
    const status = this.getReturnStatus(providerName);
    return status ? terminalStates.includes(status) : false;
  }

  isDepartureComplete(): boolean {
    return this.knownProviders.every((providerName) => {
      return this.isProviderDepartureComplete(providerName);
    });
  }

  isReturnComplete(): boolean {
    const providers = this.selectedProviders.length ? this.selectedProviders : this.knownProviders;
    return providers.every((providerName) => {
      return this.isProviderReturnComplete(providerName);
    });
  }

  isComplete(searchType: SearchType): boolean {
    let status;
    if (searchType === "BOTH") {
      status = this.isDepartureComplete() && this.isReturnComplete();
    } else if (searchType === "DEPARTURE") {
      status = this.isDepartureComplete();
    } else {
      status = this.isReturnComplete();
    }
    return status;
  }

  isProviderDepartureSuccessful(providerName: string): boolean {
    const status = this.getDepartureStatus(providerName);
    return status ? successStates.includes(status) : false;
  }

  isProviderReturnSuccessful(providerName: string): boolean {
    const status = this.getReturnStatus(providerName);
    return status ? successStates.includes(status) : false;
  }

  isDepartureSuccessful(): boolean {
    return this.knownProviders.every((providerName) => {
      return this.isProviderDepartureSuccessful(providerName);
    });
  }

  isReturnSuccessful(): boolean {
    return this.knownProviders.every((providerName) => {
      return this.isProviderReturnSuccessful(providerName);
    });
  }

  getItineraries(): Itinerary[] {
    return this.itineraries;
  }

  addItinerary(itinerary: Itinerary) {
    const index = this.itineraries.findIndex((recordedItinerary) => {
      return recordedItinerary.getId() === itinerary.getId();
    });
    if (index >= 0) {
      this.itineraries[index].addOrUpdateSource(itinerary.getTopSource());
    } else {
      this.itineraries.push(itinerary);
    }
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

  setAlertOnWindowClose(providerName: string, value: boolean): void {
    this.state[providerName].alertOnWindowClose = value;
  }

  getAlertOnWindowClose(providerName: string): boolean {
    return this.state[providerName].alertOnWindowClose;
  }

  setDefault(): void {
    this.knownProviders.forEach((providerName) => {
      this.state[providerName] = { ...defaultProviderState };
    });
    this.itineraries = [];
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

  getProviderByWindowId(windowId: number): { details: ProviderState; providerName: string } | null {
    const windows = Object.entries(this.state).filter(([providerName, providerDetails]) => {
      return providerName && providerDetails && providerDetails?.window?.id && providerDetails.window.id === windowId;
    });
    if (windows.length) {
      return { providerName: windows[0][0], details: windows[0][1] };
    }
    return null;
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
    message: Record<string, unknown>,
    messageResponseCallback: (response: MessageResponse | null) => void,
  ): Promise<void> {
    this.setParsing(provider, "BOTH"); // de facto starting...

    const { height, width, left, top } = windowConfig;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    return new Promise<void>((resolve) => {
      chrome.windows.create(
        { url, focused: false, height, width, left, top, setSelfAsOpener: true },
        async (window) => {
          this.setPrimaryTabAsFocus();

          if (window && window.tabs) {
            that.setTab(provider, window.tabs[0]);
            that.setWindow(provider, window);

            chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
              if (info.status === "complete" && tabId === that.getTabId(provider)) {
                chrome.tabs.onUpdated.removeListener(listener);
                chrome.tabs.sendMessage(tabId, message, {}, (response) => {
                  messageResponseCallback(response);
                });
                resolve();
              }
            });
          } else {
            const error = new Error("Unable to create window - no window!");
            sendFailedScraper(provider, error, "ALL");
            throw error;
          }
        },
      );
    });
  }

  closeWindow(providerName: string): void {
    const windowId = this.getWindowId(providerName);
    if (windowId !== null && windowId !== undefined) {
      chrome.windows.get(windowId, (window) => {
        if (window && window.id) {
          this.setAlertOnWindowClose(providerName, false);
          chrome.windows.remove(windowId);
        }
      });
    }
  }

  closeWindows(): void {
    this.knownProviders.forEach((providerName) => {
      this.closeWindow(providerName);
    });
  }

  searchForResults(formData: FlightSearchFormData, windowConfig: WindowConfig): void {
    this.setFormData(formData);
    const message = { event: "BEGIN_PARSING", formData };
    const promises = this.knownProviders.map((providerName) => {
      const url = providerURLBaseMap[providerName](formData);
      // Open url in a new window.
      // Not a new tab because we can't read results from inactive tabs (browser powers down inactive tabs).
      return this.createWindow(url, providerName, windowConfig, message, (response: MessageResponse | null) => {
        console.debug(response);
        if (!response || !response.received) {
          this.setFailed(providerName, "DEPARTURE");
          this.sendMessageToIndexPage({
            event: "SCRAPER_COMPLETE",
            providerName: providerName,
            status: "FAILED",
          });
          this.closeWindow(providerName);
          if (this.isComplete("DEPARTURE")) {
            this.sendMessageToIndexPage({ event: "SCRAPING_COMPLETED", searchType: "DEPARTURE" }, 3000);
          }
        }
      });
    });

    Promise.all(promises).then(() => {
      // update again for chrome on windows, to move results window to foreground
      this.setPrimaryTabAsFocus();
    });
  }

  sendMessageToIndexPage(message: any, delay = 0): void {
    const url = `chrome-extension://${chrome.runtime.id}/index.html`;

    chrome.tabs.query({ url }, (tabs) => {
      if (tabs && tabs.length) {
        const primaryTabId = tabs[0]?.id;
        if (primaryTabId) {
          setTimeout(() => {
            chrome.tabs.sendMessage(primaryTabId, message);
          }, delay);
        }
      }
    });
  }

  incrementParsingAttempts(providerName: string): void {
    this.state[providerName].attempts += 1;
  }

  retry(providerName: string, windowConfig: WindowConfig, searchType: SearchType): boolean {
    this.closeWindow(providerName);
    if (this.state[providerName].attempts < 2 && !!this.formData && ["DEPARTURE", "BOTH"].includes(searchType)) {
      const url = providerURLBaseMap[providerName](this.formData);
      const message = { event: "BEGIN_PARSING", message: this.formData };
      const promise = this.createWindow(url, providerName, windowConfig, message, (response) => {
        console.debug(response);
        if (!response || !response.received) {
          this.setFailed(providerName, searchType);
          this.sendMessageToIndexPage({
            event: "SCRAPER_COMPLETE",
            providerName: providerName,
            status: "FAILED",
          });
          this.closeWindow(providerName);
          if (this.isComplete(searchType)) {
            this.sendMessageToIndexPage({ event: "SCRAPING_COMPLETED", searchType }, 3000);
          }
        }
      });
      promise.then(() => {
        this.setPrimaryTabAsFocus();
      });
      return true;
    } else {
      return false;
    }
  }

  setPrimaryTabAsFocus(): void {
    /*
     * Chrome's tab API focuses the tab and doesn't care if the window is in focus.
     * This will focus the tab & the window!
     * Worse yet, the tab object does not fire an update event when the window changes, so always use callbacks!
     */
    const url = `chrome-extension://${chrome.runtime.id}/index.html`;

    chrome.tabs.query({ url }, (tabs) => {
      if (tabs && tabs.length) {
        const primaryTab = tabs[0];
        if (primaryTab.id) {
          chrome.tabs.update(primaryTab.id, { active: true }, (tab) => {
            if (tab?.windowId) {
              chrome.windows.update(tab.windowId, { focused: true });
            }
          });
        }
      }
    });
  }

  isAtMaxSelections(): boolean {
    if (!this.formData) {
      return false;
    }
    const maxSelections = this.formData.roundtrip ? 2 : 1;
    return this.selectedTrips.length === maxSelections;
  }
}
