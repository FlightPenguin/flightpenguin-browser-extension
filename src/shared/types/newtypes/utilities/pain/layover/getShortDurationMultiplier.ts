import { Layover } from "../../../Layover";

export const getShortDurationMultiplier = (layover: Layover): number => {
  const duration = layover.getDurationMinutes();

  if (duration < 75) {
    if (duration < 30) {
      return 5;
    } else if (duration < 60) {
      return 1;
    } else {
      return 0.25;
    }
  }
  return 0;
};
