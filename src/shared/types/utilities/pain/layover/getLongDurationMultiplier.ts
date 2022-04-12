import { Layover } from "../../../Layover";

export const getLongDurationMultiplier = (layover: Layover, isOvernight: boolean): number => {
  const tooLong = isOvernight
    ? 10 * 60 // 10 hours
    : 3 * 60; // 3 hours

  return layover.getDurationMinutes() > tooLong ? 1 : 0;
};
