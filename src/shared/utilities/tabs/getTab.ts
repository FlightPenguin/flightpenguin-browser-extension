interface GetTabInput {
  tabId: number;
  windowId: number;
}

export const getTab = async ({ tabId, windowId }: GetTabInput): Promise<chrome.tabs.Tab | null> => {
  return await getTabPromise({ tabId, windowId });
};

const getTabPromise = ({ tabId, windowId }: GetTabInput): Promise<chrome.tabs.Tab | null> => {
  return new Promise((resolve) => {
    chrome.tabs.query({ windowId: windowId }, (tabs) => {
      if (tabs && tabs.length) {
        const tab = tabs.filter((tab) => tab.id === tabId)[0] || null;
        resolve(tab);
      } else {
        return null;
      }
    });
  });
};
