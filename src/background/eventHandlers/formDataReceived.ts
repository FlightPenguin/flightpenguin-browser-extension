import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { WindowConfig } from "../../shared/types/WindowConfig";
import { ProviderManager } from "../ProviderManager";

export const handleFormDataReceived = (
  providerManager: ProviderManager,
  formData: FlightSearchFormData,
  windowConfig: WindowConfig,
) => {
  formData = {
    ...formData,
    from: formData.from.toUpperCase(),
    to: formData.to.toUpperCase(),
  };
  providerManager.searchForResults(formData, windowConfig);
};
