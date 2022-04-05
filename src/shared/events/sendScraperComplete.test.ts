import { sendScraperComplete } from "./sendScraperComplete";

describe("sendScraperComplete happy path", () => {
  it("calls chrome.runtime.sendMessage with the correct results", () => {
    sendScraperComplete("donkey");

    expect(chrome.runtime.sendMessage).toBeCalledWith({
      event: "SUCCESSFUL_SCRAPER",
      providerName: "donkey",
    });
  });
});
