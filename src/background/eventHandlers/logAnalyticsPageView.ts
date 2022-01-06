import { AnalyticsManager } from "../AnalyticsManager";

export const handleLogAnalyticsPageView = (analytics: AnalyticsManager, message: any): void => {
  const { pageTitle, url, path } = message;
  analytics.pageview({ pageTitle, url, path });
};
