import { getExtensionUrl } from "../getExtensionUrl";

export const focusPrimaryTab = async (): Promise<chrome.tabs.Tab> => {
  return await focusPrimaryTabPromise();
};

const focusPrimaryTabPromise = (): Promise<chrome.tabs.Tab> => {
  return new Promise((resolve) => {
    const url = getExtensionUrl();

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
        resolve(primaryTab);
      }
    });
  });
};
