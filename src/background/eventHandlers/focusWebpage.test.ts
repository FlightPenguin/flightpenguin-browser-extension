jest.mock("../ProviderManager");

import { ProviderManager } from "../ProviderManager";
import { handleFocusWebpage } from "./focusWebpage";

let providerManager: ProviderManager;
describe("focusWebpage happy path", () => {
  beforeAll(() => {
    providerManager = new ProviderManager();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("works correctly with no selections", async () => {
    await handleFocusWebpage(providerManager);
    expect(providerManager.setPrimaryTabAsFocus).toHaveBeenCalledTimes(1);
    expect(providerManager.setPrimaryTabAsFocus).toHaveBeenCalledWith();
  });
});
