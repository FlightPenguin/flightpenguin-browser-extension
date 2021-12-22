import { sendAnalyticsEvent } from "../../sendAnalyticsEvent";

export const sendSuccess = (providerName: string, flightCount: number): void => {
  sendAnalyticsEvent({ category: "scraper lifecycle", action: "begins", label: providerName, value: flightCount });
};
