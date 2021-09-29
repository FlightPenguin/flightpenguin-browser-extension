import { CabinType } from "../../../../background/constants";
import { Layover } from "../../../types/ProcessedFlightSearchResult";
import { getLayoverCost } from "./getLayoverCost";

export const getLayoversCost = (layovers: Layover[], cabin: CabinType): number => {
  let durationCost = 0;
  layovers.forEach((layover) => {
    durationCost += getLayoverCost(layover, cabin);
  });

  const layoverStops = layovers.filter((layover) => layover.isLayoverStop);
  const layoverCountMultiplier = Number(`1.0${layoverStops.length}`);

  return Math.pow(durationCost, layoverCountMultiplier);
};
