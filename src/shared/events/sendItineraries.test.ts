import { sendItinerariesEvent } from "./sendItineraries";

describe("sendItineraries happy path", () => {
  it("calls chrome.runtime.sendMessage with the correct results", () => {
    const itineraries = [{ cat: "meow" }];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sendItinerariesEvent("donkey", itineraries);

    expect(chrome.runtime.sendMessage).toBeCalledWith({
      event: "ITINERARY_RESULTS",
      itineraries: itineraries,
      provider: "donkey",
    });
  });
});
