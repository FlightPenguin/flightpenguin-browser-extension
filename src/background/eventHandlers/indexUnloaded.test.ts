import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";

jest.mock("../ProviderManager");

import { Airport } from "../../components/SearchForm/api/airports/Airport";
import { ProviderManager } from "../ProviderManager";
import { handleIndexUnloaded } from "./indexUnloaded";

let providerManager: ProviderManager;
describe("indexUnloaded happy path", () => {
  beforeAll(() => {
    providerManager = new ProviderManager();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("works correctly with no form data", async () => {
    providerManager.getFormData = jest.fn(() => {
      return null;
    });
    await handleIndexUnloaded(providerManager);
    expect(providerManager.getFormData).toHaveBeenCalledTimes(1);
    expect(providerManager.closeWindows).toHaveBeenCalledTimes(0);
  });

  it("works correctly with form data", async () => {
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
    providerManager.getFormData = jest.fn(() => {
      return formData;
    });
    await handleIndexUnloaded(providerManager);
    expect(providerManager.getFormData).toHaveBeenCalledTimes(1);
    expect(providerManager.closeWindows).toHaveBeenCalledTimes(1);
  });
});
