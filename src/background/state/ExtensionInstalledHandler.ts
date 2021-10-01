import { openExtension } from "./openExtension";

export const ExtensionInstalledHandler = () => {
  chrome.runtime.onInstalled.addListener(function (details) {
    console.log("It's alive!");
    console.log(details);
    openExtension();
  });
};
