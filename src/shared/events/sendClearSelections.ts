export const sendClearSelections = (activeContainerIndex: number): void => {
  chrome.runtime.sendMessage({
    event: "CLEAR_SELECTIONS",
    activeContainerIndex,
  });
};
