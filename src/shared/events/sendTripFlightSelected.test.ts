import { sendTripSelected } from "./sendTripSelected";

describe("sendTripSelected happy path", () => {
  it("calls chrome.runtime.sendMessage with the correct results on departure", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sendTripSelected({ id: "abcd1234" }, 1);

    expect(chrome.runtime.sendMessage).toBeCalledWith({
      event: "TRIP_FLIGHT_SELECTED",
      trip: { id: "abcd1234" },
      containerIndex: 1,
    });
  });
});
