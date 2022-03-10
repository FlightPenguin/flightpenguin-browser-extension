import { sendFlightNotFound } from "./sendFlightNotFound";

describe("sendFlightNotFound happy path", () => {
  it("calls chrome.runtime.sendMessage with the correct results", () => {
    sendFlightNotFound("abcd1234");

    expect(chrome.runtime.sendMessage).toBeCalledWith({
      event: "FLIGHT_NOT_FOUND",
      id: "abcd1234",
    });
  });
});
