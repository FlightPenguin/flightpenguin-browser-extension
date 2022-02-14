import { openExtension } from "./openExtension";

export const ExtensionOpenedHandler = (): void => {
  chrome.browserAction.onClicked.addListener(() => {
    openExtension();
  });
};
