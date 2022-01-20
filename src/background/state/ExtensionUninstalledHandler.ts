import { AnalyticsManager } from "../AnalyticsManager";

export const ExtensionUninstalledHandler = (analytics: AnalyticsManager): void => {
  chrome.runtime.setUninstallURL("https://forms.gle/s1BfyyBQb5qtXr7H6", function () {
    analytics.track({ category: "lifecycle", action: "Uninstall" });
    console.log("Bye");
  });
};
