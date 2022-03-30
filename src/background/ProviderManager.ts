import { getUrl as getCheapoairUrl } from "../cheapoair/mappings/getUrl";
import { getUrl as getExpediaUrl } from "../expedia/mappings/getUrl";
import { getUrl as getKiwiUrl } from "../kiwi/mappings/getUrl";
import { sendFailedScraper } from "../shared/events";
import { pause } from "../shared/pause";
import { FlightSearchFormData } from "../shared/types/FlightSearchFormData";
import { MessageResponse } from "../shared/types/MessageResponse";
import { DisplayableTrip } from "../shared/types/newtypes/DisplayableTrip";
import { Itinerary } from "../shared/types/newtypes/Itinerary";
import { WindowConfig } from "../shared/types/WindowConfig";
import { getUrl as getSouthwestUrl } from "../southwest/mappings/getUrl";
import { getUrl as getTripUrl } from "../trip/mappings/getUrl";
import {
  DEFAULT_ON_READY_FUNCTION,
  PROVIDERS_NEEDING_RETURNS,
  PROVIDERS_SUPPORTING_POINTS_SEARCH,
  SUPPORTED_PROVIDERS,
} from "./constants";
import { isExtensionOpen } from "./state";

type StatusType = "PENDING" | "PARSING" | "FAILED" | "SUCCESS";

interface ProviderState {
  alertOnWindowClose: boolean;
  status: StatusType;
  tab?: chrome.tabs.Tab;
  window?: chrome.windows.Window;
  ready: boolean;
  onReady: () => void;
  timer: ReturnType<typeof setTimeout> | null;
  attempts: number;
}

const terminalStates = ["FAILED", "SUCCESS"];
const defaultProviderState: ProviderState = {
  alertOnWindowClose: true,
  status: "PENDING",
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
  private deletedItineraryIds: string[];
  private formData: FlightSearchFormData | null;
  private selectedProviders: string[];

  constructor() {
    this.knownProviders = [];
    this.state = {};
    this.selectedTrips = [];

    this.itineraries = [];
    this.deletedItineraryIds = [];
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

  isExpectingMoreSearching(): boolean {
    const providers = this.selectedProviders.length ? this.selectedProviders : this.knownProviders;
    return providers.every((providerName) => {
      const tripProvider = PROVIDERS_NEEDING_RETURNS.includes(providerName);
      const status = this.getStatus(providerName) || "PENDING";

      return !((tripProvider && status === "FAILED") || (!tripProvider && terminalStates.includes(status)));
    });
  }

  getPrimaryTabId(): number | undefined {
    return this.primaryTab?.id;
  }

  getSelectedTrips(): DisplayableTrip[] {
    return this.selectedTrips;
  }

  setSelectedTrips(trips: DisplayableTrip[]): void {
    this.selectedTrips = trips;
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

  setSelectedProviders(providerNames: string[]): void {
    this.selectedProviders = providerNames;
  }

  setStatus(providerName: string, status: StatusType): void {
    if (!this.state[providerName]) {
      this.state[providerName] = { ...defaultProviderState };
    }
    this.state[providerName]["status"] = status;
  }

  setParsing(providerName: string): void {
    this.setStatus(providerName, "PARSING");
    this.incrementParsingAttempts(providerName);
  }

  setFailed(providerName: string): void {
    this.setStatus(providerName, "FAILED");
  }

  setSuccessful(providerName: string): void {
    this.setStatus(providerName, "SUCCESS");
  }

  getStatus(providerName: string): StatusType | undefined {
    return this.state[providerName]["status"];
  }

  isComplete(): boolean {
    const providers = this.selectedProviders.length ? this.selectedProviders : this.knownProviders;
    return providers.every((providerName) => {
      return terminalStates.includes(this.getStatus(providerName) || "PENDING");
    });
  }

  getItineraries(): Itinerary[] {
    return this.itineraries.filter((itin) => {
      return !this.deletedItineraryIds.includes(itin.getId());
    });
  }

  addItinerary(itinerary: Itinerary): void {
    const index = this.itineraries.findIndex((recordedItinerary) => {
      return recordedItinerary.getId() === itinerary.getId();
    });
    if (index >= 0) {
      this.itineraries[index].addOrUpdateSource(itinerary.getTopSource());
    } else {
      this.itineraries.push(itinerary);
    }
  }

  removeItinerary(id: string): void {
    // as events stream in, we may get the same itinerary resent/updated.  Simply deleting it from the array is insufficient
    this.deletedItineraryIds.push(id);
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
    this.setParsing(provider); // de facto starting...

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
            sendFailedScraper(provider, error);
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
          this.setFailed(providerName);
          this.closeWindow(providerName);
          if (this.isComplete()) {
            this.sendMessageToIndexPage({ event: "SCRAPING_STATUS", complete: true }, 3000);
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

  retry(providerName: string, windowConfig: WindowConfig): boolean {
    this.closeWindow(providerName);
    if (this.state[providerName].attempts < 2 && !!this.formData && this.selectedTrips.length === 0) {
      const url = providerURLBaseMap[providerName](this.formData);
      const message = { event: "BEGIN_PARSING", formData: this.formData };
      const promise = this.createWindow(url, providerName, windowConfig, message, (response) => {
        console.debug(response);
        if (!response || !response.received) {
          this.setFailed(providerName);
          this.closeWindow(providerName);
          if (this.isComplete()) {
            this.sendMessageToIndexPage({ event: "SCRAPING_STATUS", complete: true }, 3000);
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
    const maxSelections = this.getMaxSelectionsCount();
    return this.selectedTrips.length === maxSelections;
  }

  getMaxSelectionsCount(): number {
    if (!this.formData) {
      return 2;
    }
    return this.formData.roundtrip ? 2 : 1;
  }
}
