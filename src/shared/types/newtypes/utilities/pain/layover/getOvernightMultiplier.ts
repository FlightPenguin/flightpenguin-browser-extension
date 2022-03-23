import { differenceInCalendarDays } from "date-fns";

import { Layover } from "../../../Layover";

export const getOvernightMultiplier = (layover: Layover): number => {
  const diff = differenceInCalendarDays(layover.getArrivalDateTime(), layover.getDepartureDateTime());
  return diff === 0 ? 0 : 0.15;
};
