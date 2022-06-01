jest.mock("../ProviderManager");

import { ProviderManager } from "../ProviderManager";
import { handleItineraryNotFound } from "./itineraryNotFound";

let providerManager: ProviderManager;
describe("itineraryNotFound happy path", () => {
  beforeAll(() => {
    providerManager = new ProviderManager();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("works correctly", async () => {
    const id = "abcd1234";
    await handleItineraryNotFound(providerManager, id);
    expect(providerManager.removeItinerary).toHaveBeenCalledTimes(1);
    expect(providerManager.removeItinerary).toHaveBeenCalledWith(id);
    expect(providerManager.sendMessageToIndexPage).toHaveBeenCalledTimes(1);
    expect(providerManager.sendMessageToIndexPage).toHaveBeenCalledWith({
      event: "SELECTED_ITINERARY_NOT_FOUND",
      id,
    });
    expect(providerManager.setPrimaryTabAsFocus).toHaveBeenCalledTimes(1);
    expect(providerManager.setPrimaryTabAsFocus).toHaveBeenCalledWith();
  });
});
