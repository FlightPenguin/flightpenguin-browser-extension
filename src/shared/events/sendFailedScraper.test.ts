import { sendFailedScraper } from "./sendFailedScraper";

describe("sendFailedScraper happy path", () => {
  beforeEach(() => {
    Reflect.deleteProperty(window, "document");
    Object.defineProperty(window, "outerHeight", {
      value: 768,
      writable: true,
    });
    Object.defineProperty(window, "outerWidth", {
      value: 1366,
      writable: true,
    });
    Object.defineProperty(window, "left", {
      value: 0,
      writable: true,
    });
    Object.defineProperty(window, "top", {
      value: 0,
      writable: true,
    });
  });

  it("calls chrome.runtime.sendMessage with the correct results", () => {
    sendFailedScraper("donkey", new Error("donkey fail"));

    expect(chrome.runtime.sendMessage).toBeCalledWith({
      event: "FAILED_SCRAPER",
      providerName: "donkey",
      description: "Error donkey fail",
      windowConfig: {
        height: 768,
        left: 0,
        top: 0,
        width: 1366,
      },
    });
  });
});
