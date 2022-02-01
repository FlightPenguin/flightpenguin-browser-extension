import { sendClearSelections } from "./sendClearSelections";

describe("sendClearSelections happy path", () => {
  it("calls chrome.runtime.sendMessage with the correct results", () => {
    sendClearSelections();

    expect(chrome.runtime.sendMessage).toBeCalledWith({
      event: "CLEAR_SELECTIONS",
    });
  });
});
