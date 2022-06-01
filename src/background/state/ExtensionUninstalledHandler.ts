import * as browser from "webextension-polyfill";

import { AnalyticsManager } from "../AnalyticsManager";

export const ExtensionUninstalledHandler = (analytics: AnalyticsManager): void => {
  browser.runtime.setUninstallURL("https://forms.gle/s1BfyyBQb5qtXr7H6");
};
