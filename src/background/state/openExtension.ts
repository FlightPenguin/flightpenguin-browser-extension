import { getUserInfo } from "../../auth";
import { getAuthToken } from "../../auth/getAuthToken";
import { setPositionData } from "../../components/utilities/geography/setPositionData";
import { getExtensionUrl } from "../../shared/utilities/getExtensionUrl";
import { getCurrentTab } from "../../shared/utilities/tabs/getCurrentTab";
import { AnalyticsManager } from "../AnalyticsManager";
import { isExtensionOpen } from "./isExtensionOpen";

export const openExtension = async (analytics: AnalyticsManager): Promise<void> => {
  disableExtension();
  try {
    await setPositionData();
    await identifyUserToGoogleAnalytics(analytics);
  } catch (error) {
    if (error instanceof GeolocationPositionError && error.message.toLowerCase() === "user denied geolocation") {
      console.debug("Geolocation denied, moving on...");
    } else {
      console.error(error);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Sentry.captureException(error);
    }
  }

  isExtensionOpen({
    extensionOpenCallback: handleExtensionOpen,
    extensionClosedCallback: handleExtensionNotOpen,
  });
  enableExtension();
  updateExtensionIfRequired();
};

const disableExtension = () => {
  chrome.browserAction.disable();
};

const enableExtension = () => {
  chrome.browserAction.enable();
};

const handleExtensionOpen = (tab: chrome.tabs.Tab) => {
  chrome.windows.update(tab.windowId, { focused: true }, () => {
    if (tab.id != null) {
      chrome.tabs.update(tab.id, { active: true });
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Sentry.addBreadcrumb({
      category: "extension",
      message: "Focused extension",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      level: Sentry.Severity.Debug,
    });
  });
};

const handleExtensionNotOpen = () => {
  chrome.tabs.create({ url: chrome.extension.getURL("./index.html") }, (tab) => {
    window.setTimeout(() => {
      // need setTimeout here or else message will be missed by new tab.
      if (tab.id != null) {
        chrome.tabs.sendMessage(tab.id, {});
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Sentry.addBreadcrumb({
          category: "extension",
          message: "Opened extension",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          level: Sentry.Severity.Debug,
        });
      }
    }, 1000);
  });
};

const updateExtensionIfRequired = () => {
  chrome.runtime.requestUpdateCheck((details) => {
    if (details === "update_available") {
      chrome.runtime.reload();
    }
  });
};

const identifyUserToGoogleAnalytics = async (analytics: AnalyticsManager) => {
  const tab = await getCurrentTab();
  const url = getExtensionUrl();
  if (tab.url !== url) {
    // don't reidentify the user if someone is just mashing the icon...
    const token = await getAuthToken(false);
    if (token) {
      const userInfo = await getUserInfo(token);
      const userId = userInfo?.id;
      if (userId) {
        analytics.identify({ userId: userInfo.id });
      }
    }
  }
};
