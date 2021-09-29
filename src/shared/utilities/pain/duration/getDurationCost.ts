import { CabinType } from "../../../../background/constants";
import { getCabinMultiplier } from "./getCabinMultiplier";
import { getCostPerMinute } from "./getCostPerMinute";
import { getSmoothDuration } from "./getSmoothDuration";

export const getDurationCost = (duration: string, cabin: CabinType, multiplier: number): number => {
  const smoothedDuration = getSmoothDuration(duration);
  const cabinMultiplier = getCabinMultiplier(cabin);
  const costPerMinute = getCostPerMinute(multiplier);

  return smoothedDuration * cabinMultiplier * costPerMinute;
};
