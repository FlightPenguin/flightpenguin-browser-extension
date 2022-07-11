import { sendAnalyticsEvent } from "../sendAnalyticsEvent";

export const sendShareLinkCopied = (): void => {
  sendAnalyticsEvent({ category: "referral", action: "private share link copied" });
};
