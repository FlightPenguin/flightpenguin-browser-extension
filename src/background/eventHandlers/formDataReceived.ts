import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { ProviderManager } from "../ProviderManager";

export const handleFormDataReceived = async (
  providerManager: ProviderManager,
  formData: FlightSearchFormData,
): Promise<void> => {
  await providerManager.closeTabs();
  await providerManager.searchForResults(formData);
};
