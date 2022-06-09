jest.mock("../ProviderManager");

import { ProviderManager } from "../ProviderManager";
import { handleNoFlightsFound } from "./noFlightsFound";

let providerManager: ProviderManager;
describe("noFlightsFound happy path", () => {
  beforeAll(() => {
    providerManager = new ProviderManager();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("works correctly when complete", async () => {
    providerManager.isComplete = jest.fn(() => {
      return true;
    });
    await handleNoFlightsFound(providerManager, "nofunprovider");
    expect(providerManager.setSuccessful).toHaveBeenCalledTimes(1);
    expect(providerManager.setSuccessful).toHaveBeenCalledWith("nofunprovider");
    expect(providerManager.closeTab).toHaveBeenCalledTimes(1);
    expect(providerManager.closeTab).toHaveBeenCalledWith("nofunprovider");
    expect(providerManager.isComplete).toHaveBeenCalledTimes(1);
    expect(providerManager.sendMessageToIndexPage).toHaveBeenCalledWith(
      { event: "SCRAPING_STATUS", complete: true },
      3000,
    );
  });

  it("works correctly when incomplete", async () => {
    providerManager.isComplete = jest.fn(() => {
      return false;
    });
    await handleNoFlightsFound(providerManager, "nofunprovider");
    expect(providerManager.setSuccessful).toHaveBeenCalledTimes(1);
    expect(providerManager.setSuccessful).toHaveBeenCalledWith("nofunprovider");
    expect(providerManager.closeTab).toHaveBeenCalledTimes(1);
    expect(providerManager.closeTab).toHaveBeenCalledWith("nofunprovider");
    expect(providerManager.isComplete).toHaveBeenCalledTimes(1);
    expect(providerManager.sendMessageToIndexPage).toHaveBeenCalledTimes(0);
  });
});
