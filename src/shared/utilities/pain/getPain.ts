import { CabinType } from "../../../background/constants";
import { Layover } from "../../types/ProcessedFlightSearchResult";
import { getLayoversCost } from "./layovers/getLayoversCost";

export const getPain = (fare: number, cabin: CabinType, layovers: Layover[]): number => {
  const durationCost = getLayoversCost(layovers, cabin);
  return Math.pow(fare, 1.05) + durationCost;
};
