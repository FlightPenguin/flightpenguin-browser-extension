import { sendItineraryNotFound } from "./sendItineraryNotFound";

describe("sendItineraryNotFound happy path", () => {
  it("calls chrome.runtime.sendMessage with the correct results", () => {
    sendItineraryNotFound("abcd1234");

    expect(chrome.runtime.sendMessage).toBeCalledWith({
      event: "FLIGHT_NOT_FOUND",
      id: "abcd1234",
    });
  });
});
