import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";

jest.mock("../ProviderManager");

import { Airport } from "../../components/SearchForm/api/airports/Airport";
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
    await handleFormDataReceived(providerManager, formData);
    expect(providerManager.closeTabs).toHaveBeenCalledTimes(1);
    expect(providerManager.closeTabs).toHaveBeenCalledWith();
    expect(providerManager.searchForResults).toHaveBeenCalledTimes(1);
    expect(providerManager.searchForResults).toHaveBeenCalledWith(formData);
  });
});
