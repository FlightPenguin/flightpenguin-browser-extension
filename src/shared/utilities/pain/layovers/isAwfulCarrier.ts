import { Layover } from "../../../types/ProcessedFlightSearchResult";

const AWFUL_CARRIERS = [
  // lowercase only key words
  "allegiant",
  "frontier",
  "ryanair",
  "scoot",
  "spirit",
  "sun country",
];

export const isAwfulCarrier = (layover: Layover): boolean => {
  const airlineName = layover.operatingAirline.display.toLowerCase();
  return AWFUL_CARRIERS.some((shortNameString) => airlineName.includes(shortNameString));
};
