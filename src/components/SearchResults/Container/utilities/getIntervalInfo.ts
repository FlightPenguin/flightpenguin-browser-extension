import { addDays, differenceInHours, max, min, startOfDay } from "date-fns";

import { DisplayableTrip } from "../../../../shared/types/newtypes/DisplayableTrip";

export const getIntervalInfo = (
  trips: DisplayableTrip[],
  tripContainerWidth: number,
): { earliestTime: Date; latestTime: Date; intervals: number[]; intervalWidth: number } => {
  const { earliestTime, latestTime } = getEarliestAndLatestTimes(trips);
  const intervals = getIntervals(earliestTime, latestTime);
  const intervalWidth = tripContainerWidth / (intervals.length - 1);
  return { earliestTime, latestTime, intervals, intervalWidth };
};

export const getEarliestAndLatestTimes = (trips: DisplayableTrip[]): { earliestTime: Date; latestTime: Date } => {
  const [departureTimes, arrivalTimes] = trips.reduce(
    ([departureTimes, arrivalTimes], trip) => {
      departureTimes.push(trip.getTrip().getDepartureDateTime());
      arrivalTimes.push(trip.getTrip().getArrivalDateTime());
      return [departureTimes, arrivalTimes];
    },
    [[] as Date[], [] as Date[]],
  );
  const earliestTime = startOfDay(min(departureTimes));
  const latestTime = startOfDay(addDays(max(arrivalTimes), 1));
  return { earliestTime, latestTime };
};

const getIntervals = (earliestTime: Date, latestTime: Date): number[] => {
  const hours = differenceInHours(latestTime, earliestTime);
  const increment = getIntervalSpacing(hours);

  const intervals: number[] = [];
  let time = 0;

  while (time <= hours + increment) {
    intervals.push(time);
    time += increment;
  }
  return intervals;
};

const getIntervalSpacing = (hours: number): number => {
  if (hours > 144) {
    return 12;
  } else if (hours > 72) {
    return 6;
  } else if (hours <= 24) {
    return 2;
  } else {
    return 4;
  }
};
