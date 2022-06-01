import * as browser from "webextension-polyfill";

import { sendOpenExtension } from "./sendOpenExtension";

describe("sendOpenExtension happy path", () => {
  it("calls browser.runtime.sendMessage with the correct results", () => {
    sendOpenExtension();

    expect(browser.runtime.sendMessage).toBeCalledWith({
      event: "OPEN_EXTENSION",
    });
  });
});
