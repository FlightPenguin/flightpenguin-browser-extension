import { EventInput } from "../../background/AnalyticsManager";

export const sendAnalyticsEvent = ({ category, action, label, value }: EventInput): void => {
  chrome.runtime.sendMessage({
    event: "LOG_ANALYTICS_EVENT",
    category,
    action,
    label,
    value,
  });
};
