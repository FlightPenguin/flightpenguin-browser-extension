import { sendFocusWebpage } from "./sendFocusWebpage";

describe("sendFocusWebpage happy path", () => {
  it("calls browser.runtime.sendMessage with the correct results", () => {
    sendFocusWebpage("abcd1234");

    expect(browser.runtime.sendMessage).toBeCalledWith({
      event: "FOCUS_WEBPAGE",
      provider: "abcd1234",
    });
  });
});
