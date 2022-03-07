export const sendFocusWebpage = (providerName: string): void => {
  chrome.runtime.sendMessage({
    event: "FOCUS_WEBPAGE",
    provider: providerName,
  });
};
