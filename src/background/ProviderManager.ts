import debounce from "lodash.debounce";
import * as browser from "webextension-polyfill";

import { getUrl as getCheapoairUrl } from "../content_scripts/collectors/cheapoair/mappings/getUrl";
import { getUrl as getKiwiUrl } from "../content_scripts/collectors/kiwi/mappings/getUrl";
import { getUrl as getMomondoUrl } from "../content_scripts/collectors/momondo/mapping/getUrl";
import { getUrl as getTripUrl } from "../content_scripts/collectors/trip/mappings/getUrl";
import { sendFailedScraper } from "../shared/events";
import { pause } from "../shared/pause";
import { DisplayableTrip } from "../shared/types/DisplayableTrip";
import { FlightSearchFormData } from "../shared/types/FlightSearchFormData";
import { Itinerary } from "../shared/types/Itinerary";
import { getExtensionUrl } from "../shared/utilities/getExtensionUrl";
import { focusTab } from "../shared/utilities/tabs/focusTab";
import { getTab } from "../shared/utilities/tabs/getTab";
import { getTabByUrl } from "../shared/utilities/tabs/getTabByUrl";
import {
  DEFAULT_ON_READY_FUNCTION,
  PROVIDERS_NEEDING_RETURNS,
  PROVIDERS_SUPPORTING_POINTS_SEARCH,
  SUPPORTED_PROVIDERS,
} from "./constants";
import { getTripGroupsAndMetadata } from "./eventHandlers/utilities/getTripGroupsAndMetadata";
import { isExtensionOpen } from "./state";

type StatusType = "PENDING" | "PARSING" | "FAILED" | "SUCCESS";

interface ProviderState {
  alertOnTabClose: boolean;
  status: StatusType;
  tab?: browser.Tabs.Tab;
  ready: boolean;
  onReady: () => void;
  timer: ReturnType<typeof setTimeout> | null;
  attempts: number;
}

const terminalStates = ["FAILED", "SUCCESS"];
const defaultProviderState: ProviderState = {
  alertOnTabClose: true,
  status: "PENDING",
  ready: true,
  onReady: DEFAULT_ON_READY_FUNCTION,
  timer: null,
  attempts: 0,
};

const providerURLBaseMap: { [key: string]: (formData: FlightSearchFormData) => string } = {
  trip: getTripUrl,
  momondo: getMomondoUrl,
  kiwi: getKiwiUrl,
  cheapoair: getCheapoairUrl,
};

export class ProviderManager {
  private knownProviders: string[];
  private state: { [key: string]: ProviderState };
  private primaryTab: browser.Tabs.Tab | null;
  private tabGroupId: number | undefined;

  private selectedTrips: DisplayableTrip[];
  private dominationDenyList: string[];

  private itineraries: Itinerary[];
  private deletedItineraryIds: string[];
  private formData: FlightSearchFormData | null;
  private selectedProviders: string[];

  private failToStartTracker: any;

  public sendTripResultsToIndexPage: () => void;

  constructor() {
    this.knownProviders = [];
    this.state = {};
    this.tabGroupId = undefined;

    this.selectedTrips = [];
    this.dominationDenyList = [];

    this.itineraries = [];
    this.deletedItineraryIds = [];
    this.selectedProviders = [];

    this.formData = null;
    this.primaryTab = null;
    this.setPrimaryTab();
    this.setupCloseTabListener();

    this.failToStartTracker = null;

    this.sendTripResultsToIndexPage = debounce(
      async () => {
        await this._sendTripResultsToIndexPage();
      },
      500,
      {
        leading: true,
        maxWait: 3000,
      },
    );
  }

