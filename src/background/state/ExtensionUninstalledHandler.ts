import * as browser from "webextension-polyfill";

export const ExtensionUninstalledHandler = (): void => {
  browser.runtime.setUninstallURL("https://forms.gle/s1BfyyBQb5qtXr7H6");
};
