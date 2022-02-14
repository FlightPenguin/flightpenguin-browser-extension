import { AnalyticsManager } from "../AnalyticsManager";

export const handleLogAnalyticsUserIdentified = (analytics: AnalyticsManager, message: any): void => {
  const { userId } = message;
  analytics.identify({ userId });
};
