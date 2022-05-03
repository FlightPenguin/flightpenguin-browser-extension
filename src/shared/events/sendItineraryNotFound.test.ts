import * as browser from "webextension-polyfill";

import { sendItineraryNotFound } from "./sendItineraryNotFound";

describe("sendItineraryNotFound happy path", () => {
  it("calls browser.runtime.sendMessage with the correct results", () => {
    sendItineraryNotFound("abcd1234");

    expect(browser.runtime.sendMessage).toBeCalledWith({
      event: "ITINERARY_NOT_FOUND",
      id: "abcd1234",
    });
  });
});
