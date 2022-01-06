import { sendAnalyticsEvent } from "../../sendAnalyticsEvent";

export const sendProcessing = (providerName: string): void => {
  sendAnalyticsEvent({ category: "scraper lifecycle", action: "begins", label: providerName });
};
