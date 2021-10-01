import { openExtension } from "./openExtension";

export const ExtensionOpenedHandler = () => {
  chrome.browserAction.onClicked.addListener(() => {
    openExtension();
  });
};
