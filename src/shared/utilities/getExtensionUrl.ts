export const getExtensionUrl = () => {
  const extensionId = chrome.runtime.id;
  return `chrome-extension://${extensionId}/index.html`;
};
