import { Layover } from "../../../types/ProcessedFlightSearchResult";

export const isAirportChange = (layover: Layover): boolean => {
  return layover.from !== layover.to;
};
