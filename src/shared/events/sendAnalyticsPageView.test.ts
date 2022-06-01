import * as browser from "webextension-polyfill";

import { sendAnalyticsPageView } from "./sendAnalyticsPageView";

describe("sendAnalyticsPageView happy path", () => {
  beforeEach(() => {
    Reflect.deleteProperty(window, "document");
    Object.defineProperty(window, "document", {
      value: {
        title: "A page title",
        location: {
          href: "https://www.example.net",
          pathname: "/meow.html",
        },
      },
      writable: true,
    });
  });

  it("calls browser.runtime.sendMessage with the correct results", () => {
    sendAnalyticsPageView();

    expect(browser.runtime.sendMessage).toBeCalledWith({
      event: "LOG_ANALYTICS_PAGE_VIEW",
      pageTitle: "A page title",
      path: "/meow.html",
      url: "https://www.example.net",
    });
  });
});
