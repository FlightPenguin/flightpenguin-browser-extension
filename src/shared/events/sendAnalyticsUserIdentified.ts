import * as browser from "webextension-polyfill";

export const sendAnalyticsUserIdentified = (id: string, email?: string | undefined | null): void => {
  browser.runtime.sendMessage({
    event: "LOG_ANALYTICS_USER_IDENTIFIED",
    userId: id,
    email,
  });
};
