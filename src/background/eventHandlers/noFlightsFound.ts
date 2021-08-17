import { ProviderManager } from "../ProviderManager";

export const handleNoFlightsFound = (providerManager: ProviderManager, providerName: string): void => {
  providerManager.setSuccessful(providerName, 0);
  if (providerManager.isComplete() && providerManager.getTotalFlightCount() === 0) {
    providerManager.sendMessageToIndexPage({ event: "NO_FLIGHTS_FOUND_CLIENT" });
    providerManager.closeWindows();
  }
  // Sentry.captureException(
  //   new Error(`No flights found ${message.provider}`, {
  //     extra: formData,
  //   }),
  // );
};
