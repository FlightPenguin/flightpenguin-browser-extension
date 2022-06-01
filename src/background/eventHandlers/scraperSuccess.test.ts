jest.mock("../ProviderManager");

import { ProviderManager } from "../ProviderManager";
import { handleScraperSuccess } from "./scraperSuccess";

let providerManager: ProviderManager;
describe("scraperSuccess happy path", () => {
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
    await handleScraperSuccess(providerManager, "funprovider");
    expect(providerManager.setSuccessful).toHaveBeenCalledTimes(1);
    expect(providerManager.setSuccessful).toHaveBeenCalledWith("funprovider");
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
    await handleScraperSuccess(providerManager, "funprovider");
    expect(providerManager.setSuccessful).toHaveBeenCalledTimes(1);
    expect(providerManager.setSuccessful).toHaveBeenCalledWith("funprovider");
    expect(providerManager.isComplete).toHaveBeenCalledTimes(1);
    expect(providerManager.sendMessageToIndexPage).toHaveBeenCalledTimes(0);
  });
});
