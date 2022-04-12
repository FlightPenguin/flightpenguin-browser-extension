export const getExtensionUrl = () => {
  return `chrome-extension://${chrome.runtime.id}/index.html`;
};
