import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";

jest.mock("../ProviderManager");

import { Airport } from "../../components/SearchForm/api/airports/Airport";
import { WindowConfig } from "../../shared/types/WindowConfig";
import { ProviderManager } from "../ProviderManager";
import { handleFormDataReceived } from "./formDataReceived";

let providerManager: ProviderManager;
describe("formDataReceived happy path", () => {
  beforeAll(() => {
    providerManager = new ProviderManager();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("works correctly with no selections", async () => {
    const formData: FlightSearchFormData = {
      from: { key: "CLE", label: "CLE", value: "CLE", name: "CLE" } as Airport,
      to: { key: "NYC", label: "NYC", value: "NYC", name: "NYC" } as Airport,
      roundtrip: false,
      numPax: 1,
      searchByPoints: false,
      pointsType: "CHASE-SAPPHIRE-PREFERRED",
      fromDate: "1",
      toDate: "2",
    };
    const windowConfig: WindowConfig = { left: 0, top: 0 };
    await handleFormDataReceived(providerManager, formData, windowConfig);
    expect(providerManager.closeWindows).toHaveBeenCalledTimes(1);
    expect(providerManager.closeWindows).toHaveBeenCalledWith();
    expect(providerManager.searchForResults).toHaveBeenCalledTimes(1);
    expect(providerManager.searchForResults).toHaveBeenCalledWith(formData, windowConfig);
  });
});
