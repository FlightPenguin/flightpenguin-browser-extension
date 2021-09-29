import { CabinType } from "../../../../background/constants";
import { Layover } from "../../../types/ProcessedFlightSearchResult";
import { getDurationCost } from "../duration/getDurationCost";
import { getLayoverMultiplier } from "./getLayoverMultiplier";

export const getLayoverCost = (layover: Layover, cabin: CabinType): number => {
  return getDurationCost(layover.duration, cabin, getLayoverMultiplier(layover));
};
