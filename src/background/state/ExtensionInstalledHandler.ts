import { openExtension } from "./openExtension";

export const ExtensionInstalledHandler = () => {
  chrome.runtime.onInstalled.addListener(async function (details) {
    console.log("It's alive!");
    console.log(details);
    await openExtension();
  });
};
