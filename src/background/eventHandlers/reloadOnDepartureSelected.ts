import { ProcessedFlightSearchResult } from "../../shared/types/ProcessedFlightSearchResult";
import { WindowConfig } from "../../shared/types/WindowConfig";
import { FlightMap } from "../../skiplagged/parser/constants";
import { ProviderManager } from "../ProviderManager";

export const handleReloadOnDepartureSelected = (
  providerManager: ProviderManager,
  providerName: string,
  targetUrl: string,
  departure: ProcessedFlightSearchResult,
  departureMap: FlightMap,
): void => {
  const targetTabId = providerManager.getTabId(providerName);
  if (!targetTabId) {
    throw new Error(`Unable to extract tab for ${providerName}`);
  }

  const windowConfig: WindowConfig = {
    height: window.outerHeight,
    width: window.outerWidth,
    left: window.screenX,
    top: window.screenY,
  };

  providerManager.closeWindow(providerName);
  providerManager.createWindow(targetUrl, providerName, windowConfig, {
    event: "BEGIN_PARSING_RETURNS",
    departure: departure,
    departureMap: departureMap,
  });
};
