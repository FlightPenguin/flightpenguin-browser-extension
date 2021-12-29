import { sendAnalyticsEvent } from "../../sendAnalyticsEvent";

export const sendFailed = (providerName: string): void => {
  sendAnalyticsEvent({ category: "scraper lifecycle", action: "failed", label: providerName });
};
