import { openExtension } from "./openExtension";

export const ExtensionInstalledHandler = () => {
  chrome.runtime.onInstalled.addListener(async function (details) {
    console.log("It's alive!");
    console.log(details);
    if (details.reason === "install") {
      await openExtension();
    }
  });
};
