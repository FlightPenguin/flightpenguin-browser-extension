jest.mock("../ProviderManager");

import { ProviderManager } from "../ProviderManager";
import { handleScraperFailed } from "./scraperFailed";

let providerManager: ProviderManager;
describe("scraperFailed happy path", () => {
  beforeAll(() => {
    providerManager = new ProviderManager();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("works correctly", async () => {
    await handleScraperFailed(providerManager, "nofunprovider");
    expect(providerManager.setAlertOnTabClose).toHaveBeenCalledTimes(1);
    expect(providerManager.setAlertOnTabClose).toHaveBeenCalledWith("nofunprovider", false);
    expect(providerManager.closeTab).toHaveBeenCalledTimes(1);
    expect(providerManager.closeTab).toHaveBeenCalledWith("nofunprovider");
  });
});
