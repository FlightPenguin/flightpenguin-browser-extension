export const sendIndexUnload = (): void => {
  chrome.runtime.sendMessage({
    event: "INDEX_UNLOAD",
  });
};
