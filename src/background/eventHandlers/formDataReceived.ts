import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { WindowConfig } from "../../shared/types/WindowConfig";
import { ProviderManager } from "../ProviderManager";

export const handleFormDataReceived = (
  providerManager: ProviderManager,
  formData: FlightSearchFormData,
  windowConfig: WindowConfig,
) => {
  providerManager.searchForResults(formData, windowConfig);
};
