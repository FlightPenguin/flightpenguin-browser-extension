import { sendAnalyticsEvent } from "../../sendAnalyticsEvent";

export const sendFirstResult = (providerName: string): void => {
  sendAnalyticsEvent({ category: "scraper lifecycle", action: "first result received", label: providerName });
};
