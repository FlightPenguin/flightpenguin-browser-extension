import { sendFocusWebpage } from "./sendFocusWebpage";

describe("sendFocusWebpage happy path", () => {
  it("calls chrome.runtime.sendMessage with the correct results", () => {
    sendFocusWebpage("abcd1234");

    expect(chrome.runtime.sendMessage).toBeCalledWith({
      event: "FOCUS_WEBPAGE",
      provider: "abcd1234",
    });
  });
});
