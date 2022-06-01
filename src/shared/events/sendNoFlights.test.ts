import * as browser from "webextension-polyfill";

import { sendNoFlightsEvent } from "./sendNoFlights";

describe("sendNoFlightsEvent happy path", () => {
  it("calls browser.runtime.sendMessage with the correct results", () => {
    sendNoFlightsEvent("donkey");

    expect(browser.runtime.sendMessage).toBeCalledWith({
      event: "NO_FLIGHTS_FOUND",
      provider: "donkey",
    });
  });
});
