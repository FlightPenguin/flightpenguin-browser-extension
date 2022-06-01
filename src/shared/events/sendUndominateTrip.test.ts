import * as browser from "webextension-polyfill";

import { sendUndominateTrip } from "./sendUndominateTrip";

describe("sendUndominateTrip happy path", () => {
  it("calls browser.runtime.sendMessage", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sendUndominateTrip("abcd1234");

    expect(browser.runtime.sendMessage).toBeCalledWith({
      event: "UNDOMINATE_TRIP",
      tripId: "abcd1234",
    });
  });
});
