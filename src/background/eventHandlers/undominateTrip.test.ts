jest.mock("../ProviderManager");

import { ProviderManager } from "../ProviderManager";
import { handleUndominateTrip } from "./undominateTrip";

let providerManager: ProviderManager;
describe("undominateTrip happy path", () => {
  beforeAll(() => {
    providerManager = new ProviderManager();
    providerManager.sendTripResultsToIndexPage = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("works correctly", async () => {
    await handleUndominateTrip(providerManager, "tripfail");
    expect(providerManager.addIdToDominationDenyList).toHaveBeenCalledTimes(1);
    expect(providerManager.addIdToDominationDenyList).toHaveBeenCalledWith("tripfail");
    expect(providerManager.sendTripResultsToIndexPage).toHaveBeenCalledTimes(1);
    expect(providerManager.sendTripResultsToIndexPage).toHaveBeenCalledWith();
  });
});
