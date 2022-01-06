import { AnalyticsManager } from "../AnalyticsManager";

export const handleLogAnalyticsEvent = (analytics: AnalyticsManager, message: any): void => {
  const { category, action, label, value } = message;
  analytics.track({ category, action, label, value });
};
