export const focusTab = (windowId: number, tabId: number) => {
  chrome.windows.update(windowId, { focused: true }, (win) => {
    chrome.tabs.update(tabId, {
      selected: true,
    });
  });
  1;
};
