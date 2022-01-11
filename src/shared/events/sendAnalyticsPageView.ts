export const sendAnalyticsPageView = (): void => {
  chrome.runtime.sendMessage({
    event: "LOG_ANALYTICS_PAGE_VIEW",
    pageTitle: document.title,
    url: document.location.href,
    path: document.location.pathname,
  });
};
