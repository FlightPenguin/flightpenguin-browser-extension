import * as browser from "webextension-polyfill";

import { sendItinerariesEvent } from "./sendItineraries";

describe("sendItineraries happy path", () => {
  it("calls browser.runtime.sendMessage with the correct results", () => {
    const itineraries = [{ cat: "meow" }];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sendItinerariesEvent("donkey", itineraries);

    expect(browser.runtime.sendMessage).toBeCalledWith({
      event: "ITINERARY_RESULTS",
      itineraries: itineraries,
      provider: "donkey",
    });
  });
});
