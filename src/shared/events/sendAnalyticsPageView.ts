import * as browser from "webextension-polyfill";

export const sendAnalyticsPageView = (): void => {
  browser.runtime.sendMessage({
    event: "LOG_ANALYTICS_PAGE_VIEW",
    pageTitle: document.title,
    url: document.location.href,
    path: document.location.pathname,
  });
};
