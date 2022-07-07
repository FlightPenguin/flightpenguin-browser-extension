import { sendAnalyticsEvent } from "../sendAnalyticsEvent";

export const sendSocialShareClick = (platform: string): void => {
  sendAnalyticsEvent({ category: "social media share", action: "share click intent", label: platform });
};
