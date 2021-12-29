import { AnalyticsManager } from "../AnalyticsManager";
import { openExtension } from "./openExtension";

export const ExtensionOpenedHandler = (analytics: AnalyticsManager): void => {
  chrome.browserAction.onClicked.addListener(() => {
    openExtension(analytics);
  });
};
