import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { WindowConfig } from "../../shared/types/WindowConfig";
import { ProviderManager } from "../ProviderManager";

export const handleFormDataReceived = async (
  providerManager: ProviderManager,
  formData: FlightSearchFormData,
  windowConfig: WindowConfig,
): Promise<void> => {
  await providerManager.closeWindows();
  await providerManager.searchForResults(formData, windowConfig);
};
