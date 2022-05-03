import * as browser from "webextension-polyfill";

import { sendAnalyticsEvent } from "./sendAnalyticsEvent";

describe("sendAnalyticsEvent happy path", () => {
  it("calls browser.runtime.sendMessage with the correct results", () => {
    sendAnalyticsEvent({ category: "a category", action: "an action", label: "a label", value: 100 });

    expect(browser.runtime.sendMessage).toBeCalledWith({
      action: "an action",
      category: "a category",
      event: "LOG_ANALYTICS_EVENT",
      label: "a label",
      value: 100,
    });
  });

  it("calls browser.runtime.sendMessage without the optional arguments", () => {
    sendAnalyticsEvent({ category: "a category", action: "an action" });

    expect(browser.runtime.sendMessage).toBeCalledWith({
      action: "an action",
      category: "a category",
      event: "LOG_ANALYTICS_EVENT",
      label: undefined,
      value: undefined,
    });
  });
});
