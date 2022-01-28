import { sendReturnFlightsEvent } from "./sendReturnFlights";

describe("sendFlights happy path", () => {
  it("calls chrome.runtime.sendMessage with the correct results", () => {
    const flights = [{ cat: "meow" }];

    sendReturnFlightsEvent("donkey", flights);

    expect(chrome.runtime.sendMessage).toBeCalledWith({
      event: "RETURN_FLIGHTS_RECEIVED",
      flights: flights,
      provider: "donkey",
    });
  });
});
