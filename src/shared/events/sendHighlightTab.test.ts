import { sendHighlightTab } from "./sendHighlightTab";

describe("sendHighlightTab happy path", () => {
  it("calls chrome.runtime.sendMessage with the correct results", () => {
    sendHighlightTab("abcd1234", "defg5678");

    expect(chrome.runtime.sendMessage).toBeCalledWith({
      event: "HIGHLIGHT_TAB",
      selectedDepartureId: "abcd1234",
      selectedReturnId: "defg5678",
    });
  });
});
