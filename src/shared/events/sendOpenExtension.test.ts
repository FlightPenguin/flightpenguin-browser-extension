import { sendOpenExtension } from "./sendOpenExtension";

describe("sendOpenExtension happy path", () => {
  it("calls chrome.runtime.sendMessage with the correct results", () => {
    sendOpenExtension();

    expect(chrome.runtime.sendMessage).toBeCalledWith({
      event: "OPEN_EXTENSION",
    });
  });
});
