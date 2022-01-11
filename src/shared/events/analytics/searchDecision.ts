import { sendAnalyticsEvent } from "../sendAnalyticsEvent";

export const sendSearchDecision = (providerName: string): void => {
  sendAnalyticsEvent({ category: "Flight Search", action: "Search Choice Offering", label: providerName });
};
