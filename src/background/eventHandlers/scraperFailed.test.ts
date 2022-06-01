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
    expect(providerManager.setAlertOnWindowClose).toHaveBeenCalledTimes(1);
    expect(providerManager.setAlertOnWindowClose).toHaveBeenCalledWith("nofunprovider", false);
    expect(providerManager.closeWindow).toHaveBeenCalledTimes(1);
    expect(providerManager.closeWindow).toHaveBeenCalledWith("nofunprovider");
  });
});
