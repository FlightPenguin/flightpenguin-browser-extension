import { sendIndexUnload } from "./sendIndexUnload";

describe("sendIndexUnload happy path", () => {
  it("calls chrome.runtime.sendMessage with the correct results", () => {
    sendIndexUnload();

    expect(chrome.runtime.sendMessage).toBeCalledWith({
      event: "INDEX_UNLOAD",
    });
  });
});
