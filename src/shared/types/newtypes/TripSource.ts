import { getParsedNumber } from "./utilities/getParsedNumber";

export interface TripSourceInput {
  fare: number | string;
  id?: string;
  name: string;
  tabId: number | string;
  windowId: number | string;
}

export class TripSource {
  private fare: number;
  private id: string | null;
  private name: string;
  private tabId: number;
  private windowId: number;

  constructor({ id, fare, name, tabId, windowId }: TripSourceInput) {
    this.fare = getParsedNumber(fare);
    this.id = id || null;
    this.name = name;
    this.tabId = getParsedNumber(tabId);
    this.windowId = getParsedNumber(windowId);
  }

  getFare(): number {
    return this.fare;
  }

  getId(): string | null {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  async getWindow(): Promise<chrome.windows.Window> {
    return new Promise((resolve) => {
      chrome.windows.get(this.windowId, (window) => {
        resolve(window);
      });
    });
  }

  async getTab(): Promise<chrome.tabs.Tab> {
    return new Promise((resolve) => {
      chrome.tabs.get(this.tabId, (tab) => {
        resolve(tab);
      });
    });
  }
}
