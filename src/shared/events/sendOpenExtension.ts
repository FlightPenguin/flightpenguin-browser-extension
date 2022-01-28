export const sendOpenExtension = (): void => {
  console.debug("Requesting to open extension");
  chrome.runtime.sendMessage({
    event: "OPEN_EXTENSION",
  });
};
