import { sendItinerariesEvent } from "./sendItineraries";

describe("sendItineraries happy path", () => {
  it("calls chrome.runtime.sendMessage with the correct results", () => {
    const flights = [{ cat: "meow" }];

    sendItinerariesEvent("donkey", flights);

    expect(chrome.runtime.sendMessage).toBeCalledWith({
      event: "FLIGHT_RESULTS_RECEIVED",
      flights: flights,
      provider: "donkey",
    });
  });
});
