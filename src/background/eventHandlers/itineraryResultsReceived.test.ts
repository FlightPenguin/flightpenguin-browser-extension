jest.mock("../ProviderManager");

import { ItineraryInputFactory } from "../../shared/types/factories/Itinerary";
import { ProviderManager } from "../ProviderManager";
import { handleItineraryResultsReceived } from "./itineraryResultsReceived";

let providerManager: ProviderManager;
describe("itineraryResultsReceived happy path", () => {
  beforeAll(() => {
    providerManager = new ProviderManager();
    providerManager.sendTripResultsToIndexPage = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("works correctly with no results", async () => {
    await handleItineraryResultsReceived(providerManager, [], "testflights");
    expect(providerManager.addItinerary).toHaveBeenCalledTimes(0);
    expect(providerManager.getTabId).toHaveBeenCalledTimes(0);
    expect(providerManager.sendTripResultsToIndexPage).toHaveBeenCalledTimes(0);
  });

  it("works correctly with results but no tab", async () => {
    providerManager.getTabId = jest.fn((id) => {
      return undefined;
    });
    const input1 = ItineraryInputFactory.build();
    const input2 = ItineraryInputFactory.build();

    await handleItineraryResultsReceived(providerManager, [input1, input2], "testflights");
    expect(providerManager.addItinerary).toHaveBeenCalledTimes(2);
    expect(providerManager.getTabId).toHaveBeenCalledTimes(1);
    expect(providerManager.sendTripResultsToIndexPage).toHaveBeenCalledTimes(0);
  });

  it("works correctly", async () => {
    providerManager.getTabId = jest.fn((id) => {
      return 12;
    });
    const input1 = ItineraryInputFactory.build();
    const input2 = ItineraryInputFactory.build();

    await handleItineraryResultsReceived(providerManager, [input1, input2], "testflights");
    expect(providerManager.addItinerary).toHaveBeenCalledTimes(2);
    expect(providerManager.getTabId).toHaveBeenCalledTimes(1);
    expect(providerManager.sendTripResultsToIndexPage).toHaveBeenCalledTimes(1);
  });
});
