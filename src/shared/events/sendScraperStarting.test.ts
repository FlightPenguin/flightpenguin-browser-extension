import { sendScraperStarting } from "./sendScraperStarting";

describe("sendScraperStarting happy path", () => {
  it("calls chrome.runtime.sendMessage with the correct results", () => {
    sendScraperStarting("donkey");

    expect(chrome.runtime.sendMessage).toBeCalledWith({
      event: "STARTING_SCRAPER",
      providerName: "donkey",
    });
  });
});
