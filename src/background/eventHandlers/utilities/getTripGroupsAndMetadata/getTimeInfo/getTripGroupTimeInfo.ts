import { differenceInHours } from "date-fns";

import { FlightSearchFormData } from "../../../../../shared/types/FlightSearchFormData";
import { DisplayableTripInputPrimitive } from "../types";
import { getBoundaryTimes } from "./getBoundaryTimes";
import { getEarliestAndLatestTimes } from "./getEarliestAndLatestTimes";
import { getIntervalIncrement } from "./getIntervalIncrement";
import { getIntervals } from "./getIntervals";

export const getTripGroupTimeInfo = (
  trips: DisplayableTripInputPrimitive[],
  formData: FlightSearchFormData,
  tripGroupIndex: number,
): { earliestTime: Date; latestTime: Date; intervals: number[] } => {
  const { earliestTime, latestTime } = getEarliestAndLatestTimes(trips, formData, tripGroupIndex);
  const increment = getIntervalIncrement(differenceInHours(latestTime, earliestTime));
  const { lowerBoundary, upperBoundary } = getBoundaryTimes(earliestTime, latestTime, increment);
  const { intervals } = getIntervals(lowerBoundary, upperBoundary, increment);
  return {
    earliestTime: lowerBoundary,
    latestTime: upperBoundary,
    intervals,
  };
};
