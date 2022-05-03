import * as browser from "webextension-polyfill";

import { EventInput } from "../../background/AnalyticsManager";

export const sendAnalyticsEvent = ({ category, action, label, value }: EventInput): void => {
  browser.runtime.sendMessage({
    event: "LOG_ANALYTICS_EVENT",
    category,
    action,
    label,
    value,
  });
};
