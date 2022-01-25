import { sendAnalyticsEvent } from "../sendAnalyticsEvent";

export const sendSearchDecision = (providerName: string): void => {
  sendAnalyticsEvent({ category: "flight search", action: "Search Choice Offering", label: providerName });
};
