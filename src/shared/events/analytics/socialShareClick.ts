import { sendAnalyticsEvent } from "../sendAnalyticsEvent";

export const sendSocialShareClick = (platform: string): void => {
  sendAnalyticsEvent({ category: "referral", action: "social media share click intent", label: platform });
};
