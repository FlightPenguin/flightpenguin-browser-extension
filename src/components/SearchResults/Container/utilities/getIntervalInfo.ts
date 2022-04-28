import { DisplayableTrip } from "../../../../shared/types/DisplayableTrip";
import { SearchTripMeta } from "../../../../shared/types/SearchMeta";
import { getParsedISODate } from "../../../../shared/types/utilities/getParsedISODate";

export const getIntervalInfo = (
  meta: SearchTripMeta,
  trips: DisplayableTrip[],
  tripContainerWidth: number,
): { earliestTime: Date; latestTime: Date; intervals: number[]; timezoneOffset: number; intervalWidth: number } => {
  const earliestTime = getParsedISODate(meta.earliestTime);
  const latestTime = getParsedISODate(meta.latestTime);
  const timezoneOffset = trips.length ? trips[0].getTrip().getTimezoneOffset() : 0;
  const intervalWidth = tripContainerWidth / (meta.intervals.length - 1);
  return {
    earliestTime,
    latestTime,
    timezoneOffset,
    intervals: meta.intervals,
    intervalWidth,
  };
};
