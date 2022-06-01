import { DisplayableTripInputFactory } from "../../shared/types/factories/DisplayableTrip";

jest.mock("../ProviderManager");

import { ItineraryInputFactory } from "../../shared/types/factories/Itinerary";
import { ProviderManager } from "../ProviderManager";
import { handleTripSelected } from "./tripSelected";

let providerManager: ProviderManager;
describe("tripSelected full itinerary happy path", () => {
  beforeAll(() => {
    providerManager = new ProviderManager();
    providerManager.sendTripResultsToIndexPage = jest.fn();
    providerManager.isExpectingMoreSearching = jest.fn(() => {
      return false;
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("works correctly with no results", async () => {
    providerManager.isAtMaxSelections = jest.fn(() => {
      return false;
    });

    await handleTripSelected(providerManager, []);
    expect(providerManager.setSelectedTrips).toHaveBeenCalledTimes(1);
    expect(providerManager.setSelectedTrips).toHaveBeenCalledWith([]);
    expect(providerManager.isAtMaxSelections).toHaveBeenCalledTimes(1);
    expect(providerManager.isAtMaxSelections).toHaveBeenCalledWith();
    expect(providerManager.sendTripResultsToIndexPage).toHaveBeenCalledTimes(1);
    expect(providerManager.sendTripResultsToIndexPage).toHaveBeenCalledWith();
    expect(providerManager.isExpectingMoreSearching).toHaveBeenCalledTimes(1);
    expect(providerManager.sendMessageToIndexPage).toHaveBeenCalledTimes(0);
  });

  it("works correctly with results and not done", async () => {
    providerManager.isAtMaxSelections = jest.fn(() => {
      return false;
    });
    const input = DisplayableTripInputFactory.build();

    await handleTripSelected(providerManager, [input]);
    expect(providerManager.setSelectedTrips).toHaveBeenCalledTimes(1);
    expect(providerManager.setSelectedTrips).toHaveBeenCalledWith([expect.anything()]);
    expect(providerManager.isAtMaxSelections).toHaveBeenCalledTimes(1);
    expect(providerManager.isAtMaxSelections).toHaveBeenCalledWith();
    expect(providerManager.sendTripResultsToIndexPage).toHaveBeenCalledTimes(1);
    expect(providerManager.sendTripResultsToIndexPage).toHaveBeenCalledWith();
    expect(providerManager.isExpectingMoreSearching).toHaveBeenCalledTimes(1);
    expect(providerManager.sendMessageToIndexPage).toHaveBeenCalledTimes(0);
  });

  it.todo("works correctly with results and at max selections");
});
