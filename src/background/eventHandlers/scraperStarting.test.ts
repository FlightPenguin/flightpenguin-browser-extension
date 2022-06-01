jest.mock("../ProviderManager");

import { ProviderManager } from "../ProviderManager";
import { handleScraperStarting } from "./scraperStarting";

let providerManager: ProviderManager;
describe("scraperFailed happy path", () => {
  beforeAll(() => {
    providerManager = new ProviderManager();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("works correctly", async () => {
    await handleScraperStarting(providerManager, "itbegins");
    expect(providerManager.setParsing).toHaveBeenCalledTimes(1);
    expect(providerManager.setParsing).toHaveBeenCalledWith("itbegins");
  });
});
