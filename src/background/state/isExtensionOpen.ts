interface Properties {
  extensionOpenCallback: (tab: chrome.tabs.Tab) => any;
  extensionClosedCallback: () => any;
}

export const isExtensionOpen = ({ extensionOpenCallback, extensionClosedCallback }: Properties) => {
  const url = getExtensionUrl();
  chrome.tabs.query({}, function (tabs) {
    const tab = tabs.find((tab) => tab.url === url);
    if (tab) {
      extensionOpenCallback(tab);
    } else {
      extensionClosedCallback();
    }
  });
};

const getExtensionUrl = () => {
  const extensionId = chrome.runtime.id;
  return `chrome-extension://${extensionId}/index.html`;
};