  setupCloseTabListener(): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    browser.tabs.onRemoved.addListener(async (tabId) => {
      if (tabId === that.getPrimaryTabId()) {
        await that.closeTabs();
      }

      if (tabId !== that.getPrimaryTabId()) {
        const details = that.getProviderByTabId(tabId);
        if (details && details.providerName) {
          const providerName = details.providerName;
          that.setFailed(providerName);
          const isRetrying = await that.retry(providerName);
          if (!isRetrying) {
            if (that.getAlertOnTabClose(providerName)) {
              console.debug(`tab for ${providerName} closed`);
              await that.sendMessageToIndexPage({
                event: "WINDOW_CLOSED",
                providerName: providerName,
                status: "FAILED",
              });
            }
          }
        }
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
    if (this.state[providerName]) {
      this.clearFailToStartTracker();
    }
    if (!this.state[providerName]) {
      this.state[providerName] = { ...defaultProviderState };
    }

    this.state[providerName]["status"] = status;
  }

  setParsing(providerName: string): void {
    const priorStatus = this.getStatus(providerName);

    if (priorStatus !== "PARSING") {
      this.setStatus(providerName, "PARSING");
      this.incrementParsingAttempts(providerName);
    }
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
      return !this.deletedItineraryIds.includes(itin.getId()) && !itin.isDenyListed();
    });
  }

