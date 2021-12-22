import { setRecentlyInstalled } from "../../shared/utilities/recentlyInstalledManager";
import { AnalyticsManager } from "../AnalyticsManager";
import { openExtension } from "./openExtension";

export const ExtensionInstalledHandler = (analytics: AnalyticsManager): void => {
  chrome.runtime.onInstalled.addListener(async function (details) {
    console.log("It's alive!");
    console.log(details);

    switch (details.reason.toLowerCase()) {
      case "install":
        analytics.track({ category: "lifecycle", action: "Install" });
        setRecentlyInstalled(true);
        await openExtension();
        break;
      case "update":
        analytics.track({ category: "lifecycle", action: "Update" });
        break;
      case "chrome_update":
        analytics.track({ category: "lifecycle", action: "Chrome update" });
        break;
      case "shared_module_update":
        analytics.track({ category: "lifecycle", action: "Shared update" });
        break;
      default:
        console.error(`What is this install reason: ${details.reason}`);
        break;
    }
  });
};
