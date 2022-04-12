import { sendNoFlightsEvent } from "./sendNoFlights";

describe("sendNoFlightsEvent happy path", () => {
  it("calls chrome.runtime.sendMessage with the correct results", () => {
    sendNoFlightsEvent("donkey");

    expect(chrome.runtime.sendMessage).toBeCalledWith({
      event: "NO_FLIGHTS_FOUND",
      provider: "donkey",
    });
  });
});
