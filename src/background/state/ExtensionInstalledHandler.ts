import { setRecentlyInstalled } from "../../shared/utilities/recentlyInstalledManager";
import { openExtension } from "./openExtension";

export const ExtensionInstalledHandler = () => {
  chrome.runtime.onInstalled.addListener(async function (details) {
    console.log("It's alive!");
    console.log(details);
    if (details.reason === "install") {
      setRecentlyInstalled(true);
      await openExtension();
    }
  });
};
