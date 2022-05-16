import * as browser from "webextension-polyfill";

import { sendScraperStarting } from "./sendScraperStarting";

describe("sendScraperStarting happy path", () => {
  it("calls browser.runtime.sendMessage with the correct results", () => {
    sendScraperStarting("donkey");

    expect(browser.runtime.sendMessage).toBeCalledWith({
      event: "STARTING_SCRAPER",
      providerName: "donkey",
    });
  });
});
