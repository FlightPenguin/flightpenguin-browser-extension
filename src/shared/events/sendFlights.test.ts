import { sendFlightsEvent } from "./sendFlights";

describe("sendFlights happy path", () => {
  it("calls chrome.runtime.sendMessage with the correct results", () => {
    const flights = [{ cat: "meow" }];

    sendFlightsEvent("donkey", flights);

    expect(chrome.runtime.sendMessage).toBeCalledWith({
      event: "FLIGHT_RESULTS_RECEIVED",
      flights: flights,
      provider: "donkey",
    });
  });
});
