import { differenceInCalendarDays } from "date-fns";

import { Layover } from "../../../Layover";

export const getOvernightMultiplier = (layover: Layover): number => {
  const diff = differenceInCalendarDays(layover.getArrivalTripStartDateTime(), layover.getDepartureTripStartDateTime());
  return diff === 0 ? 0 : 0.15;
};
