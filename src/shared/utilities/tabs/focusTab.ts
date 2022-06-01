import * as browser from "webextension-polyfill";

export const focusTab = async (tab: browser.Tabs.Tab): Promise<void> => {
  if (tab.windowId !== null && tab.windowId !== undefined) {
    await browser.windows.update(tab.windowId, { focused: true });
    if (tab.id !== null && tab.id !== undefined) {
      await browser.tabs.update(tab.id, { active: true });
    }
  }
};