  addItinerary(itinerary: Itinerary): void {
    const index = this.itineraries.findIndex((recordedItinerary) => {
      return recordedItinerary.getId() === itinerary.getId();
    });
    if (index >= 0) {
      this.itineraries[index].addOrUpdateSources(itinerary.getSources());
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

  setAlertOnTabClose(providerName: string, value: boolean): void {
    this.state[providerName].alertOnTabClose = value;
  }

  getAlertOnTabClose(providerName: string): boolean {
    return this.state[providerName].alertOnTabClose;
  }

  setDefault(): void {
    this.knownProviders.forEach((providerName) => {
      this.state[providerName] = { ...defaultProviderState };
    });
    this.itineraries = [];
    this.dominationDenyList = [];
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

  setTab(providerName: string, tab: browser.Tabs.Tab): void {
    this.state[providerName]["tab"] = tab;
  }

  getTabId(providerName: string): number | undefined {
    return this.state[providerName].tab?.id;
  }

  getProviderByTabId(tabId: number): { details: ProviderState; providerName: string } | null {
    const records = Object.entries(this.state).filter(([providerName, providerDetails]) => {
      return providerName && providerDetails && providerDetails?.tab?.id && providerDetails.tab.id === tabId;
    });
    if (records.length) {
      return { providerName: records[0][0], details: records[0][1] };
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

  async createTab(url: string, provider: string, message: Record<string, unknown>): Promise<void> {
    const windowId = await this.getPrimaryWindowId();
    if (!windowId) {
      const error = new Error("Unable to create tab - no primary window!");
      sendFailedScraper(provider, error);
      throw error;
    }

    this.setParsing(provider); // de facto starting...
    this.setAlertOnTabClose(provider, true);

    const tab = await browser.tabs.create({ windowId, url, active: false });
    if (tab && tab.id) {
      this.setTab(provider, tab);
    } else {
      const error = new Error("Unable to create tab - no tab returned!");
      sendFailedScraper(provider, error);
      throw error;
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    browser.tabs.onUpdated.addListener(async function listener(tabId, info) {
      if (info.status === "complete" && tabId === that.getTabId(provider)) {
        browser.tabs.onUpdated.removeListener(listener);
        browser.tabs.sendMessage(tabId, message, {});
      }
    });
  }

  async closeTab(providerName: string): Promise<void> {
    const tabId = this.getTabId(providerName);
    if (tabId !== null && tabId !== undefined) {
      const closeStatus = this.getAlertOnTabClose(providerName);
      try {
        const tab = await browser.tabs.get(tabId);
        if (tab && tab.id) {
          this.setAlertOnTabClose(providerName, false);
          await browser.tabs.remove(tabId);
        }
      } catch (e) {
        console.debug(`Unable to close tab for ${providerName}`);
      } finally {
        this.setAlertOnTabClose(providerName, closeStatus);
      }
    }
  }

  async closeTabs(): Promise<void> {
    for (const providerName of this.knownProviders) {
      await this.closeTab(providerName);
    }
  }

  async searchForResults(formData: FlightSearchFormData): Promise<void> {
    this.setFormData(formData);
    this.initFailToStartTracker();

    const message = { event: "BEGIN_PARSING", formData };
    for (const providerName of this.knownProviders) {
      const url = providerURLBaseMap[providerName](formData);
      await this.createTab(url, providerName, message);
    }
    await this.setPrimaryTabAsFocus();
    await this.groupAllTabs();
  }

  async sendMessageToIndexPage(message: any, delay = 0): Promise<void> {
    const url = getExtensionUrl();
    const tab = await getTabByUrl({ url });
    if (tab && tab.id) {
      const primaryTabId = tab.id;
      setTimeout(() => {
        browser.tabs.sendMessage(primaryTabId, message);
      }, delay);
    }
  }

  incrementParsingAttempts(providerName: string): void {
    this.state[providerName].attempts += 1;
  }

  async retry(providerName: string): Promise<boolean> {
    await this.closeTab(providerName);
    if (
      !this.state[providerName].alertOnTabClose &&
      this.state[providerName].attempts < 2 &&
      !!this.formData &&
      this.selectedTrips.length === 0
    ) {
      const url = providerURLBaseMap[providerName](this.formData);
      const message = { event: "BEGIN_PARSING", formData: this.formData };
      await this.createTab(url, providerName, message);
      await this.setPrimaryTabAsFocus();
      return true;
    } else {
      return false;
    }
  }

  async setPrimaryTabAsFocus(): Promise<void> {
    /*
     * Chrome's tab API focuses the tab and doesn't care if the window is in focus.
     * This will focus the tab & the window!
     * Worse yet, the tab object does not fire an update event when the window changes, so always use callbacks!
     */
    const url = getExtensionUrl();
    const tab = await getTabByUrl({ url });
    if (tab) {
      await focusTab(tab);
    }
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

  async _sendTripResultsToIndexPage(): Promise<void> {
    const itineraries = this.getItineraries();
    const { tripGroups, meta } = getTripGroupsAndMetadata(
      itineraries,
      this.getSelectedTrips(),
      this.getMaxSelectionsCount(),
      this.dominationDenyList,
      this.formData as FlightSearchFormData,
    );

    const nextMessage = {
      event: "TRIP_RESULTS_FOR_CLIENT",
      trips: tripGroups,
      meta,
      formData: this.getFormData(),
    };
    await this.sendMessageToIndexPage(nextMessage);
  }

  addIdToDominationDenyList(tripId: string): void {
    this.dominationDenyList.push(tripId);
  }

  clearFailToStartTracker(): void {
    if (this.failToStartTracker) {
      clearTimeout(this.failToStartTracker);
    }
    this.failToStartTracker = null;
  }

  initFailToStartTracker(): void {
    this.clearFailToStartTracker();

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    this.failToStartTracker = setTimeout(() => {
      if (!that.isScrapingWindowsOpen()) {
        that.sendMessageToIndexPage({ event: "SCRAPERS_FAILED_TO_START" });
      }
    }, 1000);
  }

  async isScrapingWindowsOpen(): Promise<boolean> {
    for (const providerState of Object.values(this.state)) {
      const tabId = providerState.tab?.id;
      if (!tabId) {
        continue;
      }

      const tab = await getTab({ tabId });
      if (tab) {
        return true;
      }
    }
    return false;
  }

  async getPrimaryWindowId(): Promise<number | undefined> {
    const url = getExtensionUrl();
    const tab = await getTabByUrl({ url });
    if (tab) {
      return tab.windowId;
    }
    return undefined;
  }

  setTabGroupId(groupId: number): void {
    this.tabGroupId = groupId;
  }

  getTabGroupId(): number | undefined {
    return this.tabGroupId;
  }

  groupAllTabs(): void {
    const primaryTabId = this.getPrimaryTabId();
    if (primaryTabId !== undefined && !!chrome && !!chrome.tabs && !!chrome.tabs.group) {
      const tabIds: number[] = Object.values(this.state)
        .map((providerState) => {
          return providerState.tab?.id;
        })
        .filter((id) => {
          return id !== undefined;
        }) as number[];
      tabIds.push(primaryTabId);

      const options: chrome.tabs.GroupOptions = { tabIds };
      const tabGroupId = this.getTabGroupId();
      if (tabGroupId) {
        options["groupId"] = tabGroupId;
      }

      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;
      chrome.tabs.group(options, (groupId) => {
        that.setTabGroupId(groupId);
      });
    }
  }
}
