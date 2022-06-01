import * as browser from "webextension-polyfill";

import { sendClearSelections } from "./sendClearSelections";

describe("sendClearSelections happy path", () => {
  it("calls browser.runtime.sendMessage with the correct results", () => {
    sendClearSelections([]);

    expect(browser.runtime.sendMessage).toBeCalledWith({
      event: "CLEAR_SELECTIONS",
      currentSelections: [],
    });
  });
});
