import * as browser from "webextension-polyfill";

import { sendIndexUnload } from "./sendIndexUnload";

describe("sendIndexUnload happy path", () => {
  it("calls browser.runtime.sendMessage with the correct results", () => {
    sendIndexUnload();

    expect(browser.runtime.sendMessage).toBeCalledWith({
      event: "INDEX_UNLOAD",
    });
  });
});
