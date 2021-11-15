import { getSubscriptionValidity } from "../../auth";
import { getAuthToken } from "../../auth/getAuthToken";
import ORIGIN from "../../config";
import { isExtensionOpen } from "./isExtensionOpen";

export const openExtension = async (): Promise<void> => {
  try {
    disableExtension();
    const token = await getAuthToken();
    const { status } = await getSubscriptionValidity(token);
    if (status) {
      isExtensionOpen({
        extensionOpenCallback: handleExtensionOpen,
        extensionClosedCallback: handleExtensionNotOpen,
      });
    } else {
      chrome.tabs.create({ url: ORIGIN });
    }
  } catch (e) {
    chrome.tabs.create({ url: ORIGIN });
  } finally {
    enableExtension();
    updateExtensionIfRequired();
  }
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
  });
};

const handleExtensionNotOpen = () => {
  chrome.tabs.create({ url: chrome.extension.getURL("./index.html") }, (tab) => {
    window.setTimeout(() => {
      // need setTimeout here or else message will be missed by new tab.
      if (tab.id != null) {
        chrome.tabs.sendMessage(tab.id, {});
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
