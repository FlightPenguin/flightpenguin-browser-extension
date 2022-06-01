import { DisplayableTripInputFactory } from "../../shared/types/factories/DisplayableTrip";

jest.mock("../ProviderManager");

import { ProviderManager } from "../ProviderManager";
import { handleClearSelections } from "./clearSelections";

let providerManager: ProviderManager;
describe("clearSelections full itinerary path", () => {
  beforeAll(() => {
    providerManager = new ProviderManager();
    providerManager.sendTripResultsToIndexPage = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("works correctly with no selections", async () => {
    await handleClearSelections(providerManager, []);
    expect(providerManager.setSelectedTrips).toHaveBeenCalledTimes(1);
    expect(providerManager.setSelectedTrips).toHaveBeenCalledWith([]);
    expect(providerManager.sendTripResultsToIndexPage).toHaveBeenCalledTimes(1);
    expect(providerManager.sendTripResultsToIndexPage).toHaveBeenCalledWith();
  });

  it("works correctly with selections", async () => {
    const input1 = DisplayableTripInputFactory.build();
    const input2 = DisplayableTripInputFactory.build();

    await handleClearSelections(providerManager, [input1, input2]);
    expect(providerManager.setSelectedTrips).toHaveBeenCalledTimes(1);
    expect(providerManager.setSelectedTrips).toHaveBeenCalledWith([expect.anything(), expect.anything()]);
    expect(providerManager.sendTripResultsToIndexPage).toHaveBeenCalledTimes(1);
    expect(providerManager.sendTripResultsToIndexPage).toHaveBeenCalledWith();
  });
});
