import * as browser from "webextension-polyfill";

import { sendScraperComplete } from "./sendScraperComplete";

describe("sendScraperComplete happy path", () => {
  it("calls browser.runtime.sendMessage with the correct results", () => {
    sendScraperComplete("donkey");

    expect(browser.runtime.sendMessage).toBeCalledWith({
      event: "SUCCESSFUL_SCRAPER",
      providerName: "donkey",
    });
  });
});
