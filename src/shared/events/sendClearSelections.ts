export const sendClearSelections = (): void => {
  chrome.runtime.sendMessage({
    event: "CLEAR_SELECTIONS",
  });
};
