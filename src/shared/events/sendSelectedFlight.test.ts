import { sendSelectedFlight } from "./sendSelectedFlight";

describe("sendSelectedFlight happy path", () => {
  it("calls chrome.runtime.sendMessage with the correct results on departure", () => {
    sendSelectedFlight("DEPARTURE", "abcd1234");

    expect(chrome.runtime.sendMessage).toBeCalledWith({
      event: "DEPARTURE_SELECTED",
      departureId: "abcd1234",
    });
  });

  it("does not call with return", () => {
    sendSelectedFlight("RETURN", "abcd1234");

    expect(chrome.runtime.sendMessage).toHaveBeenCalledTimes(1);
  });
});
